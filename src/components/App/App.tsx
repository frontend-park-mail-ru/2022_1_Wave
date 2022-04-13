// import Component from '/modules/Component/Component.js';
// import UnauthorizedMainPage from '/components/UnauthorizedMainPage/UnauthorizedMainPage.js';
// import LoginPage from '/components/LoginPage/LoginPage.js';
// import SignupPage from '/components/SignupPage/SignupPage.js';
// import User from '/actions/User.ts';
// import MainPage from '/components/MainPage/MainPage.js';
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
import PersonalPage from '../PersonalPage/PersonalPage';
import ArtistConnected from '../ArtistPage/ArtistPage';
import PersonalConnected from "../PersonalPage/PersonalPage";

//
// const onclickTest = (e) => {
//   store.dispatch({ type: 'Inc' });
// };
//
// const onclickHi = (e) => {
//   store.dispatch({ type: 'De' });
// };
//
// const router = (): JSX.Element => {
//   let r: JSX.Element;
//   switch (window.location.pathname) {
//   case '/signup':
//     r = (<div>
//       <div className="app" onClick={onclickHi}>
//           Hi there
//         <Example/>
//       </div>
//       <div className="test" onClick={onclickTest}>
//           test
//       </div>
//     </div>
//     );
//     break;
//   default:
//     r = (<div>'foo'</div>);
//     break;
//   }
//   return r;
// };
//
// const tracks = [{
//   album: '',
//   author: 'SomeAuthor',
//   cover: '/assets/playlist-track-icon-dummy.png',
//   src: '/assets/music.mp3',
//   title: 'SomeTitle',
//
// }, {
//   album: '',
//   author: 'SomeAuthorVEEEEEEEEEEEEEERYLONg',
//   cover: '/assets/playlist-track-icon-dummy.png',
//   src: '/assets/music.mp3',
//   title: 'SomeTitleVEEEEEEEEEEEEEERYLONg',
//
// }];
//
// const player = new PlayerClass(tracks);
//
// // render(<Player player={player} />, document.getElementById('root')!);
// render(<Page isAuthorized={true} content={<Homepage isAuthorized={true}/>}/>, document.getElementById('root')!);
// // render(<LoginPage/>, document.getElementById('root')!);
// // render(<Page isAuthorized={false} content={<ArtistPage />}/>, document.getElementById('root')!);
// // render(<Page isAuthorized={true} content={<Homepage isAuthorized={true}/>}/>, document.getElementById('root')!);
// // render(<Page isAuthorized={false} content={<PersonalPage />}/>, document.getElementById('root')!);

const store = createStore();

export default class App extends VDom.Component {

  render(): VDom.VirtualElement {
    return (
      <Router>
        <StoreContext.Provider value={store}>
          <RouteSwitch>
            <Route exact to="/login">
              <LoginPage isSignup={false}/>
            </Route>
            <Route exact to="/signup">
              <LoginPage isSignup={true}/>
            </Route>
            <Route to="/">
              <PageConnected isAuthorized={true} content={
                <RouteSwitch>
                  <Route to="" exact>
                    <Homepage isAuthorized={true}/>
                  </Route>
                  <Route to="/artist/:slug">
                    <ArtistConnected isAuthorized={true} />
                  </Route>
                  <Route to="/settings">
                    <PersonalConnected/>
                  </Route>
                </RouteSwitch>
              }/>
            </Route>
          </RouteSwitch>

        </StoreContext.Provider>
      </Router>
    );
  }
}

//
// export default class App extends Component {
//   #template;
//
//   #isUserLoaded;
//
//   #user;
//
//   constructor(props) {
//     super(props);
//     this.#template = Handlebars.templates['App.hbs'];
//
//     this.#user = null;
//     this.#isUserLoaded = false;
//
//     window.addEventListener('popstate', () => this.remount());
//
//     document.addEventListener('click', (e) => {
//       const anchor = e.target.closest('a');
//       if (anchor) {
//         e.preventDefault();
//         window.history.pushState(null, '', anchor.href);
//         this.remount();
//       }
//     });
//   }
//
//   willMount() {
//     if (!this.#isUserLoaded) {
//       User.getUser()
//         .catch(() => null)
//         .then((user) => {
//           this.#isUserLoaded = true;
//           this.#user = user;
//           this.remount();
//         });
//     } else {
//       this.#isUserLoaded = false;
//     }
//   }
//
//   render() {
//     let content = null;
//
//     switch (window.location.pathname) {
//       case '/signup':
//         content = new SignupPage({ parent: this });
//         break;
//       case '/login':
//         content = new LoginPage({ parent: this });
//         break;
//       default:
//         window.history.replaceState(null, '', '/');
//         content = new UnauthorizedMainPage({ parent: this });
//         break;
//     }
//
//     if (this.#user) {
//       window.history.replaceState(null, '', '/');
//       content = new MainPage({ parent: this });
//     }
//
//     return this.#template({ content });
//   }
// }
