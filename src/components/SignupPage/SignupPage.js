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
    e.preventDefault();

    const usernameTooltip = document.getElementById('login__username-label_danger');
    const emailTooltip = document.getElementById('login__email-label_danger');
    const passwordTooltip = document.getElementById('login__password-label_danger');
    const passwordRepeatTooltip = document.getElementById('login__password-repeat-label_danger');

    e.target.username.classList.remove('input__wrong');
    e.target.email.classList.remove('input__wrong');
    e.target.password.classList.remove('input__wrong');
    e.target.confirmPassword.classList.remove('input__wrong');
    usernameTooltip.classList.add('invisible');
    emailTooltip.classList.add('invisible');
    passwordTooltip.classList.add('invisible');
    passwordRepeatTooltip.classList.add('invisible');

    const signup = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    if (!validateUsername(signup.username)) {
      e.target.username.classList.add('input__wrong');
      usernameTooltip.classList.remove('invisible');
      return;
    }
    if (!validateEmail(signup.email)) {
      e.target.email.classList.add('input__wrong');
      emailTooltip.classList.remove('invisible');
      return;
    }
    if (!validatePassword(signup.password)) {
      e.target.password.classList.add('input__wrong');
      passwordTooltip.classList.remove('invisible');
      return;
    }
    if (signup.password !== signup.confirmPassword) {
      e.target.confirmPassword.classList.add('input__wrong');
      passwordRepeatTooltip.classList.remove('invisible');
      return;
    }

    User.signup(signup)
      .then(() => {
        window.history.pushState(null, '', '/');
        this.props.parent.remount();
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  }

  didMount(node) {
    node.querySelector('form').addEventListener('submit', this.submit);
  }

  willUnmount(node) {
    node.querySelector('form').removeEventListener('submit', this.submit);
  }
}
