import './Popular.scss';
import VDom from '@rflban/vdom';
import {
  ImageCard,
  HorizontalScroll,
  Subhead,
  AlbumIcon,
  SingerRightIcon,
} from '@rflban/waveui';
import CarouselRow from '../../common/CarouselRow/CarouselRow';
import AlbumCard from '../../common/AlbumCard/AlbumCard';
import ArtistCard from '../../common/ArtistCard/ArtistCard';
import { Map } from '../../../modules/Store/types';
import { connect } from '../../../modules/Connect';
import { albumGetPopular } from '../../../actions/Album';
import { artistGetPopular } from '../../../actions/Artist';
import { config } from '../../../modules/Client/Client';
import Link from '../../../modules/Router/Link2';

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
    <div class="wavePopular">
      <div class="wavePopular__albums">
        <Subhead
          size="m"
          align="left"
          class="wavePopular__title"
        >
          Popular albums
        </Subhead>
        <HorizontalScroll controlsCenterOffset={57} leftOffset={40} rightOffset={40}>
          {this.props.albums &&
            Object.entries(this.props.albums).map(([_, v]: [k: string, v: Map]) =>
              <ImageCard
                icon={<AlbumIcon style={{ height: '25%' }}/>}
                src={config.files + v.cover}
                title={
                  <Link to={`/album/${v.id}`}>
                    {v.title}
                  </Link>
                }
                label={
                  <Link to={`/artist/${v.artistId}`}>
                    {v.artist}
                  </Link>
                }
                size="l"
                imageWrapper={(img) => (
                  <Link to={`/album/${v.id}`}>
                    {img}
                  </Link>
                )}
              />
            )
          }
        </HorizontalScroll>
      </div>

      <div class="wavePopular__artists">
        <Subhead
          size="m"
          align="left"
          class="wavePopular__title"
        >
          Popular artists
        </Subhead>
        <HorizontalScroll
          controlsCenterOffset={41}
          leftOffset={40}
          rightOffset={40}
          gap={40}
          scrollStep={160}
        >
          {this.props.artists &&
            Object.entries(this.props.artists).map(([_,v]:[k:string,v:Map]) =>
              <ImageCard
                icon={<SingerRightIcon style={{ height: '25%' }}/>}
                src={config.files + v.cover}
                title={
                  <Link to={`/artist/${v.id}`}>
                    {v.name}
                  </Link>
                }
                size="m"
                rounded
                align="center"
                imageWrapper={(img) => (
                  <Link to={`/artist/${v.id}`}>
                    {img}
                  </Link>
                )}
              />)
          }
        </HorizontalScroll>
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
