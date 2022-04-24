import './App.scss';
import Homepage from '../Homepage/Homepage';
import VDom from '../../modules/VDom';
import { connect } from '../../modules/Connect';
import Route from '../../modules/Router/Route';
import RouteSwitch from '../../modules/Router/RouteSwitch';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import ArtistConnected from '../ArtistPage/ArtistPage';
import PersonalConnected from '../PersonalPage/PersonalPage';
import { Map } from '../../modules/Store/types';
import { userGetSelf, userLogin } from '../../actions/User';
import SidebarConnected from "../common/Sidebar/Sidebar";
import PlayerConnected from "../common/Player/Player";
import Navbar from "../common/Navbar/Navbar";

class App extends VDom.Component {
  didMount(): void {
    this.props.userGetSelf();
  }

  render(): VDom.VirtualElement {
    return (
      <RouteSwitch>
        <Route exact to="/login">
          <LoginPage isSignup={false} />
        </Route>
        <Route exact to="/signup">
          <SignupPage isSignup={true} />
        </Route>
        <Route to="/">
          <div class="page">
            <SidebarConnected/>
            <div class="content">
              <Navbar/>
              <RouteSwitch>
                <Route to="" exact>
                  <Homepage />
                </Route>
                <Route to="/artist/:slug">
                  <ArtistConnected/>
                </Route>
                <Route to="/settings">
                  <PersonalConnected />
                </Route>
              </RouteSwitch>
            </div>
            <PlayerConnected/>
          </div>
        </Route>
      </RouteSwitch>
    );
  }
}

const mapStateToProps = (state: any): Map => ({
  isAuth: state.user?.id != null,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  userGetSelf: (): void => {
    dispatch(userGetSelf());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
