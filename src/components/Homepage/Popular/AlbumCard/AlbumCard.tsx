import Component from '../../../../modules/VDom/Component';
import VirtualElement from '../../../../modules/VDom/VirtualElement';
import { IProps } from '../../../../modules/VDom/Interfaces';
import VDom from "../../../../modules/VDom";
import './AlbumCard.scss';

export default class AlbumCard extends Component {
  constructor(props: IProps) {
    super(props);
    this.state = {
      cover: '',
      title: '',
      artist: '',
    };
  }

  didMount():void {
    const { cover, title, artist } = this.props;
    this.setState({ cover, title, artist });
  }

  render = (): VirtualElement => (
    <div class="album">
      <img class="album__image" src={this.state.cover}/>
      <div class="text album__title">{this.state.title}</div>
      <div class="text album__artist">{this.state.artist}</div>
    </div>

  );
}
