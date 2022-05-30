import './Player.scss';
import './MobileFullPlayer.scss';
import VDom from '@rflban/vdom';
import {
  AlternativeArrowLeftIcon,
  AlternativeArrowRightIcon, PauseOutlineIcon, PlayOutlineIcon,
  ArrowLeftIcon} from '@rflban/waveui';
import '../../App/App.scss';
import {IComponentPropsCommon} from "@rflban/vdom/dist/IComponentProps";
import {IPlayerClass, ITrack} from '../../../modules/Media/media';
import {PlayerClass} from '../../../modules/Media/player';
import {config} from '../../../modules/Client/Client';
import {Map} from '../../../modules/Store/types';
import {connect} from '../../../modules/Connect';
import {setPlayState, setPosition, startPlay, stopPlay} from '../../../actions/Player';
import RouterContext from '../../../modules/Router/RouterContext';
import TrackProgressBar from "./TrackProgressBar";
import VolumeProgressBar from "./VolumeProgressBar";
import Waves from "./Waves";
import {setTracks} from "../../../actions/Playlist";
import broadcastName from "../../../broadcast";

interface PlayerComponentProps extends IComponentPropsCommon{
    play: () => void;
    stop: () => void;
    setPos: (_n: number) => void;
    playlist: Array<ITrack>;
    position: number;
    isPlay: boolean;
    isMobileFull:boolean;
    toggleMobileFull: () => void;
    setPlaylist: (_tracks: ITrack[]) => void;
    displayPlayState: (_status:boolean) => void;
    playDisplay:boolean;
    isAuth:boolean;
}

class PlayerComponent extends VDom.Component<PlayerComponentProps> {
  #player: IPlayerClass | null;


  static contextType = RouterContext;


  syncChannel:BroadcastChannel;

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
      isControlled: false,
      isSyncWithServer:false,
      aboutToUnmount: false,
    };
    this.initPlayer = this.initPlayer.bind(this);
    this.loadTrackData = this.loadTrackData.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.checkPlay = this.checkPlay.bind(this);
    this.runNext = this.runNext.bind(this);
    this.runPrev = this.runPrev.bind(this);
    this.toogleShuffle = this.toogleShuffle.bind(this);
    this.connectToWS = this.connectToWS.bind(this);
    this.props.stop();
  }

  @VDom.util.Debounce(100)
  connectToWS():void{
    if (this.state.isSyncWithServer || !this.props.isAuth)  return;
    console.log('ws connecting...');
    this.syncChannel.postMessage({type:'WSCommand',payload:'connect'});
    this.syncChannel.postMessage({type:'getWSState',payload:'connect'});
    console.log('sent ws connect');
  }

  didUpdate(): void {
    if(this.state.aboutToUnmount){
      return;
    }

    if (!this.#player?.audio) {
      this.initPlayer();
      this.syncChannel.postMessage({type:'firstConnection',payload:'ok'});
      this.connectToWS();
      return;
    }

    if (!this.props.playlist) {
      this.connectToWS();
      return;
    }

    console.log('current playlist:', this.#player?.playlist, 'update with:', this.props.playlist);
    if (JSON.stringify(this.#player?.playlist) !== JSON.stringify(this.props.playlist)) {
      this.setState({trackTime: 0, trackFilled: 0, trackFetched: 0, trackBuffered: 0});
      this.#player?.updatePlaylist(this.props.playlist);
      this.syncChannel.postMessage({type:'playlist',payload:this.props.playlist});
      this.connectToWS();
    }

    if (
      typeof this.props.position === 'number' &&
            this.#player?.currentIndex !== this.props.position
    ) {
      console.log('position setting:',this.props.position);
      this.#player?.setPosition(this.props.position);
      this.syncChannel.postMessage({type:'position',payload:this.props.position});
      this.connectToWS();
    }
    // if (this.props.isPlay && !this.state.playState) {
    //   this.#player.stop();
    //   return;
    // }
    if (this.#player?.audio?.paused === this.props.isPlay) {
      this.connectToWS();
      this.checkPlay();
    }
  }

  didMount(): void {
    this.props.setPos(0);
    this.syncChannel = new BroadcastChannel(broadcastName);
    this.syncChannel.onmessage = this.onMessageBroadcast;
    if (!this.#player && this.props.playlist && this.props.playlist.length > 0) {
      this.initPlayer();
      this.syncChannel.postMessage({type:'firstConnection',payload:'ok'});
    }
    this.connectToWS();
    this.setState({aboutToUnmount:false});
    window.onbeforeunload = ():void =>{
      this.syncChannel.postMessage({type:'playState',payload:false});
      this.syncChannel.postMessage({type:'WSCommand',payload:"disconnect"});
    }
  }


  onMessageBroadcast = (_e:MessageEvent):void => {
    const {type,payload}:
        { type: string, payload: any} =
        _e.data;
    console.log('Player type',type,'payload',payload);
    // if(!this.state.isSyncWithServer && this.props.isAuth){
    //   this.syncChannel.postMessage({type:'WSCommand',payload:'connect'});
    // }
    switch (type){
    case 'firstConnection':{
      if(this.props.isAuth) return;
      if(!this.props.playlist) return;
      this.syncChannel.postMessage({type:'playlist',payload:this.props.playlist});
      setTimeout(() => {
        this.syncChannel.postMessage({type:'position',payload:this.props.position});
        this.syncChannel.postMessage({type:'playState',payload:this.props.playDisplay});
      },20);
      break;
    }
    case 'WSState':{
      switch (payload){
      case WebSocket.OPEN: {
        this.syncChannel.postMessage({type:'getWSState'});
        this.setState({isSyncWithServer:true});
        break;
      }

      case WebSocket.CLOSED: {
        this.setState({isSyncWithServer:false});
        break;
      }
      default:
      }
      break;
    }
    case 'playlist':
      if(!payload){
        return;
      }
      this.props.setPlaylist(payload);
      this.props.setPos(0);
      break;
    case 'position':
      if(!this.props.playlist){
        return;
      }
      console.log('got position',payload);
      console.log('position',payload, 'playlist:',this.props.playlist);
      this.#player?.setPosition(payload);
      this.props.setPos(payload);
      break;
    case 'playState':
      this.setState({playState:payload})
      this.props.displayPlayState(payload);
      if (!payload){
        this.props.stop();
        this.syncChannel.postMessage({type:'PlayersStopped',payload:'ok'})
      }
      break;
    default:
    }
  }

  willUmount(): void {
    if (this.#player?.audio) {
      this.#player.audio.removeEventListener('durationchange', this.loadTrackData);
      this.#player.audio.removeEventListener('loadstart', this.loadTrackData);
      this.#player.audio.removeEventListener('loadeddata', this.loadTrackData);
      this.#player.audio.removeEventListener('ended', this.runNext);
    }

    if(this.#player?.audio){
      this.#player.playlist = [];
      this.#player.audio.srcObject = null;
      this.props.stop();
    }
    this.#player = null;
    this.syncChannel.postMessage({type:'playState',payload:false});
    this.syncChannel.postMessage({type:'WSCommand',payload:'disconnect'});
    this.syncChannel.close();
    this.setState({aboutToUnmount:true});
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
      this.#player.audio.addEventListener('loadstart', this.loadTrackData);
      this.#player.audio.addEventListener('loadeddata', this.loadTrackData);
      this.#player.audio.addEventListener('ended', this.runNext);
    }
    if (this.#player.currentTrack) {
      this.loadTrackData();
    }
    this.connectToWS();
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
    this.syncChannel.postMessage({type:'playState',payload:false});
    if (this.props.isPlay) {
      this.#player?.play();
      this.syncChannel.postMessage({type:'playState',payload:true});
      return;
    }
    this.#player?.stop();
  }

  togglePlay(e?: Event): void {
    if (e instanceof Event) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (this.props.isPlay || this.props.playDisplay) {
      this.props.stop();
      this.checkPlay();
      return;
    }
    this.props.play();
    this.checkPlay();
  }

  runNext(e: Event | undefined = undefined): void {
    if (e instanceof Event) e.stopPropagation();
    if (!this.#player) return;
    if (this.#player.currentIndex + 1 > this.#player.playlist.length - 1) return;
    this.setState({trackFilled: 100});
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
      <div onclick={!this.props.isMobileFull ? this.props.toggleMobileFull: null} class={`player ${this.props.isMobileFull ? 'player_mobile' : ''}`}>
        {!this.props.isMobileFull &&
            <Waves analyser={this.#player.analyser} audio={this.#player.audio}/>
        }
        {this.props.isMobileFull &&
            <div onclick={this.props.toggleMobileFull} class="player__close-btn">
              <ArrowLeftIcon/>
            </div>
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
                          <AlternativeArrowLeftIcon/>
                        </div>
                        <div onClickCapture={this.togglePlay} class="control__play_pause">
                          {this.props.isPlay || this.props.playDisplay
                            ? (<PauseOutlineIcon style={{ height: '35px', width: '35px', }} />)
                            : (<PlayOutlineIcon style={{ height: '35px', width: '35px', }} />)
                          }
                        </div>
                        <div onclick={this.runNext} class="control__next">
                          <AlternativeArrowRightIcon />
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
                  <AlternativeArrowLeftIcon style={{ height: '25px', width: '25px', }} />
                </div>
                <div class="control__play_pause" onClick={this.togglePlay} onTouchEnd={this.togglePlay} >
                  {this.props.isPlay || this.props.playDisplay
                    ? (<PauseOutlineIcon style={{ height: '45px', width: '45px', }} />)
                    : (<PlayOutlineIcon style={{ height: '45px', width: '45px', }} />)
                  }
                </div>
                <div class="control__next" onClick={this.runNext} onTouchEnd={this.runNext} >
                  <AlternativeArrowRightIcon style={{ height: '25px', width: '25px', }} />
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
  setPlaylist: (tracks:ITrack[]):void => {
    dispatch(setTracks(tracks));
  },
  displayPlayState: (state:boolean):void => {
    dispatch(setPlayState(state));
  }
});

const mapStateToProps = (state: any): Map => ({
  isAuth: state.user?.id != null,
  playlist: state.playerPlaylist ? state.playerPlaylist : null,
  position: state.playerPosition ? state.playerPosition.value : 0,
  isPlay: state.playerPlay?.value ?? false,
  playDisplay: state.playDisplay?.value ?? false,
  
});

const Player = connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);
export default Player;
