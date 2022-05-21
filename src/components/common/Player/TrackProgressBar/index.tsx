import VDom from "@rflban/vdom";
import {IComponentPropsCommon} from "@rflban/vdom/dist/IComponentProps";
import InteractiveProgressBar from "../../InteractiveProgressBar";
import {Map} from "../../../../modules/Store/types";
import {startPlay, stopPlay} from "../../../../actions/Player";
import marker from '../../../../assets/player_marker.png';
import {connect} from "../../../../modules/Connect";
import './style.scss';
import broadcast from "../../../../broadcast";

interface ProgressBarProps extends IComponentPropsCommon {
    audio: HTMLAudioElement;
    play: () => void;
    stop: () => void;
}

class TrackProgressBar extends VDom.Component<ProgressBarProps>{

  state = {
    trackBuffered: 0,
    trackTime:0,
    trackFilled:0
  }

  progressChannel:BroadcastChannel;

  constructor(props: ProgressBarProps) {
    super(props);
    this.setTime = this.setTime.bind(this);
    this.timeUpdater = this.timeUpdater.bind(this);
    this.fetchedUpdater = this.fetchedUpdater.bind(this);
  }

  formatInt = (n: number): string => {
    const res = Math.trunc(n).toString();
    return n >= 10 ? res : `0${res}`;
  };

  setTime(relativePosition: number): void {
    if(!this.props.audio) return;
    this.props.audio.currentTime = relativePosition * this.props.audio.duration;
  }

  didMount(): void {
    if(!this.props.audio) return;
    this.props.audio.addEventListener('timeupdate', this.timeUpdater);
    this.props.audio.addEventListener('progress', this.fetchedUpdater);
    this.props.audio.addEventListener('loadedmetadata', this.fetchedUpdater);
    this.progressChannel = new BroadcastChannel(broadcast);
    this.progressChannel.onmessage = (e:MessageEvent) => {
      const {progress}:{progress:number} = e.data;
      if(this.props.audio.paused  &&
          progress !== undefined &&
          this.props.audio.currentTime !== progress
      ){

        this.props.audio.currentTime = progress;

      }
    };
    this.timeUpdater()
  }

  willUmount(): void {
    this.props.audio.removeEventListener('timeupdate',this.timeUpdater);
    this.props.audio.removeEventListener('progress',this.fetchedUpdater);
    this.props.audio.removeEventListener('loadedmetadata',this.fetchedUpdater);
    this.progressChannel.close();
  }

  fetchedUpdater(): void {
    if(!this.props.audio) return;
    if (this.props.audio.buffered.length > 0) {
      const fetchedEnd = this.props.audio.buffered.end(this.props.audio.buffered.length - 1);
      this.setState({ trackBuffered: (fetchedEnd / this.props.audio.duration) * 100 });
    }
  }

  timeUpdater(_e?: Event): void {
    if(!this.props.audio) return;
    this.fetchedUpdater();
    const filled = (this.props.audio.currentTime / this.props.audio.duration) * 100;
    this.setState({ trackTime: this.props.audio.currentTime, trackFilled: filled });
    this.progressChannel.postMessage({progress:this.props.audio.currentTime});
  }

  render = (): VDom.VirtualElement => <div class="player-progressbar">
    <InteractiveProgressBar 
      onDragStart={this.props.stop}
      onDragStop={this.props.play}
      setProgressState={this.setTime}
      progress={this.state.trackFilled}
      additionalProgress={this.state.trackBuffered}
      marker={marker}/>
    <div class="text player__progressbar__time">
      {`${this.formatInt(this.state.trackTime / 60)}:${this.formatInt(this.state.trackTime % 60)}`}
    </div>
  </div>
}

// export default Player;
const mapDispatchToProps = (dispatch: any): Map => ({
  play: (): void => {
    dispatch(startPlay);
  },
  stop: (): void => {
    dispatch(stopPlay);
  },
});

const mapStateToProps = (state: any): Map => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TrackProgressBar);
