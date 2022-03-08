import Component from '/modules/Component/Component.js';
import User from '/actions/User.js';
import { validateEmail, validatePassword, validateUsername } from '/utils/User.js';
import user from "../../config/User.js";

export default class LoginPage extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['LoginPage.hbs'];
    this.submit = this.submit.bind(this);
  }

  render() {
    return this.#template();
  }

  submit(e) {
    e.preventDefault();

    const usernameTooltip = document.getElementById('login__username-label_danger');
    const passwordTooltip = document.getElementById('login__password-label_danger');

    e.target.password.classList.remove('input__wrong');
    e.target.username.classList.remove('input__wrong');
    usernameTooltip.classList.add('invisible');
    passwordTooltip.classList.add('invisible');

    const login = {
      password: e.target.password.value,
      username: e.target.username.value,
    };

    if (validateEmail(login.username)) {
      login.email = login.username;
      login.username = '';
    }
    if (!validateUsername(login.username)) {
      e.target.username.classList.add('input__wrong');
      usernameTooltip.classList.remove('invisible');
      return;
    }
    if (!validatePassword(login.password)) {
      e.target.password.classList.add('input__wrong');
      passwordTooltip.classList.remove('invisible');
      return;
    }
    User.login(login)
      .then(() => {
        window.history.pushState(null, '', '/');
        this.props.parent.remount();
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  }

  didMount(node) {
    node.querySelector('form')
      .addEventListener('submit', this.submit);
  }

  willUnmount(node) {
    node.querySelector('form')
      .removeEventListener('submit', this.submit);
  }
}
