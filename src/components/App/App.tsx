// import Component from '/modules/Component/Component.js';
// import UnauthorizedMainPage from '/components/UnauthorizedMainPage/UnauthorizedMainPage.js';
// import LoginPage from '/components/LoginPage/LoginPage.js';
// import SignupPage from '/components/SignupPage/SignupPage.js';
// import User from '/actions/User.js';
// import MainPage from '/components/MainPage/MainPage.js';
import {createElement} from 'factory';
import Example from "../AlbumCard/example";
import './App.sass';
import {store} from "../../modules/Reducers";


const onclickTest = (e) => {
  store.dispatch({type: 'Inc'})
}

const onclickHi = (e) => {
  store.dispatch({type: 'De'})
}

const state = store.getState()
const router = (): HTMLElement => {
  let r: HTMLElement;
  switch (window.location.pathname) {
  case '/signup':
    r = (<div>
      <div class="app" onclick={onclickHi}>
          Hi there
        <Example/>
      </div>
      <div class="test" onclick={onclickTest}>
          test
      </div>
    </div>
    )
    ;
    break;
  default:
    r = (<div>'foo'</div>);
    break;
  }
  return r;
}
const App = (): HTMLElement => {
  //let {state} = appStore.getState();
  //state.subscribe(s => state = s);
  return router();
}

export default App;
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
