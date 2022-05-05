import VDom from '@rflban/vdom';
import '../../../../index.css';
import './PageTrack.scss';
import StringWrapper from "@rflban/vdom/dist/StringWrapper";
import { Map } from '../../../../modules/Store/types';
import { addToFavorites, removeFromFavorites } from '../../../../actions/Favorites';
import { connect } from '../../../../modules/Connect';

interface PageTrackProps {
  id: number;
  num: number;
  cover: string;
  listenedCnt: number;
  name: string;
  duration: number;
  handleClick: (_e: Event) => void;
  contextMenu: (VDom.VirtualElement | StringWrapper)[] | undefined;
  addToFavorites(_trackID: number): void;
  removeFromFavorites(_trackID: number): void;
  favorites: any;
}

class PageTrack extends VDom.Component<PageTrackProps> {
  private likeRef = new VDom.Ref<HTMLElement>();

  constructor(props: PageTrackProps) {
    super(props);
    this.toggleLike = this.toggleLike.bind(this);
  }

  toggleLike(): void {
    const isLiked = this.props.favorites.some((t: any) => t.id === this.props.id);

    if (isLiked) {
      this.props.removeFromFavorites(this.props.id);
    } else {
      this.props.addToFavorites(this.props.id);
    }
  }

  didMount(): void {
  }

  showContextMenu = (e: Event):void => {
    e.preventDefault();
  }

  handleClick = (e: MouseEvent): void => {
    if (e.target === this.likeRef.instance) {
      return this.toggleLike();
    }

    this.props.handleClick(e);
  }

  render = (): VDom.VirtualElement => {
    const { num, cover, listenedCnt, name, duration, favorites = [] } = this.props;

    const isLiked = favorites.some((t: any) => t.id === this.props.id);

    const formatInt = (n: number): string => {
      const res = Math.trunc(n).toString();
      return n >= 10 ? res : `0${res}`;
    };

    const heartState = isLiked ? 'fa-solid' : 'fa-regular';

    return (
      <div onclick={this.handleClick} oncontextmenu={this.showContextMenu} class="text artist-track">
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
          <div ref={this.likeRef} class={`liked-icon ${heartState} fa-heart`} />
          <div class="artist-track__duration">
            {`${formatInt(duration / 60)}:${formatInt(duration % 60)}`}
          </div>
        </div>
        {this.props.contextMenu && <div class="context-menu">
          {this.props.contextMenu}
        </div>
        }
      </div>
    );
  };
}

const mapStateToProps = (state: any): Map => ({
  favorites: state.favorites,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  addToFavorites: (trackID: number): void => {
    dispatch(addToFavorites(trackID));
  },
  removeFromFavorites: (trackID: number): void => {
    dispatch(removeFromFavorites(trackID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageTrack);
