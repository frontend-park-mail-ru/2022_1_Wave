import Component from '../../modules/VDom/Component';
import VirtualElement from '../../modules/VDom/VirtualElement';
import Navbar from '../common/Navbar/Navbar';
import VDom from '../../modules/VDom';
import '../../index.css';
import './ArtistPage.scss';
import img from '../../assets/img.png';
import ArtistPlaylist from './ArtistPlaylist/ArtistPlaylist';
import CarouselRow from '../common/CarouselRow/CarouselRow';
import AlbumCard from '../common/AlbumCard/AlbumCard';
import album from '../../assets/playlist-track-icon-dummy.png';

export default class ArtistPage extends Component {
  render = (): VirtualElement => {
    const { isAuthorized } = this.props;

    return (
      <div class="artist-page">
        <div class="artist-page__main" style={{ 'background-image': `url(${img})` }}>
          <Navbar isAuthorized={true} />
          <div class="artist-page__artist">
            <div class="artist__related">
              <div class="text related__title">Related artists:</div>
              <span class="text related__names">Lana Del Rey, Moby</span>
            </div>
            <div class="text artist__main">
              Artist
              <div class="artist__name">Flume</div>
              <div class="artist__controls">
                <div class="button controls__btn-play">
                  <div class="text">Play</div>
                </div>
                <div class="text controls__likes">
                  <div class="fa-regular fa-heart likes__icon"></div>
                  <div class="likes__num">124 1412</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="artist-page__popular">
          <div class="text artist__title">Popular songs</div>
          <ArtistPlaylist />
        </div>
        <div class="artist-page__albums">
          <div class="text artist__title">Albums</div>
          <CarouselRow>
            <AlbumCard cover={album} title="eboi" artist="viva" />
            <AlbumCard cover={album} title="eboi" artist="viva" />
            <AlbumCard cover={album} title="eboi" artist="viva" />
          </CarouselRow>
        </div>
      </div>
    );
  };
}
