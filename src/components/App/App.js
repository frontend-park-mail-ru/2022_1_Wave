import Component from '/modules/Component/Component.js';
import UnauthorizedMainPage from '/components/UnauthorizedMainPage/UnauthorizedMainPage.js';
import LoginPage from '/components/LoginPage/LoginPage.js';
import SignupPage from '/components/SignupPage/SignupPage.js';

export default class App extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['App.hbs'];
    document.addEventListener('click', (e) => {
      if (e.target.nodeName === 'A') {
        e.preventDefault();
        window.history.pushState(null, '', e.target.href);
        this.remount();
      }
    });
  }

  render() {
    return this.#template({
      content: window.location.pathname == '/signup' ? new SignupPage({ parent: this }) :
        window.location.pathname == '/login' ? new LoginPage({ parent: this }) : new UnauthorizedMainPage({ parent: this }),
    });
  }
}
