import VDom from "@rflban/vdom";
import {IComponentPropsCommon} from "@rflban/vdom/dist/IComponentProps";
import './style.scss';

interface ProgressBarProps extends IComponentPropsCommon {
    onDragStart?: () => void;
    onDragStop?: () => void;
    setProgressState: (value: number) => void;
    progress: number;
    additionalProgress?: number;
    marker?: string;
}

export default class InteractiveProgressBar extends VDom.Component<ProgressBarProps> {

  state = {
    isPlayerDragged: false
  }

  onDrag = (e: MouseEvent | TouchEvent):void => {
    e.stopPropagation();
    switch (e.type) {
    case 'mousedown':
    case 'touchstart':
      this.setState({ isPlayerDragged : true})
      this.props.onDragStart?.();
      break;
    case 'mouseup':
    case 'touchend':
      this.props.onDragStop?.();
      this.setState({ isPlayerDragged : false})
      break
    default:
      this.setState({ isPlayerDragged : false})
    }
  }

  setProgress = (e: MouseEvent | TouchEvent):void => {
    e.stopPropagation();
    if ((e.type === 'mousemove' || e.type === 'touchmove') && !this.state.isPlayerDragged) {
      return;
    }
    let relativePosition : number = this.getRelativePosition(e);
    relativePosition = relativePosition > 1 ? 1 : relativePosition;
    this.props.setProgressState(relativePosition);
  }
    
  getRelativePosition = (e: MouseEvent| TouchEvent): number  => {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e instanceof TouchEvent ? (e as TouchEvent).changedTouches?.[0].clientX : e.clientX;
    const relativePosition = (x - rect.left) / (rect.right - rect.left);
    if (relativePosition < 0) {
      return 0;
    }
    return relativePosition;
  }

  render = (): VDom.VirtualElement =>{
    return (<div class="progress-bar"
      onClick={this.setProgress}
      onTouchEnd={this.setProgress}
      onMouseMove={this.setProgress}
      onTouchMove={this.setProgress}
      onMouseLeave={this.onDrag}>
      <div class="progress-bar__progress">

        { this.props.additionalProgress &&
          <div
            class="progress__additional"
            style={{width: `${this.props.additionalProgress}%`}}
          />
        }
        <div class="progress__main">
          <div
            class="progress__main__state"
            style={{width: `${this.props.progress}%`}}
          ></div>
          <div class="progressbar__main__marker"
            draggable={false}
            onMouseDown={this.onDrag}
            onMouseUp={this.onDrag}
            onTouchStart={this.onDrag}
            onTouchEnd={this.onDrag}
            style={{
              'margin-left': `calc(${this.props.progress}% - 1em)`,
            }}
          >
            <div class="marker__img"
              style={{
                'background-image': this.props.marker ? `url("${this.props.marker}")` : '',
                cursor: `${this.state.isPlayerDragged ? 'grabbing' : 'pointer'}`,
              }}
            />
          </div>
        </div>
      </div>
    </div>)
  }
}
