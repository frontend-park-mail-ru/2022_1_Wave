import VDom from '../../../modules/VDom';
import './CarouselRow.scss';

export default class CarouselRow extends VDom.Component {
  render = (): VDom.VirtualElement => <div class="carousel-row">{this.children}</div>;
}
