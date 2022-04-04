import VirtualElement from '../../../../../modules/VDom/VirtualElement';
import './Track.scss';
import Component from '../../../../../modules/VDom/Component';
import VDom from '../../../../../modules/VDom';
import { IProps } from '../../../../../modules/VDom/Interfaces';

export default class Track extends Component {
  constructor(props: IProps) {
    super(props);
    this.state = {
      num: '0',
      title: '',
      cover: '',
      artist: '',
    };
  }

  didMount(): void {
    const {
      order, title, cover, artist,
    } = this.props;
    this.setState({
      num: order.toString().padStart(2, '0'),
      title,
      cover,
      artist,
    });
  }

  render = (): VirtualElement => (
    <li class="track-block">
      <p class="text track-block__number">{this.state.num}</p>
      <img class="track-block__icon" src={this.state.cover}/>
      <div class="track-block__track-info">
        <p class="text track-info__title ">{this.state.title}</p>
        <p class="text track-info__artist">{this.state.artist}</p>
      </div>
    </li>
  );
}
