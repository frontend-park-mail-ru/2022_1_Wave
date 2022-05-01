import VDom from '@rflban/vdom';
import './ArtistCard.scss';
import Link from '../../../modules/Router/Link';

interface ArtistCardProps {
  cover: string;
  name: string;
}

export default class ArtistCard extends VDom.Component<ArtistCardProps> {
  render = (): VDom.VirtualElement => {
    const { cover, name } = this.props;
    return (
      <Link to={`/artist/${cover.split('_')[1].split('.')[0]}`}>
        <div class="artist">
          <img class="artist__image" src={cover} />
          <div class="text artist__name"> {name}</div>
        </div>
      </Link>
    );
  };
}
