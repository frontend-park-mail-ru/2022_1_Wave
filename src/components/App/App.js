import Component from '/modules/Component/Component.js';
import UnauthorizedMainPage from '/components/UnauthorizedMainPage/UnauthorizedMainPage.js';
import LoginPage from '/components/LoginPage/LoginPage.js';
import SignupPage from '/components/SignupPage/SignupPage.js';
import User from '/actions/User.js';
import MainPage from '/components/MainPage/MainPage.js';

export default class App extends Component {
  #template;

  #isUserLoaded;

  #user;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['App.hbs'];

    this.#user = null;
    this.#isUserLoaded = false;

    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a');
      if (anchor) {
        e.preventDefault();
        window.history.pushState(null, '', anchor.href);
        this.remount();
      }
    });
  }

  willMount() {
    if (!this.#isUserLoaded) {
      User.getUser()
        .catch(() => null)
        .then((user) => {
          this.#isUserLoaded = true;
          this.#user = user;
          this.remount();
        });
    } else {
      this.#isUserLoaded = false;
    }
  }

  render() {
    let content = null;

    switch (window.location.pathname) {
      case '/signup':
        content = new SignupPage({ parent: this });
        break;
      case '/login':
        content = new LoginPage({ parent: this });
        break;
      default:
        window.history.replaceState(null, '', '/');
        content = new UnauthorizedMainPage({ parent: this });
        break;
    }

    if (this.#user) {
      window.history.replaceState(null, '', '/');
      content = new MainPage({ parent: this });
    }

    return this.#template({ content });
  }
}
