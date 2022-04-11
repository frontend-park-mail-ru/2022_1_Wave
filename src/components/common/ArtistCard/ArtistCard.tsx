import VDom from '../../../modules/VDom';
import './ArtistCard.scss';

export default class ArtistCard extends VDom.Component {
  render = (): VDom.VirtualElement => {
    const { cover, name } = this.props;
    console.log('cover: ', cover, name);

    return (<div class="artist">
      <img class="artist__image" src={cover}/>
      <div class="text artist__name"> { name}</div>
    </div>
    );
  };
}
