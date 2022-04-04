import Component from '../../../../modules/VDom/Component';
import VirtualElement from '../../../../modules/VDom/VirtualElement';
import VDom from '../../../../modules/VDom';
import './CarouselRow.scss';

export default class CarouselRow extends Component {
  render = (): VirtualElement => (
    <div class="carousel-row">
      {this.children}
    </div>
  );
}
