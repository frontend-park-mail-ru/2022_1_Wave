import VDom from '@rflban/vdom';
import './App.scss';
import Homepage from '../Homepage/Homepage';
import { connect } from '../../modules/Connect';
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

class App extends VDom.Component<any> {
  state = {
    gesture: {
      startX: 0,
      startY: 0,
      startTime:0,
    },
    isMobilePlayerFull: false,
  }

  didMount(): void {
    this.props.getFavorites();
    this.props.userGetSelf();
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
    const touchendX = e.changedTouches[0].screenX;
    const touchendY = e.changedTouches[0].screenY;

    const { startX, startY } = this.state.gesture;

    if (Math.abs(startX - touchendX) >= Math.abs(startY - touchendY)) {
      const gestureTime: number = performance.now() - this.state.gesture.startTime;
      if (gestureTime < 200) {
        if (touchendX <= this.state.gesture.startX) {
          this.props.closeSidebar();
        }
        if (touchendX > this.state.gesture.startX) {
          this.props.openSidebar();
        }
      }
    }else if (Math.abs(startY - touchendY) > 0 && mainMobileScreen.matches) {
      const gestureTime: number = performance.now() - this.state.gesture.startTime;
      if (gestureTime < 200) {
        if (startY - touchendY > 0) this.setState({isMobilePlayerFull: true});
        if (startY - touchendY < 0) this.setState({isMobilePlayerFull: false});
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
    const touchstartX = e.changedTouches[0].screenX;
    const touchstartY = e.changedTouches[0].screenY;

    this.setState({
      gesture: {
        result: null,
        startX: touchstartX,
        startY: touchstartY,
        startTime: performance.now(),
      },
    });
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
            <Player isMobileFull = {this.state.isMobilePlayerFull && mainMobileScreen.matches}/>
          </div>
        </Route>
      </RouteSwitch>
    );
  }
}

const mapStateToProps = (state: any): Map => ({
  isAuth: state.user?.id != null,
  notifications: state.notifications,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  getFavorites: (): void => {
    dispatch(getFavorites());
  },
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
