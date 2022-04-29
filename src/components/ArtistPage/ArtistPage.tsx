import VDom from '../../modules/VDom';
import '../../index.css';
import './ArtistPage.scss';
import CarouselRow from '../common/CarouselRow/CarouselRow';
import AlbumCard from '../common/AlbumCard/AlbumCard';
import { Map } from '../../modules/Store/types';
import { artistGetById, artistGetPopularById } from '../../actions/Artist';
import { connect } from '../../modules/Connect';
import { IProps } from '../../modules/VDom/Interfaces';
import RouterContext from '../../modules/Router/RouterContext';
import RouteNavigator from '../../modules/Router/RouteNavigator';
import { config } from '../../modules/Client/Client';
import { ITrack } from '../../modules/Media/media';
import { setTrack, setTracks } from '../../actions/Playlist';
import { startPlay } from '../../actions/Player';
import PagePlaylist from '../common/PagePlaylist/PagePlaylist';

class ArtistPageComponent extends VDom.Component<any, any, null, RouteNavigator> {
  static contextType = RouterContext;

  constructor(props: IProps) {
    super(props);
    this.getArtist = this.getArtist.bind(this);
    this.getTracks = this.getTracks.bind(this);
    this.state = {
      albumLikes: 12511,
      isLiked: false,
    };

    this.setLikeToArtist = this.setLikeToArtist.bind(this);
    this.addPopularToPlaylist = this.addPopularToPlaylist.bind(this);
    this.runTrack = this.runTrack.bind(this);
  }

  didMount(): void {
    this.getArtist();
    this.getTracks();
  }

  didUpdate(): void {
    this.getArtist();
    this.getTracks();
  }

  getArtist(): void {
    if (!this.props.artist || !this.props.artist[this.context.params.slug]) {
      this.props.getArtist(this.context.params.slug);
    }
  }

  getTracks(): void {
    if (!this.props.popularTracks || !this.props.popularTracks[this.context.params.slug]) {
      this.props.getArtistPopularTracks(this.context.params.slug);
    }
  }

  setLikeToArtist(): void {
    let likes = this.state.albumLikes;
    likes = this.state.isLiked ? likes - 1 : likes + 1;
    const isLiked = !this.state.isLiked;
    this.setState({ albumLikes: likes, isLiked });
  }

  addPopularToPlaylist(e: Event): void {
    this.props.setArtistPlaylist(this.props.popularTracks[this.context.params.slug]);
    this.props.runMusic();
  }

  runTrack(track: ITrack): (e: Event) => void {
    return (e: Event) => {
      this.props.setTrackFromArtist(track);
      this.props.runMusic();
    };
  }

  render = (): VDom.VirtualElement => {
    const { slug }: { slug: string } = this.context.params;
    if (!this.props.artist || !this.props.popularTracks) {
      return <div class="artist-page" />;
    }
    const artist = this.props.artist[slug] ? this.props.artist[slug] : null;
    const popularTracks = this.props.popularTracks[slug] ? this.props.popularTracks[slug] : null;
    if (!artist || !popularTracks) {
      return <div class="artist-page" />;
    }
    return (
      <div class="artist-page">
        <div
          class="artist-page__main"
          style={{
            'background-image': `linear-gradient(180deg, rgba(1, 208, 234, 0.2) 0%, rgba(0, 0, 0, 0) 48.44%),
    linear-gradient(180deg, rgba(11, 18, 32, 0.7) 0%, rgba(11, 18, 32, 0.9) 72.92%, #0B1220 93.23%),url(${
      config.files + artist.cover
    })`,
          }}
        >
          <div class="artist-page__artist">
            <div class="artist__related">
              <div class="text related__title">Related artists:</div>
              <span class="text related__names">Lana Del Rey, Moby</span>
            </div>
            <div class="text artist__main">
              Artist
              <div class="artist__name">{artist.name}</div>
              <div class="artist__controls">
                <div onclick={this.addPopularToPlaylist} class="button controls__btn-play">
                  <div class="text">Play</div>
                </div>
                <div class="text controls__likes">
                  <div
                    onclick={this.setLikeToArtist}
                    class={`${this.state.isLiked ? 'fa-solid' : 'fa-regular'} fa-heart likes__icon`}
                  ></div>
                  <div class="likes__num">{this.state.albumLikes}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="artist-page__popular">
            <div class="text artist__title">Popular songs</div>
            <PagePlaylist runTrack={this.runTrack} playlist={popularTracks} />
          </div>
        </div>

        <div class="artist-page__albums">
          <div class="text artist__title">Albums</div>
          <CarouselRow>
            {artist.albums
              ? artist.albums.map((v: any) => (
                  <AlbumCard cover={config.files + v.cover} title={v.title} artist={v.artist} />
                ))
              : ''}
          </CarouselRow>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state: any): Map => ({
  artist: state.artist ? state.artist : null,
  popularTracks: state.artistPopularTracks ? state.artistPopularTracks : null,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  getArtist: (id: string): void => {
    dispatch(artistGetById(id));
  },
  getArtistPopularTracks: (id: string): void => {
    dispatch(artistGetPopularById(id));
  },
  setArtistPlaylist: (tracks: ITrack[]): void => {
    dispatch(setTracks(tracks));
  },
  setSingleTrack: (track: ITrack): void => {
    dispatch(setTrack(track));
  },
  runMusic: (): void => {
    dispatch(startPlay);
  },
  setTrackFromArtist: (track: ITrack): void => {
    dispatch(setTrack(track));
  },
});

const ArtistPage = connect(mapStateToProps, mapDispatchToProps)(ArtistPageComponent);
export default ArtistPage;
