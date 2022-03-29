import VirtualElement from '../../../modules/VDom/VirtualElement';
import './Player.scss';
import Component from '../../../modules/VDom/Component';
import VDom from '../../../modules/VDom';
import '@fortawesome/fontawesome-free/js/all.js';
import '@fortawesome/fontawesome-free/css/all.css';
import '../../App/App.scss';
import marker from '../../../assets/player_marker.png';
import { IPlayerClass } from '../../../modules/Media/media';
import { IProps } from '../../../modules/VDom/Interfaces';

class Player extends Component {
  #player : IPlayerClass;

  #playIcon : HTMLElement = (<i class="svg-inline--fa fa-regular fa-circle-play"></i>);

  #pauseIcon : HTMLElement = (<i class="svg-inline--fa fa-regular fa-circle-pause"></i>);


  constructor(props: IProps) {
    super(props);
    this.state = {
      playState: false,
      trackTime: 0,
      trackFetched: 0,
      trackVolume: 50,
    };
    this.tooglePlay = this.tooglePlay.bind(this);
    this.timeUpdater = this.timeUpdater.bind(this);
    this.setTime = this.setTime.bind(this);
    this.setVolume = this.setVolume.bind(this);
  }

  tooglePlay(e: Event): void {
    this.setState({ playState: !this.state.playState });
    if (this.state.playState) {
      this.#player.play();
      return;
    }
    this.#player.stop();
  }

  timeUpdater(e: Event): void {
    const filled = ((this.#player.audio.currentTime / this.#player.audio.duration) * 100);
    this.setState({ trackTime: filled });
  }

  setTime(e: MouseEvent): void {
    e.preventDefault();
    const relativePosition = this.getRelativePosition(e);
    this.#player.audio.currentTime = relativePosition * this.#player.audio.duration;
  }

  setVolume(e: MouseEvent): void {
    e.preventDefault();
    const relativePosition = this.getRelativePosition(e);
    console.log(relativePosition);
    this.setState({ trackVolume: relativePosition * 100 });
    console.log(this.state);
    //this.#player.audio.volume = relativePosition;
  }

  getRelativePosition(e: MouseEvent): number {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativePosition = (e.x - rect.left) / (rect.right - rect.left);
    if (relativePosition < 0) {
      return 0;
    }
    return relativePosition;
  }

  didMount(): void {
    const { player } = this.props;
    this.#player = player;
    this.#player.audio.addEventListener('timeupdate', this.timeUpdater);
  }

  render(): VirtualElement {
    const formatInt = (n: number):string => {
      const res = Math.trunc(n).toString();
      return n >= 10 ? res : `0${res}`;
    };

    return (
      <div class="player">
        <div class="player__waves"></div>
        <div class="player__track">
          <img class="track__picture" src="/assets/playlist-track-icon-dummy.png"></img>
          <div class="track__name">
            <div class="text track__name__title">Someth</div>
            <div class="text track__name__author">Smth</div>
          </div>
        </div>
        <div class="player__control">
          <div class="control__prev">
            <i class="fa-solid fa-backward-step"></i>
          </div>
          <div onclick={this.tooglePlay} class="control__play_pause">
            {
              this.state.playState ? this.#pauseIcon : this.#playIcon
            }
          </div>

          <div class="control__next">
            <i class="fa-solid fa-forward-step"></i>
          </div>
        </div>
        <div class="player__progressbar"
             onclick={this.setTime}
             ondrag={this.setTime}
             ondragend={this.setTime}
        >
          <div class="progressbar">
            <div class="progressbar__prefetched"></div>
            <div class="progressbar__state">
              <div class="progressbar__state__line" style={
                { width: `${this.state.trackTime.toString()}%` }
              }></div>
              <div draggable="true" class="progressbar__state__marker">
                <img draggable="false"  src={marker}></img>
              </div>
            </div>
          </div>
          <div class="text player__progressbar__time"> {
            `${formatInt(this.state.trackTime / 60)}:${
              formatInt(this.state.trackTime - this.state.trackTime / 60)}`
          }</div>
        </div>
        <div class="player__shuffle">
          <div class="fa-solid fa-shuffle"></div>
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
