import Component from '../../../modules/VDom/Component';
import VirtualElement from '../../../modules/VDom/VirtualElement';
import '../../../index.css';
import './Popular.scss';
import CarouselRow from '../../common/CarouselRow/CarouselRow';
import AlbumCard from '../../common/AlbumCard/AlbumCard';
import ArtistCard from '../../common/ArtistCard/ArtistCard';
import VDom from '../../../modules/VDom';
import album from '../../../assets/playlist-track-icon-dummy.png';
export default class Popular extends Component {
  render = (): VirtualElement => (

    <div class="main__popular">

      <div class="main__popular__albums main__popular_slider-hidden">
        <div class="text main__popular__title">
                    Popular albums
        </div>
        <CarouselRow>
          <AlbumCard cover={album} title="eboi" artist="viva"/>
          <AlbumCard cover={album} title="eboi" artist="viva"/>
          <AlbumCard cover={album} title="eboi" artist="viva"/>
          <AlbumCard cover={album} title="eboi" artist="viva"/>
          <AlbumCard cover={album} title="eboi" artist="viva"/>
          <AlbumCard cover={album} title="eboi" artist="viva"/>
        </CarouselRow>
      </div>
      <div class="main__popular__artists main__popular_slider-hidden">
        <div class="text main__popular__title">
                    Popular artist
        </div>
        <CarouselRow>
          <ArtistCard cover={album} name="fght"/>
          <ArtistCard cover={album} name="fght"/>
          <ArtistCard cover={album} name="fght"/>
          <ArtistCard cover={album} name="fght"/>
          <ArtistCard cover={album} name="fght"/>
          <ArtistCard cover={album} name="fght"/>
          <ArtistCard cover={album} name="fght"/>
          <ArtistCard cover={album} name="fght"/>
          <ArtistCard cover={album} name="fght"/>
          <ArtistCard cover={album} name="fght"/>
          <ArtistCard cover={album} name="fght"/>
          <ArtistCard cover={album} name="fght"/>
        </CarouselRow>
      </div>
    </div>
  );
}
