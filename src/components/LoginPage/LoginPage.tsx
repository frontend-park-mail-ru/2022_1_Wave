import '../../index.css';
import './LoginPage.scss';
import VDom from '../../modules/VDom';
import { IProps } from '../../modules/VDom/Interfaces';
import { Map } from '../../modules/Store/types';
import { connect } from '../../modules/Connect';
import { userLogin, userSignup } from '../../actions/User';
import { validatePassword, validateUsername, validateEmail } from '../../utils/User';
import { Auth } from '../../reducers/user';

class LoginPage extends VDom.Component {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isSignUp: false,
      username: '',
      password: '',
      confirmPassword: false,
      email: '',
    };
    this.tooglePage = this.tooglePage.bind(this);
    this.tryAcceptEmail = this.tryAcceptEmail.bind(this);
    this.tryAcceptPassword = this.tryAcceptPassword.bind(this);
    this.tryAcceptPasswordRepeat = this.tryAcceptPasswordRepeat.bind(this);
    this.tryAcceptUName = this.tryAcceptUName.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  tooglePage(): void {
    this.setState({ isSignUp: !this.state.isSignUp });
  }

  didMount(): void {
    const { isSignUp } = this.props;
    if (typeof isSignUp === 'boolean') {
      this.setState({ isSignUp });
    }
  }

  login(e: Event): void {
    const form: any = {
      username: this.state.username,
      password: this.state.password,
    };
    if (form.password === '' || form.username === '') {
      return;
    }
    this.props.login(form);
  }

  signUp(e: Event): void {
    const form: any = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };
    if (
      !this.state.confirmPassword ||
      form.email === '' ||
      form.password === '' ||
      form.username === ''
    ) {
      return;
    }
    this.props.signup(form);
  }

  tryAcceptUName(e: Event): void {
    const uname: string = e.target.value;
    if (!validateUsername(uname)) {
      e.target.classList.add('input__wrong');
      document.getElementById('login__username-label_danger').classList.remove('invisible');
      return;
    }
    this.setState({ username: uname });
  }

  tryAcceptEmail(e: Event): void {
    const email: string = e.target.value;
    if (!validateEmail(email)) {
      e.target.classList.add('input__wrong');
      document.getElementById('login__email-label_danger').classList.remove('invisible');
      return;
    }
    this.setState({ email });
  }

  tryAcceptPassword(e: Event): void {
    const password: string = e.target.value;
    if (!validatePassword(password)) {
      e.target.classList.add('input__wrong');
      document.getElementById('login__password-label_danger').classList.remove('invisible');
      return;
    }
    this.setState({ password });
  }

  tryAcceptPasswordRepeat(e: Event): void {
    const password: string = e.target.value;
    if (password !== this.state.password) {
      e.target.classList.add('input__wrong');
      document.getElementById('login__password-repeat-label_danger').classList.remove('invisible');
      this.setState({ confirmPassword: false });
      return;
    }
    this.setState({ confirmPassword: true });
  }

  clearUName(e: Event): void {
    e.target.classList.remove('input__wrong');
    document.getElementById('login__username-label_danger').classList.add('invisible');
  }

  clearEmail(e: Event): void {
    (e.target as HTMLElement).classList.remove('input__wrong');
    document.getElementById('login__email-label_danger')!.classList.add('invisible');
  }

  clearPassword(e: Event): void {
    e.target.classList.remove('input__wrong');
    document.getElementById('login__password-label_danger').classList.add('invisible');
  }

  clearPasswordRepeat(e: Event): void {
    e.target.classList.remove('input__wrong');
    document.getElementById('login__password-repeat-label_danger').classList.add('invisible');
  }

  render(): VDom.VirtualElement {
    console.log(this.props.user);
    const content: HTMLElement = this.state.isSignUp ? (
      <form class="text login-form">
        <a class="main__button" href="/">
          <div class="logo login-form__logo" />
        </a>
        <div class="login-form_align">
          <label htmlFor="username" class="input-label login-form__input-label">
            Username:
          </label>
          <input
            onblur={this.tryAcceptUName}
            value={this.state.username}
            onfocus={this.clearUName}
            type="text"
            placeholder="Username"
            class="input-line login-form__input-line"
            id="username"
          />
          <label
            id="login__username-label_danger"
            class="input-label login-form__input-label login-from__tooltip_danger invisible"
          >
            Username have to contain at least 3 charecters (digits, letters or &#171;_&#187;)
          </label>
        </div>

        <div class="login-form_align">
          <label htmlFor="password" class="input-label login-form__input-label">
            Password:
          </label>
          <input
            type="password"
            value={this.state.password}
            placeholder="Password"
            class="input-line login-form__input-line"
            id="password"
          />
          <label
            id="login__password-label_danger"
            class="input-label login-form__input-label login-from__tooltip_danger invisible"
          >
            Password have to contain at least 6 charecters (digits and letters)
          </label>
        </div>

        <div class="login-form_align">
          <input
            onclick={this.login}
            value="Log in"
            class="button button_blue login-form__button"
          />
          <label
            id="login__submit-label_danger"
            class="input-label login-form__input-label login-from__common-tooltip_danger invisible"
          >
            placeholder
          </label>
        </div>

        <div class="menu-footer login-form_align">
          <div class="menu-footer__line"></div>
          <p class="menu-footer__text">Don't have an account?</p>
          <div onclick={this.tooglePage} class="button button_gray menu-footer__button">
            <span>Sign up</span>
          </div>
        </div>
      </form>
    ) : (
      <form class="text login-form">
        <a class="main__button" href="/">
          <div class="logo login-form__logo"></div>
        </a>
        <div class="login-form_align">
          <label htmlFor="username" class="input-label login-form__input-label">
            Username:
          </label>
          <input
            onblur={this.tryAcceptUName}
            onfocus={this.clearUName}
            value={this.state.username}
            type="text"
            placeholder="Username"
            class="input-line register-form__input-line"
            id="username"
          />
          <label
            id="login__username-label_danger"
            class="input-label login-form__input-label login-from__tooltip_danger invisible"
          >
            Username have to contain at least 3 charecters (digits, letters or &#171;_&#187;)
          </label>
        </div>

        <div class="login-form_align">
          <label htmlFor="email" class="input-label login-form__input-label">
            Email:
          </label>
          <input
            onblur={this.tryAcceptEmail}
            onfocus={this.clearEmail}
            value={this.state.email}
            type="text"
            placeholder="Email"
            class="input-line register-form__input-line"
            id="email"
          />
          <label
            id="login__email-label_danger"
            class="input-label login-form__input-label login-from__tooltip_danger invisible"
          >
            Wrong email format
          </label>
        </div>

        <div class="login-form_align">
          <label htmlFor="password" class="input-label login-form__input-label">
            Password:
          </label>
          <input
            onblur={this.tryAcceptPassword}
            onfocus={this.clearPassword}
            value={this.state.password}
            type="password"
            placeholder="Password"
            class="input-line register-form__input-line"
            id="password"
          />
          <label
            id="login__password-label_danger"
            class="input-label login-form__input-label login-from__tooltip_danger invisible"
          >
            Password have to contain at least 6 charecters (digits and letters)
          </label>
        </div>

        <div class="login-form_align">
          <label htmlFor="confirmPassword" class="input-label login-form__input-label">
            Confirm password:
          </label>
          <input
            type="password"
            onblur={this.tryAcceptPasswordRepeat}
            onfocus={this.clearPasswordRepeat}
            placeholder="Confirm Password"
            class="input-line register-form__input-line"
            id="confirmPassword"
          />
          <label
            id="login__password-repeat-label_danger"
            class="input-label login-form__input-label login-from__tooltip_danger invisible"
          >
            Passwords mismatch
          </label>
        </div>

        <div class="login-form_align">
          <input
            onclick={this.signUp}
            value="Sign up"
            class="button button_blue register-form__button"
          />
          <label
            id="register__submit-label_danger"
            class="input-label login-form__input-label login-from__common-tooltip_danger invisible"
          >
            placeholder
          </label>
        </div>
        <div class=" menu-footer login-form_align">
          <div class="menu-footer__line"></div>
          <p class="menu-footer__text">Already have an account?</p>
          <div onclick={this.tooglePage} class="button button_gray menu-footer__button">
            <span>Log in</span>
          </div>
        </div>
      </form>
    );
    return <div class="login-page">{content}</div>;
  }
}

const mapStateToProps = (state: any): Map => ({
  user: state.Auth ? state.Auth.user : null,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  login: ({ username, email, password }): void => {
    dispatch(userLogin({ username, email, password }));
  },
  signup: ({ username, email, password }): void => {
    dispatch(userSignup({ username, email, password }));
  },
});

const LoginConnected = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default LoginConnected;
