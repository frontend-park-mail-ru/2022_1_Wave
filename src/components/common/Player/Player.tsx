import './Player.scss';
import VDom from '../../../modules/VDom';
import '../../App/App.scss';
import marker from '../../../assets/player_marker.png';
import { IPlayerClass, ITrack } from '../../../modules/Media/media';
import { PlayerClass } from '../../../modules/Media/player';
import { config } from '../../../modules/Client/Client';
import { Map } from '../../../modules/Store/types';
import { connect } from '../../../modules/Connect';
import { setPosition, startPlay, stopPlay } from '../../../actions/Player';
import { IComponentPropsCommon } from '../../../modules/VDom/IComponentProps';

interface PlayerComponentProps extends IComponentPropsCommon {
  play: () => void;
  stop: () => void;
  setPos: (n: number) => void;
  playlist: Array<ITrack>;
  position: number;
  isPlay: boolean;
}

class PlayerComponent extends VDom.Component<PlayerComponentProps> {
  #player: IPlayerClass;

  #playIcon: HTMLElement = (<div class="fa-regular fa-circle-play"></div>);

  #pauseIcon: HTMLElement = (<div class="fa-regular fa-circle-pause"></div>);

  constructor(props: PlayerComponentProps) {
    super(props);
    this.state = {
      playState: false,
      trackTime: 0,
      trackFilled: 0,
      trackFetched: 0,
      trackBuffered: 0,
      trackVolume: 50,
      playRand: false,
      trackData: {
        title: '',
        author: '',
        cover: '',
      },
      freqArray: [],
      waveHeights: [0, 0, 0, 0],
      isPlayerDragged: false,
      isVolumeDragged: false,
    };
    this.initPlayer = this.initPlayer.bind(this);
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
    this.toogleShuffle = this.toogleShuffle.bind(this);
    this.toogleMute = this.toogleMute.bind(this);
    this.setDrag = this.setDrag.bind(this);
    this.onDragVolume = this.onDragVolume.bind(this);
    this.onDragPlayer = this.onDragPlayer.bind(this);
    this.props.stop();
  }

  didUpdate(): void {
    if (!this.#player) {
      this.initPlayer();
      return;
    }
    if (!this.props.playlist){
      return;
    }
    if (this.#player.playlist !== this.props.playlist ) {
      this.setState({ trackTime: 0, trackFilled: 0, trackFetched: 0, trackBuffered: 0 });
      this.#player.updatePlaylist(this.props.playlist);
      this.props.setPos(0);
    }
    if (
      typeof this.props.position === 'number' &&
      this.#player.currentIndex !== this.props.position
    ) {
      this.#player.setPosition(this.props.position);
    }
    if (this.#player && this.#player.audio &&
        this.#player.audio.paused === this.props.isPlay) {
      this.checkPlay();
    }
  }

  didMount(): void {
    this.props.setPos(0);
    if (!this.#player && this.props.playlist && this.props.playlist.length > 0) {
      this.initPlayer();
    }
  }

  initPlayer(): void {
    if (!('mediaSession' in navigator)) {
      return;
    }
    navigator.mediaSession.setActionHandler('play', () => {
      this.props.play();
    });
    navigator.mediaSession.setActionHandler('pause', () => {
      this.props.stop();
    });

    navigator.mediaSession.setActionHandler('previoustrack', () => {
      this.runPrev();
    });

    navigator.mediaSession.setActionHandler('nexttrack', () => {
      this.runNext();
    });

    this.#player = new PlayerClass(this.props.playlist);
    const freqArray = this.#player.analyser
      ? new Uint8Array(this.#player.analyser.frequencyBinCount)
      : null;
    const volume = this.#player.audio ? this.#player.audio.volume : 0.5;
    this.setState({ trackVolume: volume * 100, freqArray });
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
        cover: config.files + this.#player.currentTrack.cover,
      },
    });
  }

  checkPlay(): void {
    if (this.props.isPlay) {
      this.#player.play();
      return;
    }
    this.#player.stop();
  }

  tooglePlay(): void {
    if (this.props.isPlay) {
      this.props.stop();
      return;
    }
    this.props.play();
  }

  runNext(): void {
    this.setState({ trackFilled: 100, playState: true });
    this.#player.next();
    this.props.setPos(this.#player.currentIndex);
    this.checkPlay();
  }

  runPrev(): void {
    this.#player.prev();
    this.props.setPos(this.#player.currentIndex);
    this.checkPlay();
  }

  timeUpdater(e: Event): void {
    this.fetchedUpdater(e);
    this.updateWaveFront();
    const filled = (this.#player.audio.currentTime / this.#player.audio.duration) * 100;
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
    const lowFreq: Array<number> = [0, 700];
    const midFreq: Array<number> = [1000, 2500];
    const midUpFreq: Array<number> = [4000, 6000];
    const highFreq: Array<number> = [7000, 9000];
    const freqRanges: Array<Array<number>> = [lowFreq, midFreq, midUpFreq, highFreq];

    for (let i = 0; i < barsHeight.length; i += 1) {
      const range = freqRanges[i];
      const leftBorder = Math.round(range[0] / hzStep);
      const rightBorder = Math.round(range[1] / hzStep);
      let sum = 0;
      let elNums = 0;
      currFreq.slice(leftBorder, rightBorder).forEach((val: number): void => {
        sum += val;
        elNums += 1;
      });
      const interpolated = sum / elNums;
      barsHeight[i] = (interpolated / 256) * 100;
    }
    this.setState({ freqArray: currFreq, waveHeights: barsHeight });
  }

  fetchedUpdater(): void {
    if (this.#player.audio.buffered.length > 0) {
      const fetchedEnd = this.#player.audio.buffered.end(this.#player.audio.buffered.length - 1);
      this.setState({ trackBuffered: (fetchedEnd / this.#player.audio.duration) * 100 });
    }
  }

  setTime(e: MouseEvent): void {
    if ((e.type === 'mousemove' || e.type === 'touchmove') && !this.state.isPlayerDragged) {
      return;
    }
    const relativePosition = this.getRelativePosition(e);
    this.#player.audio.currentTime = relativePosition * this.#player.audio.duration;
  }

  onDragVolume(e: Event): void {
    const target = 'isVolumeDragged';
    this.setDrag(target, e);
  }

  onDragPlayer(e: Event): void {
    const target = 'isPlayerDragged';
    this.setDrag(target, e);
  }

  setDrag(target: string, e: Event): void {
    const state: Map = {};
    switch (e.type) {
    case 'mousedown':
    case 'touchstart':
      state[target] = true;
      if (target === 'isPlayerDragged' ){
        this.props.stop();
      }
      break;
    case 'mouseup':
    case 'touchend':
      if (target === 'isPlayerDragged' ) {
        this.props.play();
      }
      state[target] = false;
      break;
    default:
      state[target] = false;
    }
    this.setState(state);
  }

  setVolume(e: MouseEvent): void {
    if ((e.type === 'mousemove' || e.type === 'touchmove') && !this.state.isVolumeDragged) {
      return;
    }
    let relativePosition = this.getRelativePosition(e);
    relativePosition = relativePosition > 1 ? 1 : relativePosition;
    this.setState({ trackVolume: relativePosition * 100 });
    this.#player.audio.volume = relativePosition;
  }

  getRelativePosition(e: MouseEvent): number {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const relativePosition = (x - rect.left) / (rect.right - rect.left);
    if (relativePosition < 0) {
      return 0;
    }
    return relativePosition;
  }

  toogleShuffle(): void {
    this.#player.isPlayRand = !this.#player.isPlayRand;
    this.setState({ playRand: this.#player.isPlayRand });
  }

  toogleMute(): void {
    this.#player.audio.volume = this.state.trackVolume > 0 ? 0 : 0.5;
    this.setState({ trackVolume: this.state.trackVolume > 0 ? 0 : 50 });
  }

  render(): VDom.VirtualElement {
    const formatInt = (n: number): string => {
      const res = Math.trunc(n).toString();
      return n >= 10 ? res : `0${res}`;
    };
    let volIcon: string;
    switch (true) {
    case this.state.trackVolume === 0:
      volIcon = 'fa-volume-xmark';
      break;
    case this.state.trackVolume < 25:
      volIcon = 'fa-volume-off';
      break;
    case this.state.trackVolume < 60:
      volIcon = 'fa-volume-low';
      break;
    default:
      volIcon = 'fa-volume-high';
      break;
    }
    if (!this.#player) {
      return <div class="player" />;
    }
    return (
      <div class="player">
        <div class="player__waves">
          <div class="bar" id="1" style={{ height: `${this.state.waveHeights[0]}%` }}></div>
          <div class="bar" id="2" style={{ height: `${this.state.waveHeights[1]}%` }}></div>
          <div class="bar" id="3" style={{ height: `${this.state.waveHeights[2]}%` }}></div>
          <div class="bar" id="4" style={{ height: `${this.state.waveHeights[3]}%` }}></div>
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
            {this.props.isPlay ? this.#pauseIcon : this.#playIcon}
          </div>

          <div onclick={this.runNext} class="control__next">
            <div class="fa-solid fa-forward-step"></div>
          </div>
        </div>
        <div class="player__progressbar">
          <div
            onclick={this.setTime}
            onmousemove={this.setTime}
            ontouchmove={this.setTime}
            onmouseleave={this.onDragPlayer}
            class="progressbar__wrapper"
          >
            <div class="progressbar">
              <div
                class="progressbar__prefetched"
                style={{ width: `${this.state.trackBuffered.toString()}%` }}
              ></div>
              <div class="progressbar__state">
                <div
                  class="progressbar__state__line"
                  style={{ width: `${this.state.trackFilled.toString()}%` }}
                ></div>
                <div
                  draggable={false}
                  onmousedown={this.onDragPlayer}
                  onmouseup={this.onDragPlayer}
                  ontouchstart={this.onDragPlayer}
                  ontouchend={this.onDragPlayer}
                  style={{
                    'margin-left': `calc(${this.state.trackFilled}% - 1em)`,
                  }}
                  class="progressbar__state__marker"
                >
                  <div
                    class="marker__img"
                    style={{
                      'background-image': `url("${marker}")`,
                      cursor: `${this.state.isPlayerDragged ? 'grabbing' : 'pointer'}`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="text player__progressbar__time">
            {`${formatInt(this.state.trackTime / 60)}:${formatInt(this.state.trackTime % 60)}`}
          </div>
        </div>
        <div onclick={this.toogleShuffle} class="player__shuffle">
          <div
            class="fa-solid fa-shuffle"
            style={{ color: this.state.playRand ? '#5D4099' : '#BEB7DF' }}
          ></div>
        </div>
        <div class="player__volume">
          <div onclick={this.toogleMute} class={`fa-solid ${volIcon} volume__icon`}></div>
          <div
            onclick={this.setVolume}
            onmousemove={this.setVolume}
            ontouchmove={this.setVolume}
            onmouseleave={this.onDragVolume}
            class="volume__wrapper">
            <div class="volume__input">
              <div
                class="volume__input__state"
                style={{ width: `${this.state.trackVolume.toString()}%` }}
              ></div>
              <div
                draggable={false}
                onmousedown={this.onDragVolume}
                onmouseup={this.onDragVolume}
                ontouchstart={this.onDragVolume}
                ontouchend={this.onDragVolume}
                style={{
                  'margin-left': `calc(${this.state.trackVolume}% - 0.5em)`,
                  cursor: `${this.state.isVolumeDragged ? 'grabbing' : 'pointer'}`,
                }}
                class="volume__state__marker"
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default Player;
const mapDispatchToProps = (dispatch: any): Map => ({
  setPos: (num: number): void => {
    dispatch(setPosition(num));
  },
  play: (): void => {
    dispatch(startPlay);
  },
  stop: (): void => {
    dispatch(stopPlay);
  },
});

const mapStateToProps = (state: any): Map => ({
  playlist: state.playerPlaylist ? state.playerPlaylist : null,
  position: state.playerPosition ? state.playerPosition.value : 0,
  isPlay: state.playerPlay ? state.playerPlay.value : false,
});

const Player = connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);
export default Player;
