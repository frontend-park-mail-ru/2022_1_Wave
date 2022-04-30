import VDom from '@rflban/vdom';
import '../../../../index.css';
import './ArtistTrack.scss';

export default class ArtistTrack extends VDom.Component {
  constructor(props: any) {
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
