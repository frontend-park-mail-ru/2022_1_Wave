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
import {mainSmallScreen} from "../../mediaQueries";
import {closeSidebar, openSidebar, OpenSidebar} from "../../actions/Sidebar";

class App extends VDom.Component<any> {
  state = {
    gesture: {
      startX: 0,
      startY: 0,
    }
  }

  didMount(): void {
    this.props.userGetSelf();
    mainSmallScreen.addEventListener('change', this.mediaSmallScreenhandler);
  }

  mediaSmallScreenhandler = (e: MediaQueryListEvent): void => {
    this.setState({
      isSmallScreen: e.matches,
    });
  }

  willUmount(): void {
    mainSmallScreen.removeEventListener('change', this.mediaSmallScreenhandler);
  }

  handleGesture = (e:TouchEvent):void => {
    const touchendX = e.changedTouches[0].screenX;
    const touchendY = e.changedTouches[0].screenY;

    const { startX, startY } = this.state.gesture;

    if (Math.abs(startX - touchendX) > Math.abs(startY - touchendY)) {
      if (touchendX <= this.state.gesture.startX) {
        this.props.closeSidebar();
      }
      if (touchendX > this.state.gesture.startX) {
        this.props.openSidebar();
      }
    }

    this.setState({
      gesture: {
        startX: 0,
        startY: 0,
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
                <Route to="/settings">
                  <PersonalPage />
                </Route>
              </RouteSwitch>
            </div>
            <Player />
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
