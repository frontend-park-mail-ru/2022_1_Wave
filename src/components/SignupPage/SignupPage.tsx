import VDom from '../../modules/VDom';
import { Map } from '../../modules/Store/types';
import { connect } from '../../modules/Connect';
import { userSignup } from '../../actions/User';
import { validatePassword, validateUsername, validateEmail } from '../../utils/User';
import ValidatableInput from '../common/ValidatableInput/ValidatableInput';
import { IComponentProps } from '../../modules/VDom/IComponentProps';
import Link from '../../modules/Router/Link';
import '../../index.css';
import './SignupPage.scss';
import Redirect from '../../modules/Router/Redirect';

class SignupPage extends VDom.Component<any, any, null, RouteNavigator> {
  private readonly usernameInputRef = new VDom.Ref<ValidatableInput>();

  private readonly emailInputRef = new VDom.Ref<ValidatableInput>();

  private readonly passwordInputRef = new VDom.Ref<ValidatableInput>();

  private readonly repeatPasswordInputRef = new VDom.Ref<ValidatableInput>();

  constructor(props: IComponentProps) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.isEqualToPassword = this.isEqualToPassword.bind(this);
    this.additionalPasswordValidator = this.additionalPasswordValidator.bind(this);
  }

  isEqualToPassword(repeatPassword: string): boolean {
    return  repeatPassword === this.passwordInputRef.instance.value;
  }

  additionalPasswordValidator(_e: InputEvent): void {
    this.repeatPasswordInputRef.instance.validateDebounced();
  }

  handleSubmit(e: Event): void {
    e.preventDefault();

    const { instance: usernameInput } = this.usernameInputRef;
    const { instance: emailInput } = this.emailInputRef;
    const { instance: passwordInput } = this.passwordInputRef;
    const { instance: repeatPasswordInput } = this.repeatPasswordInputRef;

    const usernameIsValid = usernameInput.validate();
    const emailIsValid = emailInput.validate();
    const passwordIsValid = passwordInput.validate();
    const repeatPasswordIsValid = repeatPasswordInput.validate();

    if (usernameIsValid && emailIsValid && passwordIsValid && repeatPasswordIsValid) {
      const username = usernameInput.value;
      const email = emailInput.value;
      const password = passwordInput.value;

      this.props.signup({
        username,
        email,
        password,
      });
    }
  }

  render(): VDom.VirtualElement {
    if (this.props.isAuth) {
      return <Redirect to='/' />
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
              class="register-form__input-line"
              placeholder="Username"
              checker={validateUsername}
              errorMessage={'Username have to contain at 3-16 characters (digits, letters or _)'}
            />
          </div>

          <div class="login-form_align">
            <label htmlFor="username" class="input-label login-form__input-label">
              Email:
            </label>
            <ValidatableInput
              ref={this.emailInputRef}
              class="register-form__input-line"
              type="email"
              placeholder="Email"
              checker={validateEmail}
              errorMessage={'Wrong email format'}
            />
          </div>

          <div class="login-form_align">
            <label htmlFor="password" class="input-label register-form__input-label">
              Password:
            </label>
            <ValidatableInput
              ref={this.passwordInputRef}
              type="password"
              class="login-form__input-line"
              placeholder="Password"
              checker={validatePassword}
              errorMessage={'Password have to contain at least 6 characters (digits and letters)'}
              onInput={this.additionalPasswordValidator}
            />
          </div>

          <div class="login-form_align">
            <label htmlFor="password" class="input-label login-form__input-label">
              Confirm password:
            </label>
            <ValidatableInput
              ref={this.repeatPasswordInputRef}
              type="password"
              class="register-form__input-line"
              placeholder="Confirm password"
              checker={this.isEqualToPassword}
              errorMessage={'Passwords don\'t match'}
            />
          </div>

          <div class="login-form_align">
            <button onClick={this.handleSubmit} class="button button_blue login-form__button">
              Sign up
            </button>
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
            <Link to="/login" as="div" class="button button_gray menu-footer__button">
              <span>Log in</span>
            </Link>
          </div>
        </form>
      </div>
    );
  }
};


const mapStateToProps = (state: any): Map => ({
  isAuth: state.user?.id != null,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  signup: ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }): void => {
    dispatch(userSignup({ username, email, password }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
