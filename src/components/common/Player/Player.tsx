import './Player.scss';
import VDom from '@rflban/vdom';
import '../../App/App.scss';
import { IPlayerClass, ITrack } from '../../../modules/Media/media';
import { PlayerClass } from '../../../modules/Media/player';
import { config } from '../../../modules/Client/Client';
import { Map } from '../../../modules/Store/types';
import { connect } from '../../../modules/Connect';
import { setPosition, startPlay, stopPlay } from '../../../actions/Player';
import RouteNavigator from '../../../modules/Router/RouteNavigator';
import RouterContext from '../../../modules/Router/RouterContext';
import TrackProgressBar from "./TrackProgressBar";
import VolumeProgressBar from "./VolumeProgressBar";

interface PlayerComponentProps {
  play: () => void;
  stop: () => void;
  setPos: (_n: number) => void;
  playlist: Array<ITrack>;
  position: number;
  isPlay: boolean;
}

class PlayerComponent extends VDom.Component<PlayerComponentProps, any, null, RouteNavigator> {
  #player: IPlayerClass | null;

  #playIcon: HTMLElement = (<div class="fa-regular fa-circle-play"></div>);

  #pauseIcon: HTMLElement = (<div class="fa-regular fa-circle-pause"></div>);

  static contextType = RouterContext;

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
      isMobile: false,
    };
    this.initPlayer = this.initPlayer.bind(this);
    this.loadTrackData = this.loadTrackData.bind(this);
    this.tooglePlay = this.tooglePlay.bind(this);
    this.checkPlay = this.checkPlay.bind(this);
    this.runNext = this.runNext.bind(this);
    this.runPrev = this.runPrev.bind(this);
    this.updateWaveFront = this.updateWaveFront.bind(this);
    this.toogleShuffle = this.toogleShuffle.bind(this);
    this.props.stop();
  }

  didUpdate(): void {
    if (!this.#player?.audio) {
      this.initPlayer();
      return;
    }
    if (!this.props.playlist) {
      return;
    }
    console.log('current playlist:',this.#player?.playlist, 'update with:',this.props.playlist);
    if (JSON.stringify(this.#player?.playlist) !== JSON.stringify(this.props.playlist)) {
      this.setState({ trackTime: 0, trackFilled: 0, trackFetched: 0, trackBuffered: 0 });
      this.#player?.updatePlaylist(this.props.playlist);
      this.props.setPos(0);
    }
    if (
      typeof this.props.position === 'number' &&
      this.#player?.currentIndex !== this.props.position
    ) {
      this.#player?.setPosition(this.props.position);
    }
    if (this.#player?.audio?.paused === this.props.isPlay) {
      this.checkPlay();
    }
  }

  didMount(): void {
    this.props.setPos(0);
    if (!this.#player && this.props.playlist && this.props.playlist.length > 0) {
      this.initPlayer();
    }
  }

  willUmount():void {
    this.#player = null;
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
      this.#player.audio.addEventListener('durationchange', this.loadTrackData);
      this.#player.audio.addEventListener('ended', this.runNext);
    }
    if (this.#player.currentTrack) {
      this.loadTrackData();
    }
  }

  loadTrackData(): void {
    if (!this.#player?.currentTrack) return;
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
      this.#player?.play();
      return;
    }
    this.#player?.audio.addEventListener('durationchange', this.loadTrackData);
    this.#player?.stop();
  }

  tooglePlay(e: Event): void {
    e.stopPropagation();
    if (this.props.isPlay) {
      this.props.stop();
      return;
    }
    this.props.play();
  }

  runNext(e: Event | undefined =  undefined): void {
    if(e instanceof Event) e.stopPropagation();
    if(!this.#player) return;
    if (this.#player.currentIndex + 1 > this.#player.playlist.length -1) return;
    this.setState({ trackFilled: 100, playState: true });
    this.props.setPos(this.#player.currentIndex +1);
    this.checkPlay();
  }

  runPrev(e: Event | undefined =  undefined): void {
    if(e instanceof Event) e.stopPropagation();
    if(!this.#player) return;
    if ( this.#player.currentIndex - 1 < 0 ) return;
    this.props.setPos(this.#player.currentIndex - 1);
    this.checkPlay();
  }

  updateWaveFront(): void {
    const currFreq = this.state.freqArray;
    if (!currFreq) {
      return;
    }
    this.#player?.analyser.getByteFrequencyData(currFreq);
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

  toogleShuffle(e: Event): void {
    e.preventDefault();
    if(!this.#player) return;
    this.#player.isPlayRand = !this.#player?.isPlayRand;
    this.setState({ playRand: this.#player?.isPlayRand });
  }

  render(): VDom.VirtualElement {
    if (!this.#player) {
      return <div class="player" />;
    }
    return (
      <div class={`player ${this.state.isMobile ? 'player_mobile' : ''}`}>
        <div class="player__waves">
          <div class="bar" id="1" style={{ height: `${this.state.waveHeights[0]}%` }} />
          <div class="bar" id="2" style={{ height: `${this.state.waveHeights[1]}%` }} />
          <div class="bar" id="3" style={{ height: `${this.state.waveHeights[2]}%` }} />
          <div class="bar" id="4" style={{ height: `${this.state.waveHeights[3]}%` }} />
        </div>
        <div class="player__track">
          <img class="track__picture" src={this.state.trackData.cover} />
          <div class="track__name">
            <div class="text track__name__title">{this.state.trackData.title}</div>
            <div class="text track__name__author">{this.state.trackData.author}</div>
          </div>
        </div>
        <div class="player__control">
          <div onclick={this.runPrev} ontouchend={this.runPrev} class="control__prev">
            <div class="fa-solid fa-backward-step" />
          </div>
          <div onclick={this.tooglePlay} ontouchend={this.tooglePlay} class="control__play_pause">
            {this.props.isPlay ? this.#pauseIcon : this.#playIcon}
          </div>
          <div onclick={this.runNext} ontouchend={this.runNext} class="control__next">
            <div class="fa-solid fa-forward-step" />
          </div>
        </div>
        <div class="player-progressbar-wrapper">
          <TrackProgressBar audio={this.#player.audio}/>
        </div>
        {/* <div onclick={this.toogleShuffle} ontouchend={this.toogleShuffle} class="player__shuffle"> */}
        {/*  <div */}
        {/*    class="fa-solid fa-shuffle" */}
        {/*    style={{ color: this.state.playRand ? '#5D4099' : '#BEB7DF' }} */}
        {/*  ></div> */}
        {/* </div> */}
        <div class="volume-progressbar-wrapper">
          <VolumeProgressBar audio={this.#player.audio}/>
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
