import VDom from '@rflban/vdom';
import { Button, Headline, Subhead } from '@rflban/waveui';
import '../../index.css';
import './PlaylistPage.scss';
import { connect } from '../../modules/Connect';
import RouterContext from '../../modules/Router/RouterContext';
import RouteNavigator from '../../modules/Router/RouteNavigator';
import { config } from '../../modules/Client/Client';
import { ITrack } from '../../modules/Media/media';
import { setTrack, setTracks } from '../../actions/Playlist';
import {setPosition, startPlay} from '../../actions/Player';
import PagePlaylist from '../common/PagePlaylist/PagePlaylist';
import {deleteTrackPlaylist, getPlaylists} from "../../actions/UserPlaylist";
import { Map } from '../../modules/Store/types';
import TracksContainer from '../common/TracksContainer/TracksContainer';
import { mainMobileScreen } from '../../mediaQueries';
import Redirect from '../../modules/Router/Redirect';

class PlaylistPage extends VDom.Component<any, any, null, RouteNavigator> {
  static contextType = RouterContext;

  state = {
    playlist: undefined,
    smallScreen: mainMobileScreen.matches,
  }

  constructor(props: any) {
    super(props);
    this.addPlaylistToPlayer = this.addPlaylistToPlayer.bind(this);
    this.runTrack = this.runTrack.bind(this);
    if (!this.props?.playlists) {
      this.props.getPlaylists();
    }
  }

  mediaSmallScreenhandler = (e: MediaQueryListEvent): void => {
    this.setState({
      smallScreen: e.matches,
    });
  }

  didMount(): void {
    mainMobileScreen.addEventListener('change', this.mediaSmallScreenhandler);
  }

  willUmount(): void {
    mainMobileScreen.removeEventListener('change', this.mediaSmallScreenhandler);
  }

  addPlaylistToPlayer = (_e: Event): void => {
    const { slug }: { slug: string } = this.context.params;
    const playlist = this.props.playlists?.[slug];
    this.props.setTracks(playlist.tracks);
    this.props.setPos(0);
    this.props.runMusic();
  }

  tracksClickHandler = (_e: Event): void => {
    const { slug }: { slug: string } = this.context.params;
    const playlist = this.props.playlists?.[slug];
    this.props.setTracks(playlist.tracks);
  }

  runTrack(track: ITrack): (_e: Event) => void {
    return (e: Event) => {
      e.preventDefault();
      this.props.setTrackFromPlaylist(track);
      this.props.runMusic();
    };
  }

  deleteTrack(playlistid:number): (e: Event) => void {
    return (e: Event) => {
      const trackid = parseInt(e.currentTarget.parentElement.parentElement.parentElement.id);
      e.preventDefault();
      e.stopPropagation();
      this.props.deleteTrack({trackid, playlistid});
    };
  }

  render = (): VDom.VirtualElement => {
    if (this.props.userStatus === 'unauthorized') {
      return <Redirect to="/login" />;
    }
    if (this.props.userStatus === 'pending') {
      return <></>;
    }

    const { slug }: { slug: string } = this.context.params;
    const playlist = this.props.playlists?.[slug];

    if (!playlist) {
      return <></>;
    }

    const {id, title, tracks} = playlist;
    const cover = tracks?.[0] ? tracks[0].cover : null;

    return (
      <div class="wavePlaylistPage">
        <div
          class="wavePlaylistPage__cover"
          style={{
            'background-image': `linear-gradient(180deg, rgba(1, 208, 234, 0.2) 0%, rgba(0, 0, 0, 0) 48.44%),
    linear-gradient(180deg, rgba(11, 18, 32, 0.7) 0%, rgba(11, 18, 32, 0.9) 72.92%, #0B1220 93.23%),url(${
      cover ? config.files + cover : ''
      })`,
          }}
        />
        <div class="wavePlaylistPage__wrapper">
          <div class="wavePlaylistPage__header">
            <Subhead align="left">
              <p class="wavePlaylistPage__label">
                Playlist
              </p>
            </Subhead>
            <Headline align="left">
              {title}
            </Headline>
            <Button
              class="wavePlaylistPage__play"
              size={this.state.smallScreen ? 'm' : 's'}
              stretched={this.state.smallScreen}
              onClick={this.addPlaylistToPlayer}
            >
              Play
            </Button>
          </div>

          <Subhead align="left" class="wavePlaylistPage__songs-label">
            Songs
          </Subhead>

          <TracksContainer tracks={tracks} onTrackRun={this.tracksClickHandler} playlistOwner={playlist} />
        </div>
      </div>
    );

    return (
      <div class="playlist-page">
        <div
          class="playlist-page__main"
          style={{
            'background-image': `linear-gradient(180deg, rgba(1, 208, 234, 0.2) 0%, rgba(0, 0, 0, 0) 48.44%),
    linear-gradient(180deg, rgba(11, 18, 32, 0.7) 0%, rgba(11, 18, 32, 0.9) 72.92%, #0B1220 93.23%),url(${
      cover ? config.files + cover : ''
      })`,
          }}
        >
          <div class="playlist-page__playlist">
            <div class="text playlist__main">
                            Playlist
              <div class="playlist__name">{title}</div>
              <div class="playlist__controls">
                <div onclick={this.addPlaylistToPlayer(tracks)} class="button controls__btn-play">
                  <div class="text">Play</div>
                </div>
              </div>
            </div>
          </div>
          <div class="playlist-page__popular">
            <div class="text playlist__title">Songs</div>
            {
              playlist &&
              <PagePlaylist runTrack={this.runTrack} playlist={tracks}>
                <div class="playlist-context">
                  <div onclick={this.deleteTrack(id)} class="text context__item">Delete</div>
                </div>
              </PagePlaylist>
            }
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state: any): Map => ({
  userStatus: state.userStatus,
  album: state.album ? state.album : null,
  cover: state.albumCover ? state.albumCover : null,
  playlists: state.userPlaylists,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  getPlaylists: (): void => {
    dispatch(getPlaylists());
  },
  setTracks: (tracks: ITrack[]): void => {
    dispatch(setTracks(tracks));
  },
  setPos: (num: number): void => {
    dispatch(setPosition(num));
  },
  runMusic: (): void => {
    dispatch(startPlay);
  },
  setTrackFromPlaylist: (track: ITrack): void => {
    dispatch(setTrack(track));
  },
  deleteTrack: ({trackid,playlistid}: {trackid:number,playlistid:number}): void => {
    dispatch(deleteTrackPlaylist({trackid,playlistid}))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);