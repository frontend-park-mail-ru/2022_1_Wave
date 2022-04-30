import VDom from '@rflban/vdom';
import './App.scss';
import PageConnected from '../Page/Page';
import Homepage from '../Homepage/Homepage';
import { connect } from '../../modules/Connect';
import Route from '../../modules/Router/Route';
import RouteSwitch from '../../modules/Router/RouteSwitch';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import ArtistConnected from '../ArtistPage/ArtistPage';
import PersonalConnected from '../PersonalPage/PersonalPage';
import { Map } from '../../modules/Store/types';
import { userGetSelf } from '../../actions/User';

class App extends VDom.Component<any> {
  didMount(): void {
    this.props.userGetSelf();
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
          <PageConnected
            content={
              <RouteSwitch>
                <Route to="" exact>
                  <Homepage />
                </Route>
                <Route to="/artist/:slug">
                  <ArtistConnected />
                </Route>
                <Route to="/settings">
                  <PersonalConnected />
                </Route>
              </RouteSwitch>
            }
          />
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
