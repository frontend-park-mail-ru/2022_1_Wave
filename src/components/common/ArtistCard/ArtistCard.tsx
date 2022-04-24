import VDom from '../../../modules/VDom';
import './ArtistCard.scss';
import Link from "../../../modules/Router/Link";

export default class ArtistCard extends VDom.Component {
  render = (): VDom.VirtualElement => {
    const { cover, name } = this.props;
    return (
      <div onclick={this.props.onClick} class="artist">
        <img class="artist__image" src={cover} />
        <div class="text artist__name">
          <Link to={`/artist/${cover.split('_')[1].split('.')[0]}`}> {name}</Link>
        </div>
      </div>
    );
  };
}
