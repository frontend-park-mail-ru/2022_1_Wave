import VDom from '@rflban/vdom';
import { ModalDisplayerStateless } from '@rflban/waveui';
import './App.scss';
import Homepage from '../Homepage/Homepage';
import { connect, StoreContext } from '../../modules/Connect';
import Route from '../../modules/Router/Route';
import RouteSwitch from '../../modules/Router/RouteSwitch';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import { Map } from '../../modules/Store/types';
import { userGetSelf } from '../../actions/User';
import Sidebar from '../common/Sidebar/Sidebar';
import ArtistPage from '../ArtistPage/ArtistPage';
import PersonalPage from '../PersonalPage/PersonalPage';
import Player from '../common/Player/Player';
import { NotifyType, notify } from '../../actions/Notifier';
import AlbumPage from '../AlbumPage/AlbumPage';
import Navbar from '../common/Navbar/Navbar';
import {mainMobileScreen, mainSmallScreen} from "../../mediaQueries";
import {closeSidebar, openSidebar} from "../../actions/Sidebar";
import Library from '../Library/Library';
import PlaylistPage from "../PlaylistPage/PlaylistPage";
import FavoritesPage from "../FavoritesPage/FavoritesPage";
import { getFavorites } from '../../actions/Favorites';
import * as UserPlaylist from '../../actions/UserPlaylist';
import AuthRequiredModal from '../common/AuthRequiredModal/AuthRequiredModal';
import {
  closeAuthRequired as closeAuthRequiredAction,
  closeCreatePlaylistForm as closeCreatePlaylistFormAction,
  showAuthRequired,
} from '../../actions/Modals';
import CreatePlaylist from '../common/CreatePlaylist/CreatePlaylist';

class App extends VDom.Component<any> {
  static contextType = StoreContext;

  state = {
    gesture: {
      startX: 0,
      startY: 0,
      startTime:0,
    },
    isMobilePlayerFull: false,
  }

  consts = {
    startXOpen:  70,
    startXClose: 330,
    startYOpen:  window.innerHeight - 85,
    startYClose: 15,
  }

  private readonly authRequiredRef = new VDom.Ref();

  didMount(): void {
    this.props.userGetSelf();
    this.props.getFavorites();
    this.props.getPlaylists();
    mainSmallScreen.addEventListener('change', this.mediaSmallScreenhandler);
    mainMobileScreen.addEventListener('change', this.mediaMobileScreenhandler);
  }

  mediaSmallScreenhandler = (e: MediaQueryListEvent): void => {
    this.setState({
      isSmallScreen: e.matches,
    });
  }

  mediaMobileScreenhandler = (e: MediaQueryListEvent): void => {
    this.setState({
      isMobileScreen: e.matches,
    });
  }

  willUmount(): void {
    mainSmallScreen.removeEventListener('change', this.mediaSmallScreenhandler);
    mainMobileScreen.removeEventListener('change', this.mediaMobileScreenhandler);
  }

  handleGesture = (e:TouchEvent):void => {
    const touchendX = e.changedTouches[0].clientX;
    const touchendY = e.changedTouches[0].clientY;
    const fastSwipeTrigger = 150;
    const { startX, startY } = this.state.gesture;
    const gestureTime: number = performance.now() - this.state.gesture.startTime;


    if (Math.abs(startX - touchendX) >= Math.abs(startY - touchendY)) {
      if (gestureTime < fastSwipeTrigger) {
        if (touchendX <= this.state.gesture.startX &&
          startX < this.consts.startXClose ) {
          this.props.closeSidebar();
        }
        if (touchendX > this.state.gesture.startX &&
            startX < this.consts.startXOpen ) {
          this.props.openSidebar();
        }
      }
    }

    else if (Math.abs(startY - touchendY) > 0 && mainMobileScreen.matches) {
      if (gestureTime < fastSwipeTrigger) {
        if (startY - touchendY > 0 &&
            startY > this.consts.startYOpen ) this.setState({isMobilePlayerFull: true});
        if (startY - touchendY < 0 &&
            startY > this.consts.startYClose) this.setState({isMobilePlayerFull: false});
      }
    }

    this.setState({
      gesture: {
        startX: 0,
        startY: 0,
        startTime:0,
      },
    });
  }

  catchStart = (e:TouchEvent):void => {
    const touchstartX = e.changedTouches[0].clientX;
    const touchstartY = e.changedTouches[0].clientY;
    this.setState({
      gesture: {
        result: null,
        startX: touchstartX,
        startY: touchstartY,
        startTime: performance.now(),
      },
    });
  }

  togglePlayerFull = (e: Event):void => {
    e.stopPropagation();
    this.setState({isMobilePlayerFull: !this.state.isMobilePlayerFull});
  }

  render(): VDom.VirtualElement {
    return (
      <RouteSwitch>
        <Route exact to="/login">
          <LoginPage />
        </Route>
        <Route exact to="/signup">
          <SignupPage />
        </Route>
        <Route to="/">
          <AuthRequiredModal
            open={this.props.authRequired}
            onClose={this.props.closeAuthRequired}
          />
          <ModalDisplayerStateless
            animated
            direction="row"
            onClose={this.props.closeCreatePlaylistForm}
            open={this.props.createPlaylistForm}
            wrapper={(modal: VDom.VirtualElement): VDom.VirtualElement => (
              <StoreContext.Provider value={this.context}>
                {modal}
              </StoreContext.Provider>
            )}
          >
            <CreatePlaylist onCancel={this.props.closeCreatePlaylistForm} />
          </ModalDisplayerStateless>
          <div ontouchstart={this.catchStart} ontouchend={this.handleGesture} class="page">
            <Sidebar/>
            <div class="content">
              <Navbar/>
              <RouteSwitch>
                <Route to="" exact>
                  <Homepage/>
                </Route>
                <Route to="/artist/:slug">
                  <ArtistPage />
                </Route>
                <Route to="/album/:slug">
                  <AlbumPage />
                </Route>
                <Route to="/playlists/:slug">
                  <PlaylistPage />
                </Route>
                <Route to="/favorites">
                  <FavoritesPage />
                </Route>
                <Route to="/settings">
                  <PersonalPage />
                </Route>
                <Route to="/library">
                  <Library />
                </Route>
              </RouteSwitch>
            </div>
            <Player toggleMobileFull = {this.togglePlayerFull} isMobileFull = {this.state.isMobilePlayerFull && mainMobileScreen.matches}/>
          </div>
        </Route>
      </RouteSwitch>
    );
  }
}

const mapStateToProps = (state: any): Map => ({
  isAuth: state.user?.id != null,
  notifications: state.notifications,
  authRequired: state.authRequired,
  createPlaylistForm: state.createPlaylistForm,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  getFavorites: (): void => {
    dispatch(getFavorites());
  },
  getPlaylists: () => UserPlaylist.getPlaylists()(dispatch),
  userGetSelf: (): void => {
    dispatch(userGetSelf());
  },
  notifyErr: (notification: NotifyType): void => {
    dispatch(notify(notification));
  },
  openSidebar: ():void =>{
    dispatch(openSidebar);
  },
  closeSidebar: ():void =>{
    dispatch(closeSidebar)
  },
  showAuthRequired: (): void => {
    dispatch(showAuthRequired());
  },
  closeAuthRequired: (): void => {
    dispatch(closeAuthRequiredAction());
  },
  closeCreatePlaylistForm: (): void => {
    dispatch(closeCreatePlaylistFormAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
