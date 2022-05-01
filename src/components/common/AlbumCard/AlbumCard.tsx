import VDom from '@rflban/vdom';
import './AlbumCard.scss';
import Link from '../../../modules/Router/Link';

interface AlbumCardProps {
  cover: string;
  title: string;
  artist: string;
}

export default class AlbumCard extends VDom.Component<AlbumCardProps> {
  render = (): VDom.VirtualElement => {
    const { cover, title, artist } = this.props;

    return (
      <div class="album">
        <Link
          to={`/album/${cover.split('_')[1].split('.')[0]}`}
          as="img"
          class="album__image"
          src={cover}
        />
        <Link to={`/album/${cover.split('_')[1].split('.')[0]}`} as="div" class="text album__title">
          {title}
        </Link>
        <Link to={`/artist/${cover.split('_')[1].split('.')[0]}`} class="text album__artist">
          {artist}
        </Link>
      </div>
    );
  };
}
