import Component from '../../../../modules/VDom/Component';
import VirtualElement from '../../../../modules/VDom/VirtualElement';
import VDom from '../../../../modules/VDom';
import '../../../../index.css';
import './ArtistTrack.scss';
import { IProps } from '../../../../modules/VDom/Interfaces';

export default class ArtistTrack extends Component {
  constructor(props:IProps) {
    super(props);
    this.state = {
      isLiked: false,
    };
    this.toogleLike = this.toogleLike.bind(this);
  }

  toogleLike(): void {
    this.setState({ isLiked: !this.state.isLiked });
  }

  didMount():void {
    const { isLiked } = this.props;
    this.setState({ isLiked });
  }

  render = (): VirtualElement => {
    const {
      num, cover, listenedCnt, name, duration,
    } = this.props;

    const formatInt = (n: number):string => {
      const res = Math.trunc(n).toString();
      return n >= 10 ? res : `0${res}`;
    };
    const heartState = this.state.isLiked ? 'fa-solid' : 'fa-regular';
    return (
      <div class="text artist-track">
        <div class="artist-track__info">
          {num}
          <img class="artist-track__cover" src={cover}/>
          <div class="artist-track__name">
            {name}
          </div>
        </div>

        <div class="artist-track__meta">
          <div class="artist-track__listened">
            {listenedCnt}
            <div class="listened__dot"/>
          </div>
          <div onclick={this.toogleLike} class={`liked-icon ${heartState} fa-heart`}/>
          <div class="artist-track__duration">
            {`${formatInt(duration / 60)}:${
              formatInt(duration % 60)}`}
          </div>
        </div>

      </div>
    );
  };
}
