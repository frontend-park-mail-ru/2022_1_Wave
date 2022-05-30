import VDom from '@rflban/vdom';
import {
  Button,
  Headline,
  Menu,
  IMenu,
  MenuItem,
  Subhead,
  ModalMenu,
  MenuVerticalIcon, ModalDisplayer, TrashIcon, EditIcon, ShareIcon
} from '@rflban/waveui';
import '../../index.css';
import './PlaylistPage.scss';
import { connect, StoreContext } from '../../modules/Connect';
import RouterContext from '../../modules/Router/RouterContext';
import RouteNavigator from '../../modules/Router/RouteNavigator';
import { config } from '../../modules/Client/Client';
import { ITrack } from '../../modules/Media/media';
import { setTrack, setTracks } from '../../actions/Playlist';
import {setPosition, startPlay} from '../../actions/Player';
import EditPlaylistForm from '../common/EditPlaylist/EditPlaylist';
import {deleteTrackPlaylist, getPlaylists} from "../../actions/UserPlaylist";
import { Map } from '../../modules/Store/types';
import TracksContainer from '../common/TracksContainer/TracksContainer';
import { mainMobileScreen } from '../../mediaQueries';
import Redirect from '../../modules/Router/Redirect';
import * as UserPlaylists from '../../actions/UserPlaylist';
import * as SidePlaylist from '../../actions/SidePlaylist';
import * as Modals from '../../actions/Modals';
import { LikeEmptyIcon } from '../../../../WaveUI/src';
import {notify, NotifyType} from "../../actions/Notifier";
import * as Sharing from '../../actions/Sharing';

class PlaylistPage extends VDom.Component<any, any, null, RouteNavigator> {
  static contextType = RouterContext;

  private readonly menuRef = new VDom.Ref<IMenu>();

  private toPlay: any = null;

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
    const { slug }: { slug: string } = this.context.params;
    if (!this.props.playlists?.[slug] && (!this.props.sidePlaylist || this.props.sidePlaylist.id !== +slug)) {
      this.props.getPlaylistById(+slug);
    }

    mainMobileScreen.addEventListener('change', this.mediaSmallScreenhandler);
  }

  willUmount(): void {
    mainMobileScreen.removeEventListener('change', this.mediaSmallScreenhandler);
  }

  addPlaylistToPlayer = (_e: Event): void => {
    const playlist = this.toPlay;
    this.props.setTracks(playlist.tracks);
    this.props.setPos(0);
    this.props.runMusic();
  }

  tracksClickHandler = (_e: Event): void => {
    const playlist = this.toPlay;
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

  onActionsClick = (): void => {
    this.menuRef.instance.toggle();
  }

  onShare = (): void => {
    this.props.shrinkToClipboard(`${window.location.origin}${window.location.pathname}`)
  }

  onDelete = (): void => {
    const { slug }: { slug: string } = this.context.params;
    this.props.deletePlaylist(+slug);
    this.context.go('/library');
  }

  onEdit = (): void => {
    const { slug }: { slug: string } = this.context.params;
    this.props.showEditForm(+slug);
  }

  render = (): VDom.VirtualElement => {
    const { slug }: { slug: string } = this.context.params;
    let playlist = this.props.playlists?.[slug];
    let ownPlaylist = true;

    if (!playlist) {
      ownPlaylist = false;
      if (this.props.sidePlaylist && this.props.sidePlaylist.id === +slug) {
        playlist = this.props.sidePlaylist;
      } else {
        return <></>;
      }
    }

    this.toPlay = playlist;
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
            <div class="wavePlaylistPage__mobileActions__container">
              <Subhead align="left">
                <p class="wavePlaylistPage__label">
                  Playlist
                </p>
              </Subhead>
              {ownPlaylist && this.state.smallScreen && (
                <div className="wavePlaylistPage__actions__wrapper">
                  <div
                    class="wavePlaylistPage__mobileActions"
                    onClick={this.onActionsClick}
                  >
                    <MenuVerticalIcon />
                  </div>
                  <ModalMenu ref={this.menuRef}>
                    <MenuItem
                      closeOnClick
                      onClick={this.onEdit}
                      size="l"
                      before={
                        <EditIcon
                          style={{
                            height: '45%',
                            width: '45%',
                          }}
                        />
                      }
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      closeOnClick
                      size="l"
                      onClick={this.onShare}
                      before={
                        <ShareIcon
                          style={{
                            height: '45%',
                            width: '45%',
                          }}
                        />
                      }
                    >
                      Share
                    </MenuItem>
                    <MenuItem
                      closeOnClick
                      onClick={this.onDelete}
                      size="l"
                      before={
                        <TrashIcon
                          style={{
                            height: '45%',
                            width: '45%',
                          }}
                        />
                      }
                    >
                      Delete
                    </MenuItem>
                  </ModalMenu>
                </div>
              )}
            </div>
            <Headline align="left">
              {title}
            </Headline>
            <div class="wavePlaylistPage__controls">
              { tracks?.length > 0 &&
                <Button
                  class="wavePlaylistPage__play"
                  size={this.state.smallScreen ? 'm' : 's'}
                  stretched={this.state.smallScreen}
                  onClick={this.addPlaylistToPlayer}
                >
                  Play
                </Button>
              }
              {ownPlaylist && !this.state.smallScreen && (
                <div class="wavePlaylistPage__actions__wrapper">
                  <Button
                    mode="outline"
                    class="wavePlaylistPage__actions"
                    size={this.state.smallScreen ? 'm' : 's'}
                    onClick={this.onActionsClick}
                  >
                    Actions
                  </Button>
                  <Menu
                    ref={this.menuRef} pos="end" side="right"
                  >
                    <MenuItem
                      closeOnClick
                      onClick={this.onEdit}
                      before={
                        <EditIcon
                          style={{
                            height: '45%',
                            width: '45%',
                          }}
                        />
                      }
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      closeOnClick
                      onClick={this.onShare}
                      before={
                        <ShareIcon
                          style={{
                            height: '45%',
                            width: '45%',
                          }}
                        />
                      }
                    >
                      Share
                    </MenuItem>
                    <MenuItem
                      closeOnClick
                      onClick={this.onDelete}
                      before={
                        <TrashIcon
                          style={{
                            height: '45%',
                            width: '45%',
                          }}
                        />
                      }
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </div>
          </div>

          <Subhead align="left" class="wavePlaylistPage__songs-label">
            Songs
          </Subhead>

          <TracksContainer tracks={tracks} onTrackRun={this.tracksClickHandler} playlistOwner={playlist} />
        </div>
        <StoreContext.Consumer>
          {(store: any): VDom.VirtualElement => (
            <ModalDisplayer
              animated
              direction="row"
              onClose={this.props.closeEditForm}
              open={this.props.editPlaylistId != null}
              wrapper={(modal: VDom.VirtualElement): VDom.VirtualElement => (
                <StoreContext.Provider value={store}>
                  {modal}
                </StoreContext.Provider>
              )}
            >
              <EditPlaylistForm id={id} onCancel={this.props.closeEditForm} />
            </ModalDisplayer>
          )}
        </StoreContext.Consumer>
      </div>
    );
  };
}

const mapStateToProps = (state: any): Map => ({
  userStatus: state.userStatus,
  album: state.album ? state.album : null,
  cover: state.albumCover ? state.albumCover : null,
  playlists: state.userPlaylists,
  editPlaylistId: state.editPlaylistForm,
  sidePlaylist: state.sidePlaylist,
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
  },
  deletePlaylist: (id: number): void => {
    dispatch(UserPlaylists.deletePlaylist(id));
  },
  showEditForm: (id: number): void => {
    dispatch(Modals.showEditPlaylistForm(id));
  },
  closeEditForm: (): void => {
    dispatch(Modals.closeEditPlaylistForm());
  },
  notifyAction: (notification: NotifyType): void => {
    dispatch(notify(notification));
  },
  getPlaylistById: (id: number): void => {
    dispatch(SidePlaylist.getPlaylistById(id));
  },
  shrinkToClipboard: (url: string): void => {
    dispatch(Sharing.shrink(url));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);