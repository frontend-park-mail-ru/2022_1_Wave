import VirtualElement from '../../../../../modules/VDom/VirtualElement';
import './Track.scss';
import Component from '../../../../../modules/VDom/Component';
import VDom from '../../../../../modules/VDom';
import { IProps } from '../../../../../modules/VDom/Interfaces';

export default class Track extends Component {
  render = (): VirtualElement => (
    <li class="track-block">
      <p class="text track-block__number">{this.props.order.toString().padStart(2, '0')}</p>
      <img class="track-block__icon" src={this.props.cover}/>
      <div class="track-block__track-info">
        <p class="text track-info__title ">{this.props.title}</p>
        <p class="text track-info__artist">{this.props.artist}</p>
      </div>
    </li>
  );
}
