import '../../../index.css';
import './Popular.scss';
import CarouselRow from '../../common/CarouselRow/CarouselRow';
import AlbumCard from '../../common/AlbumCard/AlbumCard';
import ArtistCard from '../../common/ArtistCard/ArtistCard';
import VDom from '../../../modules/VDom';
import { Map } from '../../../modules/Store/types';
import { connect } from '../../../modules/Connect';
import { albumGetPopular } from '../../../actions/Album';
import { artistGetPopular } from '../../../actions/Artist';
import Link from '../../../modules/Router/Link';
import { config } from '../../../modules/Client/Client';
import {IComponentPropsCommon} from "../../../modules/VDom/IComponentProps";

interface PopularComponentProps extends IComponentPropsCommon {
  albums?: Array<object>;
  artists?: Array<object>;
  getAlbums: () => void;
  getArtist: () => void;
}

class PopularComponent extends VDom.Component<PopularComponentProps> {
  constructor(props: PopularComponentProps) {
    super(props);
    this.props.getAlbums();
    this.props.getArtist();
  }

  render = (): VDom.VirtualElement => (
    <div class="main__popular">
      <div class="main__popular__albums main__popular_slider-hidden">
        <div class="text main__popular__title">Popular albums</div>
        <CarouselRow>
          {this.props.albums
            ? this.props.albums.map((v: any) => (
              <AlbumCard
                cover={config.files + v.cover}
                title={v.title}
                artist={v.artist}
              />
            ))
            : ''}
        </CarouselRow>
      </div>
      <div class="main__popular__artists main__popular_slider-hidden">
        <div class="text main__popular__title">Popular artist</div>
        <CarouselRow>
          {this.props.artists
            ? this.props.artists.map((v: any) => (
              <ArtistCard
                cover={config.files + v.cover}
                name={v.name}
              />
            ))
            : ''}
        </CarouselRow>
      </div>
    </div>
  );
}
const mapStateToProps = (state: any): Map => ({
  artists: state.artistPopular ? state.artistPopular.popular : null,
  albums: state.albumPopular ? state.albumPopular.popular : null,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  getArtist: (): void => {
    dispatch(artistGetPopular);
  },
  getAlbums: (): void => {
    dispatch(albumGetPopular);
  },
});

const Popular = connect(mapStateToProps, mapDispatchToProps)(PopularComponent);
export default Popular;
