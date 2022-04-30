import VDom from '@rflban/vdom';
import './AlbumCard.scss';

export default class AlbumCard extends VDom.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {
      cover: '',
      title: '',
      artist: '',
    };
  }

  render = (): VDom.VirtualElement => {
    const { cover, title, artist } = this.props;

    return (
      <div class="album">
        <img class="album__image" src={cover} />
        <div class="text album__title">{title}</div>
        <div class="text album__artist">{artist}</div>
      </div>
    );
  };
}
