import VDom from '@rflban/vdom';
import './ArtistCard.scss';

export default class ArtistCard extends VDom.Component<any> {
  render = (): VDom.VirtualElement => {
    const { cover, name } = this.props;
    return (
      <div onclick={this.props.onClick} class="artist">
        <img class="artist__image" src={cover} />
        <div class="text artist__name"> {name}</div>
      </div>
    );
  };
}
