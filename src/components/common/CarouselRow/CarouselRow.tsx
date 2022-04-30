import VDom from '@rflban/vdom';
import './CarouselRow.scss';

export default class CarouselRow extends VDom.Component {
  render = (): VDom.VirtualElement => <div class="carousel-row">{this.children}</div>;
}
