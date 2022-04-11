import Component from '../../../modules/VDom/Component';
import VirtualElement from '../../../modules/VDom/VirtualElement';
import { IProps } from '../../../modules/VDom/Interfaces';
import VDom from '../../../modules/VDom';
import './AlbumCard.scss';

export default class AlbumCard extends VDom.Component {
  constructor(props: IProps) {
    super(props);
    this.state = {
      cover: '',
      title: '',
      artist: '',
    };
  }

  render = (): VDom.VirtualElement => {
    const { cover, title, artist } = this.props;

    return (<div class="album">
      <img class="album__image" src={cover}/>
      <div class="text album__title">{title}</div>
      <div class="text album__artist">{artist}</div>
    </div>

    );
  };
}
