import Component from '../../../modules/VDom/Component';
import VirtualElement from '../../../modules/VDom/VirtualElement';
import { IProps } from '../../../modules/VDom/Interfaces';
import VDom from "../../../modules/VDom";
import './ArtistCard.scss';

export default class ArtistCard extends Component {
  constructor(props: IProps) {
    super(props);
    this.state = {
      cover: '',
      name: '',
    };
  }

  didMount():void {
    const { cover, name } = this.props;
    this.setState({ cover, name });
  }

  render = (): VirtualElement => (
    <div class="artist">
      <img class="artist__image" src={this.state.cover}/>
      <div class="text artist__name"> { this.state.name}</div>
    </div>
  );
}
