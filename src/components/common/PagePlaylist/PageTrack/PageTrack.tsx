import VDom from '@rflban/vdom';
import '../../../../index.css';
import './PageTrack.scss';
import StringWrapper from "@rflban/vdom/dist/StringWrapper";

interface PageTrackProps {
  id: number;
  num: number;
  cover: string;
  listenedCnt: number;
  name: string;
  duration: number;
  isLiked: boolean;
  handleClick: (_e: Event) => void;
  contextMenu: (VDom.VirtualElement | StringWrapper)[] | undefined;
}

export default class PageTrack extends VDom.Component<PageTrackProps> {
  state={
    contextPosX:0,
    contextPosY:0,
    isLiked: false,
    contextShow: false,
  }

  constructor(props: PageTrackProps) {
    super(props);
    this.toogleLike = this.toogleLike.bind(this);
  }

  toogleLike(): void {
    this.setState({ isLiked: !this.state.isLiked });
  }

  didMount(): void {
    const { isLiked } = this.props;
    this.setState({ isLiked });
  }

  showContextMenu = (e: PointerEvent):void => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    this.setState({contextShow:true,contextPosX:e.clientX - rect.left,contextPosY:e.clientY - rect.top})
  }

  closeContextMenu = (e: PointerEvent):void => {
    this.setState({contextShow:false});
  }

  render = (): VDom.VirtualElement => {
    const { num, cover, listenedCnt, name, duration } = this.props;

    const formatInt = (n: number): string => {
      const res = Math.trunc(n).toString();
      return n >= 10 ? res : `0${res}`;
    };
    const heartState = this.state.isLiked ? 'fa-solid' : 'fa-regular';
    return (
      <div id={this.props.id} onclick={this.props.handleClick} oncontextmenu={this.showContextMenu} class="text artist-track">
        <div class="artist-track__info">
          {num}
          <img class="artist-track__cover" src={cover} />
          <div class="artist-track__name">{name}</div>
        </div>

        <div class="artist-track__meta">
          <div class="artist-track__listened">
            {listenedCnt}
            <div class="listened__dot" />
          </div>
          <div onclick={this.toogleLike} class={`liked-icon ${heartState} fa-heart`} />
          <div class="artist-track__duration">
            {`${formatInt(duration / 60)}:${formatInt(duration % 60)}`}
          </div>
        </div>
        {this.state.contextShow &&
            <div class="context-menu" onmouseleave={this.closeContextMenu} style={{top:`${this.state.contextPosY}px`, left: `${this.state.contextPosX}px`}}>
              {this.props.contextMenu}
            </div>
        }
      </div>
    );
  };
}
