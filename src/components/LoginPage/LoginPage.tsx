import VDom from '@rflban/vdom';
import { Map } from '../../modules/Store/types';
import { connect } from '../../modules/Connect';
import { userLogin } from '../../actions/User';
import { validatePassword, validateUsername } from '../../utils/User';
import ValidatableInput from '../common/ValidatableInput/ValidatableInput';
import Link from '../../modules/Router/Link';
import '../../index.css';
import './LoginPage.scss';
import Redirect from '../../modules/Router/Redirect';
import RouteNavigator from '../../modules/Router/RouteNavigator';

class LoginPage extends VDom.Component<any, any, null, RouteNavigator> {
  private readonly usernameInputRef = new VDom.Ref<ValidatableInput>();

  private readonly passwordInputRef = new VDom.Ref<ValidatableInput>();

  constructor(props: any) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: Event): void {
    e.preventDefault();

    const { instance: usernameInput } = this.usernameInputRef;
    const { instance: passwordInput } = this.passwordInputRef;

    const usernameIsValid = usernameInput.validate();
    const passwordIsValid = passwordInput.validate();

    console.log(usernameIsValid, passwordIsValid);

    if (usernameIsValid && passwordIsValid) {
      const username = usernameInput.value;
      const password = passwordInput.value;

      this.props.login({
        username,
        password,
      });
    }
  }

  render(): VDom.VirtualElement {
    if (this.props.isAuth) {
      return <Redirect to="/" />;
    }

    return (
      <div class="login-page">
        <form class="text login-form">
          <Link class="main__button" to="/">
            <div class="logo login-form__logo" />
          </Link>
          <div class="login-form_align">
            <label htmlFor="username" class="input-label login-form__input-label">
              Username:
            </label>
            <ValidatableInput
              ref={this.usernameInputRef}
              type="text"
              placeholder="Username"
              checker={validateUsername}
              errorMessage={'Username have to contain at 3-16 characters (digits, letters or _)'}
            />
          </div>

          <div class="login-form_align">
            <label htmlFor="password" class="input-label login-form__input-label">
              Password:
            </label>
            <ValidatableInput
              ref={this.passwordInputRef}
              type="password"
              placeholder="Password"
              checker={validatePassword}
              errorMessage={'Password have to contain at least 6 characters (digits and letters)'}
            />
          </div>

          <div class="login-form_align">
            <button onClick={this.handleSubmit} class="button button_blue login-form__button">
              Log in
            </button>
            <label
              id="login__submit-label_danger"
              class="input-label login-form__input-label login-from__common-tooltip_danger invisible"
            >
              placeholder
            </label>
          </div>

          <div class="menu-footer login-form_align">
            <div class="menu-footer__line"/>
            <p class="menu-footer__text">Don't have an account?</p>
            <Link to="/signup" as="div" class="button button_gray menu-footer__button">
              <span>Sign up</span>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: any): Map => ({
  isAuth: state.user?.id != null,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  login: ({ username, password }: { username: string; password: string }): void => {
    dispatch(userLogin({ username, password }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
