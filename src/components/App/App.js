import Component from '/modules/Component/Component.js';
import UnauthorizedMainPage from '/components/UnauthorizedMainPage/UnauthorizedMainPage.js';
import LoginPage from '/components/LoginPage/LoginPage.js';
import SignupPage from '/components/SignupPage/SignupPage.js';
import User from '/actions/User.js';

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
      if (e.target.tagName === 'A') {
        e.preventDefault();
        window.history.pushState(null, '', e.target.href);
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
    console.log(this.#user);

    return this.#template({
      content: window.location.pathname == '/signup' ? new SignupPage({ parent: this }) :
        window.location.pathname == '/login' ? new LoginPage({ parent: this }) : new UnauthorizedMainPage({ parent: this }),
    });
  }
}
