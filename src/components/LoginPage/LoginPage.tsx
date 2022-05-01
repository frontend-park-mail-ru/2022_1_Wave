import VDom from '@rflban/vdom';
import {
  Input,
  FormItem,
  Logo,
  Button,
  Divider, Caption,
} from '@rflban/waveui';
import { Map } from '../../modules/Store/types';
import { connect } from '../../modules/Connect';
import { userLogin } from '../../actions/User';
import Link from '../../modules/Router/Link2';
import '../../index.css';
import './LoginPage.scss';
import Redirect from '../../modules/Router/Redirect';
import RouteNavigator from '../../modules/Router/RouteNavigator';

const isNotEmpty = (val: string): boolean => val !== '';

class LoginPage extends VDom.Component<any, any, null, RouteNavigator> {
  private readonly usernameInputRef = new VDom.Ref<FormItem>();

  private readonly passwordInputRef = new VDom.Ref<FormItem>();

  constructor(props: any) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: Event): void {
    e.preventDefault();

    const { instance: usernameInput } = this.usernameInputRef;
    const { instance: passwordInput } = this.passwordInputRef;

    const usernameIsValid = usernameInput.check();
    const passwordIsValid = passwordInput.check();

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
      <div class="waveLoginPage">
        <div class="waveLoginPage__inner">
          <Link to="/">
            <Logo size="l" class="waveLoginPage__logo"/>
          </Link>
          <form class="waveLoginPage__form" onSubmit={this.handleSubmit}>
            <FormItem
              as={Input}
              ref={this.usernameInputRef}
              placeholder="Username"
              label="Username"
              error="Empty"
              checker={isNotEmpty}
            />
            <FormItem
              as={Input}
              ref={this.passwordInputRef}
              placeholder="Password"
              label="Password"
              error="Empty"
              type="password"
              checker={isNotEmpty}
            />
            <Button stretched size="s" class="waveLoginPage__submit"> Log in </Button>
          </form>
          <div class="waveLoginPage__footer">
            <Divider/>
            <Caption>Don’t have an account?</Caption>
            <Link to="/signup">
              <Button stretched size="s" mode="secondary"> Sign up </Button>
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
  login: ({ username, password }: { username: string; password: string }): void => {
    dispatch(userLogin({ username, password }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
