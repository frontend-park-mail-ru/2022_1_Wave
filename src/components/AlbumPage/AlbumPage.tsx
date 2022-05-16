import VDom from '@rflban/vdom';
import {
  Button,
  Headline,
  Subhead,
} from '@rflban/waveui';
import '../../index.css';
import './AlbumPage.scss';
import { Map } from '../../modules/Store/types';
import { connect } from '../../modules/Connect';
import RouterContext from '../../modules/Router/RouterContext';
import RouteNavigator from '../../modules/Router/RouteNavigator';
import { config } from '../../modules/Client/Client';
import { ITrack } from '../../modules/Media/media';
import { setTrack, setTracks } from '../../actions/Playlist';
import { startPlay } from '../../actions/Player';
import PagePlaylist from '../common/PagePlaylist/PagePlaylist';
import { albumGetById, albumGetCoverById } from '../../actions/Album';
import {addTrackPlaylist, getPlaylists} from "../../actions/UserPlaylist";
import TracksContainer from '../common/TracksContainer/TracksContainer';
import { mainMobileScreen } from '../../mediaQueries';

class ArtistPageComponent extends VDom.Component<any, any, null, RouteNavigator> {
  static contextType = RouterContext;

  mediaSmallScreenhandler = (e: MediaQueryListEvent): void => {
    this.setState({
      smallScreen: e.matches,
    });
  }

  willUmount(): void {
    mainMobileScreen.removeEventListener('change', this.mediaSmallScreenhandler);
  }

  constructor(props: any) {
    super(props);
    this.state = {
      albumLikes: 12511,
      isLiked: false,
      smallScreen: mainMobileScreen.matches,
    };

    this.getAlbum = this.getAlbum.bind(this);
    this.setLikeToArtist = this.setLikeToArtist.bind(this);
    this.addAlbumToPlaylist = this.addAlbumToPlaylist.bind(this);
    this.runTrack = this.runTrack.bind(this);
    this.addTrack = this.addTrack.bind(this);

  }

  didMount(): void {
    mainMobileScreen.addEventListener('change', this.mediaSmallScreenhandler);
    this.getAlbum();
    this.props.getPlaylists();
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

  addAlbumToPlaylist(_e: Event): void {
    this.props.setAlbumPlaylist(this.props.album[this.context.params.slug].tracks);
    this.props.setPos(0);
    this.props.runMusic();
  }

  tracksClickHandler = (_e: MouseEvent): void => {
    this.props.setAlbumPlaylist(this.props.album[this.context.params.slug].tracks);
  }

  runTrack(track: ITrack): (_e: Event) => void {
    return (_e: Event) => {
      this.props.setTrackFromAlbum(track);
      this.props.runMusic();
    };
  }

  addTrack(playlistid:number): (e: Event) => void {
    return (e: Event) => {
      const trackid = parseInt(e.currentTarget.parentElement.parentElement.parentElement.id);
      e.preventDefault();
      e.stopPropagation();
      this.props.addTrack({trackid, playlistid});
    };
  }

  render = (): VDom.VirtualElement => {
    const { slug }: { slug: string } = this.context.params;
    const album = this.props?.album?.[slug];
    const cover = this.props?.cover?.[slug];

    if (!album) {
      return <></>;
    }

    return (
      <div class="waveAlbumPage">
        <div
          class="waveAlbumPage__cover"
          style={{
            'background-image': `linear-gradient(180deg, rgba(1, 208, 234, 0.2) 0%, rgba(0, 0, 0, 0) 48.44%),
    linear-gradient(180deg, rgba(11, 18, 32, 0.7) 0%, rgba(11, 18, 32, 0.9) 72.92%, #0B1220 93.23%),url(${
      config.files + album.cover
      })`,
          }}
        />
        <div class="waveAlbumPage__wrapper">
          <div class="waveAlbumPage__header">
            <Subhead align="left">
              <p class="waveAlbumPage__label">
                Album
              </p>
            </Subhead>
            <Headline align="left">
              {album.title}
            </Headline>
            <Button
              class="waveAlbumPage__play"
              size={this.state.smallScreen ? 'm' : 's'}
              stretched={this.state.smallScreen}
              onClick={this.addAlbumToPlaylist}
            >
              Play
            </Button>
          </div>

          <Subhead align="left" class="waveAlbumPage__songs-label">
            Songs
          </Subhead>

          <TracksContainer tracks={album.tracks} onTrackRun={this.tracksClickHandler} />
        </div>
      </div>
    );

    return (
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
              </div>
            </div>
          </div>
          <div class="album-page__popular">
            <div class="text album__title">Songs</div>
            <PagePlaylist runTrack={this.runTrack} playlist={album.tracks}>
              <div class="playlist-context">
                {
                  this.props.playlists &&
                    Object.entries(this.props.playlists).map(([_,v]:[k:string,v:Map])  => <div onClick={this.addTrack(v.id)}
                      class="text context__item">{v.title}</div>)
                }
              </div>
            </PagePlaylist>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state: any): Map => ({
  album: state.album ? state.album : null,
  cover: state.albumCover ? state.albumCover : null,
  playlists: state.userPlaylists,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  getAlbum: (id: string): void => {
    dispatch(albumGetById(id));
  },
  getPlaylists: (): void => {
    dispatch(getPlaylists());
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
  addTrack: ({trackid,playlistid}: {trackid:number,playlistid:number}): void => {
    dispatch(addTrackPlaylist({trackID: trackid,playlistID: playlistid}))
  }
});

const ArtistPage = connect(mapStateToProps, mapDispatchToProps)(ArtistPageComponent);
export default ArtistPage;
