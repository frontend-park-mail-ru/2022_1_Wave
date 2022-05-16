import VDom from '@rflban/vdom';
import './AlbumCard.scss';
import {Caption} from "@rflban/waveui";
import Link from '../../../modules/Router/Link2';

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
        <Link to={`/album/${cover.split('_')[1].split('.')[0]}`}>
          <img class="album__image" src={cover}/>
        </Link>
        <Link to={`/album/${cover.split('_')[1].split('.')[0]}`}>
          <Caption class='album__title' align='left' size='m'>{title}</Caption>
        </Link>
        <br/>
        <Link to={`/artist/${cover.split('_')[1].split('.')[0]}`} class="text album__artist">
          {artist}
        </Link>
      </div>
    );
  };
}
