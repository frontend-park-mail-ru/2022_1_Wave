import './App.scss';
import Homepage from '../Homepage/Homepage';
import VDom from '../../modules/VDom';
import { connect } from '../../modules/Connect';
import Route from '../../modules/Router/Route';
import RouteSwitch from '../../modules/Router/RouteSwitch';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import PersonalConnected from '../PersonalPage/PersonalPage';
import { Map } from '../../modules/Store/types';
import { userGetSelf, userLogin } from '../../actions/User';
import PlayerConnected from "../common/Player/Player";
import Navbar from "../common/Navbar/Navbar";
import Sidebar from "../common/Sidebar/Sidebar";
import ArtistPage from "../ArtistPage/ArtistPage";
import PersonalPage from "../PersonalPage/PersonalPage";
import Player from "../common/Player/Player";

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
            <Sidebar/>
            <div class="content">
              <Navbar/>
              <RouteSwitch>
                <Route to="" exact>
                  <Homepage />
                </Route>
                <Route to="/artist/:slug">
                  <ArtistPage/>
                </Route>
                <Route to="/settings">
                  <PersonalPage />
                </Route>
              </RouteSwitch>
            </div>
            <Player/>
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
