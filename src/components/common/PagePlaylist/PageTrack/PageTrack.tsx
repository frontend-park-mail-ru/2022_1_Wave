import VDom from '../../../../modules/VDom';
import '../../../../index.css';
import './PageTrack.scss';
import { IComponentPropsCommon } from '../../../../modules/VDom/IComponentProps';

interface PageTrackProps extends IComponentPropsCommon {
  num: number;
  cover: string;
  listenedCnt: number;
  name: string;
  duration: number;
  isLiked: boolean;
  handleClick: (e: Event) => void;
}

export default class PageTrack extends VDom.Component<PageTrackProps> {
  constructor(props: PageTrackProps) {
    super(props);
    this.state = {
      isLiked: false,
    };
    this.toogleLike = this.toogleLike.bind(this);
  }

  toogleLike(): void {
    this.setState({ isLiked: !this.state.isLiked });
  }

  didMount(): void {
    const { isLiked } = this.props;
    this.setState({ isLiked });
  }

  render = (): VDom.VirtualElement => {
    const { num, cover, listenedCnt, name, duration } = this.props;

    const formatInt = (n: number): string => {
      const res = Math.trunc(n).toString();
      return n >= 10 ? res : `0${res}`;
    };
    const heartState = this.state.isLiked ? 'fa-solid' : 'fa-regular';
    return (
      <div onclick={this.props.handleClick} class="text artist-track">
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
      </div>
    );
  };
}
