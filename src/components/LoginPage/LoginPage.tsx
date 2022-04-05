import Component from '../../modules/VDom/Component';
import VirtualElement from '../../modules/VDom/VirtualElement';
import '../../index.css';
import './LoginPage.scss';
import VDom from '../../modules/VDom';
import { IProps } from '../../modules/VDom/Interfaces';

export default class LoginPage extends Component {
  constructor(props:IProps) {
    super(props);
    this.state = {
      isSignUp: false,
    };
    this.tooglePage = this.tooglePage.bind(this);
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

  render(): VirtualElement {
    const content: HTMLElement = this.state.isSignUp ? (
      <form class="login-form">
        <a class="main__button" href="/">
          <div class="logo login-form__logo"></div>
        </a>
        <div class="login-form_align">
          <label htmlFor="username" class="input-label login-form__input-label">Username:</label>
          <input type="text" placeholder="Username" class="input-line login-form__input-line"
            id="username"/>
          <label id="login__username-label_danger"
            class="input-label login-form__input-label login-from__tooltip_danger invisible">Username
              have to contain at least 3 charecters (digits, letters or &#171;_&#187;)</label>
        </div>

        <div class="login-form_align">

          <label htmlFor="password" class="input-label login-form__input-label">Password:</label>
          <input type="password" placeholder="Password" class="input-line login-form__input-line"
            id="password"/>
          <label id="login__password-label_danger"
            class="input-label login-form__input-label login-from__tooltip_danger invisible">Password
                      have to contain at least 6 charecters (digits and letters)</label>
        </div>

        <div class="login-form_align">
          <input type="submit" value="Log in" class="button button_blue login-form__button"/>
          <label id="login__submit-label_danger"
            class="input-label login-form__input-label login-from__common-tooltip_danger invisible">placeholder</label>
        </div>

        <div class="menu-footer login-form_align">
          <div class="menu-footer__line">
          </div>
          <p class="menu-footer__text">Don't have an account?</p>
          <div onclick={this.tooglePage} class="button button_gray menu-footer__button" ><span>Sign up</span></div>
        </div>
      </form>
    ) : (
      <form class="login-form">
        <a class="main__button" href="/">
          <div class="logo login-form__logo"></div>
        </a>
        <div class="login-form_align">
          <label htmlFor="username" class="input-label login-form__input-label">Username:</label>
          <input type="text" placeholder="Username" class="input-line register-form__input-line"
            id="username"/>
          <label id="login__username-label_danger"
            class="input-label login-form__input-label login-from__tooltip_danger invisible">Username
                      have to
                      contain at least 3 charecters (digits, letters or &#171;_&#187;)</label>
        </div>

        <div class="login-form_align">
          <label htmlFor="email" class="input-label login-form__input-label">Email:</label>
          <input type="text" placeholder="Email" class="input-line register-form__input-line" id="email"/>
          <label id="login__email-label_danger"
            class="input-label login-form__input-label login-from__tooltip_danger invisible">Wrong
                      email
                      format</label>
        </div>

        <div class="login-form_align">
          <label htmlFor="password" class="input-label login-form__input-label">Password:</label>
          <input type="password" placeholder="Password" class="input-line register-form__input-line"
            id="password"/>
          <label id="login__password-label_danger"
            class="input-label login-form__input-label login-from__tooltip_danger invisible">Password
                      have to
                      contain at least 6 charecters (digits and letters)</label>
        </div>

        <div class="login-form_align">
          <label htmlFor="confirmPassword" class="input-label login-form__input-label">Confirm
                      password:</label>
          <input type="password" placeholder="Confirm Password" class="input-line register-form__input-line"
            id="confirmPassword"/>
          <label id="login__password-repeat-label_danger"
            class="input-label login-form__input-label login-from__tooltip_danger invisible">Passwords
                      mismatch</label>
        </div>

        <div class="login-form_align">
          <input type="submit" value="Sign up" class="button button_blue register-form__button"/>
          <label id="register__submit-label_danger"
            class="input-label login-form__input-label login-from__common-tooltip_danger invisible">placeholder</label>
        </div>
        <div class=" menu-footer login-form_align">
          <div class="menu-footer__line"></div>
          <p class="menu-footer__text">Already have an account?</p>
          <div onclick={this.tooglePage}class="button button_gray menu-footer__button">
            <span>Log in</span>
          </div>
        </div>
      </form>
    );
    return (
      <div class="login-page">
        {content}
      </div>);
  }
}
