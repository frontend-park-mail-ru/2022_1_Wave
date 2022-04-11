import './Player.scss';
import VDom from '../../../modules/VDom';
import '../../App/App.scss';
import marker from '../../../assets/player_marker.png';
import { IPlayerClass } from '../../../modules/Media/media';
import { IProps } from '../../../modules/VDom/Interfaces';
import { PlayerClass } from '../../../modules/Media/player';

class Player extends VDom.Component {
  #player : IPlayerClass;

  #playIcon : HTMLElement = (<div class="fa-regular fa-circle-play"></div>);

  #pauseIcon : HTMLElement = (<div class="fa-regular fa-circle-pause"></div>);

  constructor(props: IProps) {
    super(props);
    const { playlist } = this.props;
    this.#player = new PlayerClass(playlist);
    console.log(this.#player);
    const freqArr = this.#player.analyser
      ? new Uint8Array(this.#player.analyser.frequencyBinCount) : null;
    const volume = this.#player.audio ? this.#player.audio.volume : 0.5;
    this.state = {
      playState: false,
      trackTime: 0,
      trackFilled: 0,
      trackFetched: 0,
      trackBuffered: 0,
      trackVolume: volume * 100,
      playRand: false,
      trackData: {
        title: this.#player.currentTrack.title,
        author: this.#player.currentTrack.artist,
        cover: this.#player.currentTrack.cover,
      },
      freqArray: freqArr,
      waveHeights: [
        0,
        0,
        0,
        0,
      ],
    };
    this.loadTrackData = this.loadTrackData.bind(this);
    this.tooglePlay = this.tooglePlay.bind(this);
    this.checkPlay = this.checkPlay.bind(this);
    this.runNext = this.runNext.bind(this);
    this.runPrev = this.runPrev.bind(this);
    this.timeUpdater = this.timeUpdater.bind(this);
    this.updateWaveFront = this.updateWaveFront.bind(this);
    this.fetchedUpdater = this.fetchedUpdater.bind(this);
    this.setTime = this.setTime.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.tooggleShuffle = this.tooggleShuffle.bind(this);
    if (this.#player.audio) {
      this.#player.audio.addEventListener('timeupdate', this.timeUpdater);
      this.#player.audio.addEventListener('progress', this.fetchedUpdater);
      this.#player.audio.addEventListener('loadedmetadata', this.fetchedUpdater);
      this.#player.audio.addEventListener('durationchange', this.loadTrackData);
      this.#player.audio.addEventListener('ended', this.runNext);
    }
    if (this.#player.currentTrack) {
      this.loadTrackData();
    }
  }

  loadTrackData(): void {
    this.setState({
      trackData: {
        title: this.#player.currentTrack.title,
        author: this.#player.currentTrack.artist,
        cover: this.#player.currentTrack.cover,
      },
    });
  }

  checkPlay():void {
    if (this.state.playState) {
      this.#player.play();
      return;
    }
    this.#player.stop();
  }

  tooglePlay(): void {
    this.setState({ playState: !this.state.playState });
    this.checkPlay();
  }

  runNext(): void {
    this.setState({ trackFilled: 100, playState: true });
    this.#player.next();
    this.checkPlay();
  }

  runPrev(): void {
    if (this.#player.audio.currentTime !== 0) {
      this.#player.audio.currentTime = 0;
      return;
    }
    this.#player.prev();
    this.checkPlay();
  }

  timeUpdater(e: Event): void {
    this.fetchedUpdater(e);
    this.updateWaveFront();
    const filled = ((this.#player.audio.currentTime / this.#player.audio.duration) * 100);
    this.setState({ trackTime: this.#player.audio.currentTime, trackFilled: filled });
  }

  updateWaveFront(): void {
    const currFreq = this.state.freqArray;
    if (!currFreq) {
      return;
    }
    this.#player.analyser.getByteFrequencyData(currFreq);
    const barsHeight: Array<number> = [0, 0, 0, 0];
    const hzStep: number = 24;
    const lowFreq: Array<number> = [100, 700];
    const midFreq: Array<number> = [1000, 3000];
    const midUpFreq: Array<number> = [4000, 6000];
    const highFreq: Array<number> = [7000, 10000];
    const freqRanges: Array<Array<number>> = [
      lowFreq,
      midFreq,
      midUpFreq,
      highFreq,
    ];

    for (let i = 0; i < barsHeight.length; i += 1) {
      const range = freqRanges[i];
      const leftBorder = Math.round(range[0] / hzStep);
      const rightBorder = Math.round(range[1] / hzStep);
      let sum = 0;
      let elNums = 0;
      currFreq.slice(leftBorder, rightBorder).forEach(
        (val:number): void => {
          sum += val;
          elNums += 1;
        },
      );
      const interpolated = sum / elNums;
      barsHeight[i] = (interpolated / 256) * 100;
    }
    this.setState({ freqArray: currFreq, waveHeights: barsHeight });
  }

  fetchedUpdater(): void {
    const fetchedEnd = this.#player.audio.buffered.end(this.#player.audio.buffered.length - 1);
    this.setState({ trackBuffered: (fetchedEnd / this.#player.audio.duration) * 100 });
  }

  setTime(e: MouseEvent): void {
    const relativePosition = this.getRelativePosition(e);
    this.#player.audio.currentTime = relativePosition * this.#player.audio.duration;
  }

  setVolume(e: MouseEvent): void {
    const relativePosition = this.getRelativePosition(e);
    this.setState({ trackVolume: relativePosition * 100 });
    this.#player.audio.volume = relativePosition;
  }

  getRelativePosition(e: MouseEvent): number {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const relativePosition = (e.x - rect.left) / (rect.right - rect.left);
    if (relativePosition < 0) {
      return 0;
    }
    return relativePosition;
  }

  tooggleShuffle(): void {
    this.#player.isPlayRand = !this.#player.isPlayRand;
    this.setState({ playRand: this.#player.isPlayRand });
  }

  render(): VDom.VirtualElement {
    const formatInt = (n: number):string => {
      const res = Math.trunc(n).toString();
      return n >= 10 ? res : `0${res}`;
    };
    return (
      <div class="player">
        <div class="player__waves">
          <div class="bar" id="1" style={ { height: `${this.state.waveHeights[0]}%` }}></div>
          <div class="bar" id="2" style={ { height: `${this.state.waveHeights[1]}%` }}></div>
          <div class="bar" id="3" style={ { height: `${this.state.waveHeights[2]}%` }}></div>
          <div class="bar" id="4" style={ { height: `${this.state.waveHeights[3]}%` }}></div>
        </div>
        <div class="player__track">
          <img class="track__picture" src={this.state.trackData.cover}></img>
          <div class="track__name">
            <div class="text track__name__title">{this.state.trackData.title}</div>
            <div class="text track__name__author">{this.state.trackData.author}</div>
          </div>
        </div>
        <div class="player__control">
          <div onclick={this.runPrev} class="control__prev">
            <div class="fa-solid fa-backward-step"></div>
          </div>
          <div onclick={this.tooglePlay} class="control__play_pause">
            {
              this.state.playState ? this.#pauseIcon : this.#playIcon
            }
          </div>

          <div onclick={this.runNext} class="control__next">
            <div class="fa-solid fa-forward-step"></div>
          </div>
        </div>
        <div class="player__progressbar">
          <div class="progressbar"
            onclick={this.setTime}
            ondrag={this.setTime}
            ondragend={this.setTime}>
            <div class="progressbar__prefetched" style={
              { width: `${this.state.trackBuffered.toString()}%` }
            }></div>
            <div class="progressbar__state">
              <div class="progressbar__state__line" style={
                { width: `${this.state.trackFilled.toString()}%` }
              }></div>
              <div draggable="true" class="progressbar__state__marker">
                <img draggable="false" src={marker}></img>
              </div>
            </div>
          </div>
          <div class="text player__progressbar__time"> {
            `${formatInt(this.state.trackTime / 60)}:${
              formatInt(this.state.trackTime % 60)}`
          }</div>
        </div>
        <div onclick={this.tooggleShuffle} class="player__shuffle">
          <div class="fa-solid fa-shuffle" style={
            { color: this.state.playRand ? '#5D4099' : '#BEB7DF' }
          } ></div>
        </div>
        <div class="player__volume">
          <div class="fa-solid fa-volume-low volume__icon"></div>
          <div class="volume__input"
            onclick={this.setVolume}
            ondrag={this.setVolume}
            ondragend={this.setVolume}>
            <div class="volume__input__state" style={
              { width: `${this.state.trackVolume.toString()}%` }
            }></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
