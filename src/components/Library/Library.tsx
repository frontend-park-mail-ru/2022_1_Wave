import VDom from '../../modules/VDom';
import '../../index.css';
import './Library.scss';
import { Map } from '../../modules/Store/types';
import { connect } from '../../modules/Connect';
import { IProps } from '../../modules/VDom/Interfaces';
import RouterContext from '../../modules/Router/RouterContext';
import RouteNavigator from '../../modules/Router/RouteNavigator';
import { config } from '../../modules/Client/Client';
import { ITrack } from '../../modules/Media/media';
import { setTrack, setTracks } from '../../actions/Playlist';
import { startPlay } from '../../actions/Player';
import PagePlaylist from '../common/PagePlaylist/PagePlaylist';
import { albumGetById, albumGetCoverById } from '../../actions/Album';

class ArtistPageComponent extends VDom.Component<any, any, null, RouteNavigator> {
  static contextType = RouterContext;

  constructor(props: IProps) {
    super(props);
    this.state = {
      albumLikes: 12511,
      isLiked: false,
    };

    this.getAlbum = this.getAlbum.bind(this);
    this.setLikeToArtist = this.setLikeToArtist.bind(this);
    this.addAlbumToPlaylist = this.addAlbumToPlaylist.bind(this);
    this.runTrack = this.runTrack.bind(this);
  }

  didMount(): void {
    this.getAlbum();
  }

  getAlbum(): void {
    if (!this.props.album || !this.props.album[this.context.params.slug]) {
      const id: number = this.context.params.slug;
      this.props.getAlbum(id);
      this.props.getAlbumCover(id);
    }
  }

  setLikeToArtist(): void {
    let likes = this.state.albumLikes;
    likes = this.state.isLiked ? likes - 1 : likes + 1;
    const isLiked = !this.state.isLiked;
    this.setState({ albumLikes: likes, isLiked });
  }

  addAlbumToPlaylist(e: Event): void {
    this.props.setAlbumPlaylist(this.props.album[this.context.params.slug].tracks);
    this.props.runMusic();
  }

  runTrack(track: ITrack): (e: Event) => void {
    return (e: Event) => {
      this.props.setTrackFromAlbum(track);
      this.props.runMusic();
    };
  }

  render = (): VDom.VirtualElement => {
    const { slug }: { slug: string } = this.context.params;
    const album = this.props?.album?.[slug];
    const cover = this.props?.cover?.[slug];
    return !album ? (
      <div class="album-page" />
    ) : (
      <div class="album-page">
        <div
          class="album-page__main"
          style={{
            'background-image': `linear-gradient(180deg, rgba(1, 208, 234, 0.2) 0%, rgba(0, 0, 0, 0) 48.44%),
    linear-gradient(180deg, rgba(11, 18, 32, 0.7) 0%, rgba(11, 18, 32, 0.9) 72.92%, #0B1220 93.23%),url(${
      config.files + album.cover
    })`,
          }}
        >
          <div class="album-page__album">
            <div class="text album__main">
              Album
              <div class="album__name">{album.title}</div>
              <div class="album__quote">{cover ? cover.quote : ''}</div>
              <div class="album__controls">
                <div onclick={this.addAlbumToPlaylist} class="button controls__btn-play">
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
          <div class="album-page__popular">
            <div class="text album__title">Songs</div>
            <PagePlaylist runTrack={this.runTrack} playlist={album.tracks} />
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state: any): Map => ({
  album: state.album ? state.album : null,
  cover: state.albumCover ? state.albumCover : null,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  getAlbum: (id: string): void => {
    dispatch(albumGetById(id));
  },
  getAlbumCover: (id: string): void => {
    dispatch(albumGetCoverById(id));
  },
  setAlbumPlaylist: (tracks: ITrack[]): void => {
    dispatch(setTracks(tracks));
  },
  runMusic: (): void => {
    dispatch(startPlay);
  },
  setTrackFromAlbum: (track: ITrack): void => {
    dispatch(setTrack(track));
  },
});

const ArtistPage = connect(mapStateToProps, mapDispatchToProps)(ArtistPageComponent);
export default ArtistPage;
