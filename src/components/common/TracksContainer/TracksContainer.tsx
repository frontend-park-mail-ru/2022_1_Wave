import './TracksContainer.scss';
import VDom from '@rflban/vdom';
import {
  MenuItem,
  Track,
  TrashIcon,
} from '@rflban/waveui';
import { config } from '../../../modules/Client/Client';
import Link from '../../../modules/Router/Link2';
import RouterContext from '../../../modules/Router/RouterContext';
import {
  addToFavorites as addToFav,
  removeFromFavorites as remFromFav,
} from '../../../actions/Favorites';
import {
  setPosition,
  stopPlay,
  startPlay,
} from '../../../actions/Player';
import {
  addTrackPlaylist,
  deleteTrackPlaylist,
} from '../../../actions/UserPlaylist';
import {
  mainMobileScreen,
} from '../../../mediaQueries';
import { Map } from '../../../modules/Store/types';
import { connect } from '../../../modules/Connect';
import RouteNavigator from '../../../modules/Router/RouteNavigator';
import {
  showAuthRequired as showAuthReq,
  showCreatePlaylistForm as showCreatePlaylistFormAction,
} from '../../../actions/Modals';

interface TracksContainerProps {
  tracks: any[];
  playlists: any[];
  favorites: any[];
  hideArtist?: boolean;
  playlistOwner?: any;
  currentTrackID: number;
  isPlayerRunning: boolean;
  playerPlay: () => void;
  playerPause: () => void;
  setTrackByIdx: (_idx: number) => void;
  addToFavorites: (_trackID: number) => void;
  addTrackToPlaylist: (_trackID: number, _playlistID: number) => void;
  removeTrackFromPlaylist: (_trackID: number, _playlistID: number) => void;
  removeFromFavorites: (_trackID: number) => void;
  showAuthRequired: () => void;
  showCreatePlaylistForm: () => void;
  isAuth: boolean;
  onTrackRun?: () => void;
}

interface TracksContainerState {
  smallScreen: boolean;
}

class TracksContainer extends VDom.Component<TracksContainerProps, TracksContainerState, null, RouteNavigator> {
  static contextType = RouterContext;

  state = {
    smallScreen: mainMobileScreen.matches,
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

  resolveTrackVisual(track: any): 'default' | 'playing' | 'paused' {
    const {
      isPlayerRunning,
      currentTrackID,
    } = this.props;

    if (track.id === currentTrackID) {
      return isPlayerRunning ? 'playing' : 'paused';
    }

    return 'default';
  }

  getSkeleton(): VDom.VirtualElement {
    return (<>
    </>);
  }

  getTracks(): VDom.VirtualElement {
    const {
      tracks,
      playlists,
      favorites,
      playlistOwner,
      setTrackByIdx,
      playerPlay,
      playerPause,
      addToFavorites,
      addTrackToPlaylist,
      removeTrackFromPlaylist,
      removeFromFavorites,
      showAuthRequired,
      showCreatePlaylistForm,
      isAuth,
      hideArtist,
    } = this.props;

    const {
      smallScreen,
    } = this.state;

    if (!(tracks?.length > 0)) {
      return this.getSkeleton();
    }

    const liked = new Set<number>((favorites ?? []).map((track) => track.id));

    return (<>
      {tracks.map((track: any, idx: number) => (
        <Track
          num={idx + 1}
          playlists={Object.entries(playlists ?? {}).map(([_, { id, title }]: [_: string, __: {id: number, title: string}]) => ({
            title,
            handler: (_e: MouseEvent): void => {
              if (isAuth) {
                addTrackToPlaylist(track.id, id);
              } else {
                showAuthRequired();
              }
            }
          }))}
          visual={this.resolveTrackVisual(track)}
          compact={smallScreen}
          hideControls={!smallScreen}
          useModalMenu={smallScreen}
          liked={liked.has(track.id)}
          cover={config.files + track.cover}
          title={track.title}
          {...(hideArtist ? {} : {artist: (
            <Link to={`/artist/${track.artistId}`}>
              {track.artist}
            </Link>
          )})}
          listened={track.listenings}
          duration={track.duration}
          artistWrapper={(artist): VDom.VirtualElement => (
            <Link to={`/artist/${track.artistId}`}>
              {artist}
            </Link>
          )}
          albumWrapper={(album): VDom.VirtualElement => (
            <Link to={`/album/${track.albumId}`}>
              {album}
            </Link>
          )}
          modalWrapper={(modal): VDom.VirtualElement => (
            <RouterContext.Provider value={this.context}>
              {modal}
            </RouterContext.Provider>
          )}
          onCreatePlaylist={(): void => {
            if (isAuth) {
              showCreatePlaylistForm();
            } else {
              showAuthRequired();
            }
          }}
          onLike={(): void => {
            if (isAuth) {
              addToFavorites(track.id);
            } else {
              showAuthRequired();
            }
          }}
          onUnlike={(): void => {
            if (isAuth) {
              removeFromFavorites(track.id);
            } else {
              showAuthRequired();
            }
          }}
          onPlay={(): void => {
            this.props.onTrackRun?.();
            setTrackByIdx(idx);
            playerPlay();
          }}
          onResume={(): void => {
            playerPlay();
          }}
          onPause={(): void => {
            playerPause();
          }}
          {...(!playlistOwner ? {} : {menuExtension: [{
            before: <TrashIcon style={{ height: '40%' }} />,
            action: (): void => {
              removeTrackFromPlaylist(track.id, playlistOwner.id);
            },
            name: 'Remove',
          }]})}
        />
      ))}
    </>);
  }

  render(): VDom.VirtualElement {
    return (
      <div class="waveTracksContainer">
        {this.getTracks()}
      </div>
    );
  };
}

const mapDispatchToProps = (dispatch: any): Map => ({
  setTrackByIdx: (idx: number): void => {
    dispatch(setPosition(idx));
  },
  addToFavorites: (trackID: number): void => {
    dispatch(addToFav(trackID));
  },
  removeFromFavorites: (trackID: number): void => {
    dispatch(remFromFav(trackID));
  },
  playerPlay: (): void => {
    startPlay(dispatch);
  },
  playerPause: (): void => {
    stopPlay(dispatch);
  },
  addTrackToPlaylist: (trackID: number, playlistID: number): void => {
    dispatch(addTrackPlaylist({
      trackID,
      playlistID,
    }));
  },
  removeTrackFromPlaylist: (trackID: number, playlistID: number): void => {
    dispatch(deleteTrackPlaylist({
      trackid: trackID,
      playlistid: playlistID,
    }));
  },
  showAuthRequired: (): void => {
    dispatch(showAuthReq());
  },
  showCreatePlaylistForm: (): void => {
    dispatch(showCreatePlaylistFormAction());
  },
});

const mapStateToProps = (state: any): Map => ({
  isAuth: state.userStatus === 'authorized',
  favorites: state.favorites,
  playlists: state.userPlaylists ?? null,
  isPlayerRunning: state.playerPlay?.value ?? false,
  currentTrackID: (state.playerPosition && state.playerPlaylist) ? state.playerPlaylist[state.playerPosition.value]?.id : null,
});

export default connect(mapStateToProps, mapDispatchToProps)(TracksContainer);
