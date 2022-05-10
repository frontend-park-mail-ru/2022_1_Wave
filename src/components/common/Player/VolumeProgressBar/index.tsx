import VDom from "@rflban/vdom";
import {IComponentPropsCommon} from "@rflban/vdom/dist/IComponentProps";
import InteractiveProgressBar from "../../InteractiveProgressBar";
import './style.scss';

interface ProgressBarProps extends IComponentPropsCommon {
    audio: HTMLAudioElement;
}

export default class VolumeProgressBar extends VDom.Component<ProgressBarProps> {

  state = {
    volume: 50,
  }

  constructor(props: ProgressBarProps) {
    super(props);
    this.setVolume = this.setVolume.bind(this);
  }

  setVolume(relativePosition: number): void {
    if(!this.props.audio) return;
    this.props.audio.volume = relativePosition;
    this.setState({volume: relativePosition * 100})
  }
  
  getVolIcon = ():string => {
    let volIcon: string;
    if(!this.props.audio) return 'fa-volume-off';
    console.log('audio get',this.state.volume);
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

  toogleMute = (e: Event): void  => {
    e.preventDefault();
    if(!this.props.audio) return;
    this.props.audio.volume = this.props.audio.volume > 0 ? 0 : 0.5;
    this.setState({volume: this.props.audio.volume * 100})
  }

  render = (): VDom.VirtualElement => {
    console.log('audio now',this.props.audio?.volume)

    return (
      <div class="volume-progressbar">
        <div onClick={this.toogleMute} onTouchEnd={this.toogleMute}
          class={`fa-solid ${this.getVolIcon()} volume__icon`}></div>
        <InteractiveProgressBar
          setProgressState={this.setVolume}
          progress={this.state.volume}/>
      </div>
    )
  }
  
}