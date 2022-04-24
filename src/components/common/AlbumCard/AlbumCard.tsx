import VDom from '../../../modules/VDom';
import './AlbumCard.scss';
import Link from "../../../modules/Router/Link";
import {IComponentPropsCommon} from "../../../modules/VDom/IComponentProps";

interface AlbumCardProps extends IComponentPropsCommon {
  cover: string;
  title: string;
  artist: string;
}

export default class AlbumCard extends VDom.Component<AlbumCardProps> {
  render = (): VDom.VirtualElement => {
    const { cover, title, artist } = this.props;

    return (
      <div class="album">
        <img class="album__image" src={cover} />
        <div class="text album__title">{title}</div>
        <Link to={`/artist/${cover.split('_')[1].split('.')[0]}`} class="text album__artist">{artist}</Link>
      </div>
    );
  };
}
