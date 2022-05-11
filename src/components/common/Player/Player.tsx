import './Player.scss';
import './MobileFullPlayer.scss';
import VDom from '@rflban/vdom';
import '../../App/App.scss';
import {IComponentPropsCommon} from "@rflban/vdom/dist/IComponentProps";
import {IPlayerClass, ITrack} from '../../../modules/Media/media';
import {PlayerClass} from '../../../modules/Media/player';
import {config} from '../../../modules/Client/Client';
import {Map} from '../../../modules/Store/types';
import {connect} from '../../../modules/Connect';
import {setPosition, startPlay, stopPlay} from '../../../actions/Player';
import RouterContext from '../../../modules/Router/RouterContext';
import TrackProgressBar from "./TrackProgressBar";
import VolumeProgressBar from "./VolumeProgressBar";
import Waves from "./Waves";

interface PlayerComponentProps extends IComponentPropsCommon{
    play: () => void;
    stop: () => void;
    setPos: (_n: number) => void;
    playlist: Array<ITrack>;
    position: number;
    isPlay: boolean;
    isMobileFull:boolean;
}

class PlayerComponent extends VDom.Component<PlayerComponentProps> {
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
      isPlayerDragged: false,
      isVolumeDragged: false,
    };
    this.initPlayer = this.initPlayer.bind(this);
    this.loadTrackData = this.loadTrackData.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.checkPlay = this.checkPlay.bind(this);
    this.runNext = this.runNext.bind(this);
    this.runPrev = this.runPrev.bind(this);
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
    console.log('current playlist:', this.#player?.playlist, 'update with:', this.props.playlist);
    if (JSON.stringify(this.#player?.playlist) !== JSON.stringify(this.props.playlist)) {
      this.setState({trackTime: 0, trackFilled: 0, trackFetched: 0, trackBuffered: 0});
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

  willUmount(): void {
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
    this.#player?.stop();
  }

  togglePlay(e?: Event): void {
    if (e instanceof Event) e.stopPropagation();
    if (this.props.isPlay) {
      this.props.stop();
      return;
    }
    this.props.play();
    this.checkPlay();
  }

  runNext(e: Event | undefined = undefined): void {
    if (e instanceof Event) e.stopPropagation();
    if (!this.#player) return;
    if (this.#player.currentIndex + 1 > this.#player.playlist.length - 1) return;
    this.setState({trackFilled: 100, playState: true});
    this.props.setPos(this.#player.currentIndex + 1);
    this.checkPlay();
  }

  runPrev(e: Event | undefined = undefined): void {
    if (e instanceof Event) e.stopPropagation();
    if (!this.#player) return;
    if (this.#player.currentIndex - 1 < 0) return;
    this.props.setPos(this.#player.currentIndex - 1);
    this.checkPlay();
  }

  toogleShuffle(e: Event): void {
    e.preventDefault();
    if (!this.#player) return;
    this.#player.isPlayRand = !this.#player?.isPlayRand;
    this.setState({playRand: this.#player?.isPlayRand});
  }

  render(): VDom.VirtualElement {
    if (!this.#player) {
      return <></>;
    }
    return (
      <div class={`player ${this.props.isMobileFull ? 'player_mobile' : ''}`}>
        {!this.props.isMobileFull &&
            <Waves analyser={this.#player.analyser} audio={this.#player.audio}/>
        }
        <div class="player__track">
          <img class="track__picture" src={this.state.trackData.cover}/>
          <div class="track__name">
            <div class="text track__name__title">{this.state.trackData.title}</div>
            <div class="text track__name__author">{this.state.trackData.author}</div>
          </div>
        </div>
        {!this.props.isMobileFull &&
                    <div class="player__controls">
                      <div class="player__control">
                        <div onclick={this.runPrev} class="control__prev">
                          <div class="fa-solid fa-backward-step"/>
                        </div>
                        <div onclick={this.togglePlay} class="control__play_pause">
                          {this.props.isPlay ? this.#pauseIcon : this.#playIcon}
                        </div>
                        <div onclick={this.runNext} class="control__next">
                          <div class="fa-solid fa-forward-step"/>
                        </div>
                      </div>
                      <div class="player-progressbar-wrapper">
                        {this.#player.audio &&
                            <TrackProgressBar audio={this.#player.audio}/>
                        }
                      </div>
                      {/* <div onclick={this.toogleShuffle} ontouchend={this.toogleShuffle} class="player__shuffle"> */}
                      {/*  <div */}
                      {/*    class="fa-solid fa-shuffle" */}
                      {/*    style={{ color: this.state.playRand ? '#5D4099' : '#BEB7DF' }} */}
                      {/*  ></div> */}
                      {/* </div> */}
                      <div class="volume-progressbar-wrapper">
                        {this.#player.audio &&
                            <VolumeProgressBar audio={this.#player.audio}/>
                        }
                      </div>
                    </div>
        }
        {this.props.isMobileFull &&
            <div class="player__controls">
              {this.#player.audio &&
              <div class="player-progressbar-wrapper">
                <Waves analyser={this.#player.analyser} audio={this.#player.audio}/>
                <TrackProgressBar audio={this.#player.audio}/>
              </div>
              }

              <div class="player__control">
                <div class="control__prev" onClick={this.runPrev} onTouchEnd={this.runPrev}>
                  <div class="fa-solid fa-backward-step"/>
                </div>
                <div class="control__play_pause" onClick={this.togglePlay} onTouchEnd={this.togglePlay} >
                  {this.props.isPlay ? this.#pauseIcon : this.#playIcon}
                </div>
                <div class="control__next" onClick={this.runNext} onTouchEnd={this.runNext} >
                  <div class="fa-solid fa-forward-step"/>
                </div>
              </div>
              {/* <div onclick={this.toogleShuffle} ontouchend={this.toogleShuffle} class="player__shuffle"> */}
              {/*  <div */}
              {/*    class="fa-solid fa-shuffle" */}
              {/*    style={{ color: this.state.playRand ? '#5D4099' : '#BEB7DF' }} */}
              {/*  ></div> */}
              {/* </div> */}
              <div class="volume-progressbar-wrapper">
                {this.#player.audio &&
                    <VolumeProgressBar audio={this.#player.audio}/>
                }
              </div>
            </div>
        }
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
