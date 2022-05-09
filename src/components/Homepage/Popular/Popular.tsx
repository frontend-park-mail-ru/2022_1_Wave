import './Popular.scss';
import VDom from '@rflban/vdom';
import CarouselRow from '../../common/CarouselRow/CarouselRow';
import AlbumCard from '../../common/AlbumCard/AlbumCard';
import ArtistCard from '../../common/ArtistCard/ArtistCard';
import { Map } from '../../../modules/Store/types';
import { connect } from '../../../modules/Connect';
import { albumGetPopular } from '../../../actions/Album';
import { artistGetPopular } from '../../../actions/Artist';
import { config } from '../../../modules/Client/Client';

interface PopularComponentProps {
  albums?: Array<Map>;
  artists?: Array<Map>;
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
          {this.props.albums &&
            Object.entries(this.props.albums).map(([_,v]:[k:string,v:Map]) =>
              <AlbumCard cover={config.files + v.cover} title={v.title} artist={v.artist}/> )
          }
        </CarouselRow>
      </div>
      <div class="main__popular__artists main__popular_slider-hidden">
        <div class="text main__popular__title">Popular artist</div>
        <CarouselRow>
          {this.props.artists && 
              Object.entries(this.props.artists).map(([_,v]:[k:string,v:Map]) =>
                <ArtistCard cover={config.files + v.cover} name={v.name} />)
          }
        </CarouselRow>
      </div>
    </div>
  );
}
const mapStateToProps = (state: any): Map => ({
  artists: state.artistPopular ?? null,
  albums: state.albumPopular ?? null,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  getArtist: (): void => {
    dispatch(artistGetPopular);
  },
  getAlbums: (): void => {
    dispatch(albumGetPopular);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularComponent);
