import Component from '/modules/Component/Component.js';
import User from '/actions/User.js';
import { validatePassword, validateUsername, validateEmail } from '/utils/User.js';

export default class SignupPage extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['SignupPage.hbs'];
    this.submit = this.submit.bind(this);
  }

  render() {
    return this.#template();
  }

  submit(e) {
    e.target.username.classList.remove('input__wrong');
    e.target.email.classList.remove('input__wrong');
    e.target.password.classList.remove('input__wrong');
    e.target.confirmPassword.classList.remove('input__wrong');

    const login = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    if (!validateUsername(login.username)) {
      e.target.username.classList.add('input__wrong');
      return;
    }
    if (!validateEmail(login.email)) {
      e.target.email.classList.add('input__wrong');
      return;
    }
    if (!validatePassword(login.password)) {
      e.target.password.classList.add('input__wrong');
      return;
    }
    if (login.password !== login.confirmPassword) {
      e.target.confirmPassword.classList.add('input__wrong');
      return;
    }
    User.login(login);
  }

  didMount(node) {
    node.querySelector('form').addEventListener('submit', this.submit);
  }

  willUnmount(node) {
    node.querySelector('form').removeEventListener('submit', this.submit);
  }
}
