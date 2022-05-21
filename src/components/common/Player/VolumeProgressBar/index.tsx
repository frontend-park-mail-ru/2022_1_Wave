import VDom from "@rflban/vdom";
import {
  VolumeLevelNoneIcon,
  VolumeLevel0Icon,
  VolumeLevel1Icon,
  VolumeLevel2Icon,
} from '@rflban/waveui';
import {IComponentPropsCommon} from "@rflban/vdom/dist/IComponentProps";
import InteractiveProgressBar from "../../InteractiveProgressBar";
import './style.scss';
import broadcast from "../../../../broadcast";

interface ProgressBarProps extends IComponentPropsCommon {
    audio: HTMLAudioElement;
}

export default class VolumeProgressBar extends VDom.Component<ProgressBarProps> {

  state = {
    volume: 50,
  }

  volumeChannel:BroadcastChannel;


  constructor(props: ProgressBarProps) {
    super(props);
    this.setVolume = this.setVolume.bind(this);
  }

  setVolume(relativePosition: number): void {
    if(!this.props.audio) return;
    this.props.audio.volume = relativePosition;
    this.setState({volume: relativePosition * 100});
    this.volumeChannel.postMessage({volume:relativePosition});
  }

  didMount():void {
    this.setState({volume: this.props.audio.volume * 100})
    this.volumeChannel = new BroadcastChannel(broadcast);
    this.volumeChannel.onmessage = (_e:MessageEvent) => {
      const {volume}: {volume:number} = _e.data;
      if (volume !== undefined){
        this.props.audio.volume = volume;
        this.setState({volume: volume * 100});
      }
    }
  }

  willUmount():void {
    this.volumeChannel.close();
  }

  getVolIcon = ():string => {
    let volIcon: string;
    if(!this.props.audio) return 'fa-volume-off';
    switch (true) {
    case this.props.audio.volume === 0:
      volIcon = 'fa-volume-xmark';
      break;
    case this.state.volume < 25:
      volIcon = 'fa-volume-off';
      break;
    case this.state.volume < 60:
      volIcon = 'fa-volume-low';
      break;
    default:
      volIcon = 'fa-volume-high';
      break;
    }
    return volIcon;
  }

  getVolIconSVG = (): VDom.VirtualElement => {
    if(!this.props.audio)
      return <VolumeLevelNoneIcon  onClick={this.toggleMute} onTouchEnd={this.toggleMute}/>;

    switch (true) {
    case this.props.audio.volume === 0:
      return <VolumeLevelNoneIcon class="volume__icon" onClick={this.toggleMute} onTouchEnd={this.toggleMute}/>;
    case this.state.volume < 25:
      return <VolumeLevel0Icon class="volume__icon" onClick={this.toggleMute} onTouchEnd={this.toggleMute}/>;
    case this.state.volume < 60:
      return <VolumeLevel1Icon class="volume__icon" onClick={this.toggleMute} onTouchEnd={this.toggleMute}/>;
    default:
      return <VolumeLevel2Icon class="volume__icon" onClick={this.toggleMute} onTouchEnd={this.toggleMute}/>;
    }
  }

  toggleMute = (e: Event): void  => {
    e.preventDefault();
    if(!this.props.audio) return;
    const volume:number =  this.props.audio.volume > 0 ? 0 : 0.5;
    this.setVolume(volume);
  }

  render = (): VDom.VirtualElement => (
    <div class="volume-progressbar">
      {this.getVolIconSVG()}

      <InteractiveProgressBar
        setProgressState={this.setVolume}
        progress={this.state.volume}/>
    </div>
  )

}