import VDom from '@rflban/vdom';
import { Button, Caption, Divider, FormItem, Input, Logo } from '@rflban/waveui';
import { Map } from '../../modules/Store/types';
import { connect } from '../../modules/Connect';
import { userSignup } from '../../actions/User';
import { validatePassword, validateUsername, validateEmail } from '../../utils/User';
import Link from '../../modules/Router/Link2';
import '../../index.css';
import './SignupPage.scss';
import Redirect from '../../modules/Router/Redirect';
import RouteNavigator from '../../modules/Router/RouteNavigator';
import { entrenceSmallScreen } from '../../mediaQueries';

class SignupPage extends VDom.Component<any, any, null, RouteNavigator> {
  private readonly usernameInputRef = new VDom.Ref<FormItem>();

  private readonly emailInputRef = new VDom.Ref<FormItem>();

  private readonly passwordInputRef = new VDom.Ref<FormItem>();

  private readonly repeatPasswordInputRef = new VDom.Ref<FormItem>();

  private repeatPasswordEdited = false;

  state = {
    smallScreen: entrenceSmallScreen.matches,
  };

  mediaSmallScreenhandler = (e: MediaQueryListEvent): void => {
    this.setState({
      smallScreen: e.matches,
    });
  }

  didMount(): void {
    entrenceSmallScreen.addEventListener('change', this.mediaSmallScreenhandler);
  }

  willUmount(): void {
    entrenceSmallScreen.removeEventListener('change', this.mediaSmallScreenhandler);
  }

  isEqualToPassword = (repeatPassword: string): boolean => (
    repeatPassword === this.passwordInputRef.instance.value
  )

  passwordInputHandler = (_e: InputEvent): void => {
    if (this.repeatPasswordEdited) {
      this.repeatPasswordInputRef.instance.validate();
    }
  }

  repeatPasswordInputHandler = (_e: InputEvent): void => {
    this.repeatPasswordEdited = true;
  }

  handleSubmit = (e: Event): void => {
    e.preventDefault();

    const { instance: usernameInput } = this.usernameInputRef;
    const { instance: emailInput } = this.emailInputRef;
    const { instance: passwordInput } = this.passwordInputRef;
    const { instance: repeatPasswordInput } = this.repeatPasswordInputRef;

    const usernameIsValid = usernameInput.check();
    const emailIsValid = emailInput.check();
    const passwordIsValid = passwordInput.check();
    const repeatPasswordIsValid = repeatPasswordInput.check();

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
      return <Redirect to="/" />;
    }

    const { smallScreen } = this.state;

    return (
      <div class="waveLoginPage">
        <div class="waveLoginPage__inner">
          <Link to="/">
            <Logo size={smallScreen ? 'm': 'l'} class="waveLoginPage__logo"/>
            <Caption align="center" style={{
              display:'table',
              margin:'0 auto'
            }}> The Best Musical Service</Caption>
          </Link>
          <form class="waveLoginPage__form" onSubmit={this.handleSubmit}>
            <FormItem
              as={Input}
              ref={this.usernameInputRef}
              placeholder="Username"
              label="Username"
              error="Username have to contain at 3-16 characters (digits, letters or _)"
              checker={validateUsername}
            />
            <FormItem
              as={Input}
              ref={this.emailInputRef}
              placeholder="Email"
              label="Email"
              error="Wrong email format"
              checker={validateEmail}
            />
            <FormItem
              as={Input}
              ref={this.passwordInputRef}
              placeholder="Password"
              label="Password"
              error="Password have to contain at least 6 characters (digits and letters)"
              type="password"
              checker={validatePassword}
              onInput={this.passwordInputHandler}
            />
            <FormItem
              as={Input}
              ref={this.repeatPasswordInputRef}
              placeholder="Confirm password"
              label="Confirm password"
              error="Passwords don't match"
              type="password"
              checker={this.isEqualToPassword}
              onInput={this.repeatPasswordInputHandler}
            />
            <Button stretched size={smallScreen ? 'm' : 's'} class="waveLoginPage__submit"> Sign up </Button>
          </form>
          <div class="waveLoginPage__footer">
            <Divider/>
            <Caption align="center">Already have an account?</Caption>
            <Link to="/login">
              <Button stretched size={smallScreen ? 'm' : 's'} mode="secondary"> Log in </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

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
