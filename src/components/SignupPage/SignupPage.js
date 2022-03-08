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
    e.target.username.classList.remove('input__wrong');
    e.target.email.classList.remove('input__wrong');
    e.target.password.classList.remove('input__wrong');
    e.target.confirmPassword.classList.remove('input__wrong');

    const signup = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    if (!validateUsername(signup.username)) {
      e.target.username.classList.add('input__wrong');
      return;
    }
    if (!validateEmail(signup.email)) {
      e.target.email.classList.add('input__wrong');
      return;
    }
    if (!validatePassword(signup.password)) {
      e.target.password.classList.add('input__wrong');
      return;
    }
    if (signup.password !== signup.confirmPassword) {
      e.target.confirmPassword.classList.add('input__wrong');
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
