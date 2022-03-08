import Component from '/modules/Component/Component.js';
import MainPage from '/components/MainPage/MainPage.js';
import LoginPage from '/components/LoginPage/LoginPage.js';
import SignupPage from '/components/SignupPage/SignupPage.js';
import User from '/actions/User.js';

export default class App extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['App.hbs'];

    User.getCSRFToken()
      .then(() => console.log('csrf:', localStorage.getItem('csrf')))
      .catch((error) => console.log(error))
      .then(() => {
        User.login({
          username: 'aboba',
          email: 'aboba@mail.ru',
          password: 'aboba',
        });
      })
      .then(() => User.getUser())
      .then((resp) => alert(resp));
  }

  render() {
    return this.#template({
      content: new SignupPage(),
    });
  }
}
