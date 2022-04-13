import './App.scss';
import PageConnected from '../Page/Page';
import Homepage from '../Homepage/Homepage';
import VDom from '../../modules/VDom';
import { createStore } from '../../modules/Store/store';
import { StoreContext } from '../../modules/Connect';
import Route from '../../modules/Router/Route';
import RouteSwitch from '../../modules/Router/RouteSwitch';
import Router from '../../modules/Router/Router';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import ArtistConnected from '../ArtistPage/ArtistPage';
import PersonalConnected from '../PersonalPage/PersonalPage';

const store = createStore();

export default class App extends VDom.Component {
  render(): VDom.VirtualElement {
    return (
      <Router>
        <StoreContext.Provider value={store}>
          <RouteSwitch>
            <Route exact to="/login">
              <LoginPage isSignup={false} />
            </Route>
            <Route exact to="/signup">
              <SignupPage isSignup={true} />
            </Route>
            <Route to="/">
              <PageConnected
                isAuthorized={true}
                content={
                  <RouteSwitch>
                    <Route to="" exact>
                      <Homepage isAuthorized={true} />
                    </Route>
                    <Route to="/artist/:slug">
                      <ArtistConnected isAuthorized={true} />
                    </Route>
                    <Route to="/settings">
                      <PersonalConnected />
                    </Route>
                  </RouteSwitch>
                }
              />
            </Route>
          </RouteSwitch>
        </StoreContext.Provider>
      </Router>
    );
  }
}
