import Component from '/modules/Component/Component.js';
import MainPage from '/components/MainPage/MainPage.js';
import LoginPage from '/components/LoginPage/LoginPage.js';
import SignupPage from '/components/SignupPage/SignupPage.js';

export default class App extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['App.hbs'];
  }

  render() {
    return this.#template({
      content: new MainPage(),
    });
  }
}
