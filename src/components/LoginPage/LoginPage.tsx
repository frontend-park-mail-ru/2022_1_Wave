import Component from '../../modules/VDom/Component';
import VirtualElement from '../../modules/VDom/VirtualElement';
import '../../index.css';
import './LoginPage.scss';
import { IProps } from '../../modules/VDom/Interfaces';

export default class LoginPage extends Component {
  constructor(props:IProps) {
    super(props);
    this.state = {
      isSignUp: false,
      content: <div/>,
    };
    this.tooglePage = this.tooglePage.bind(this);
  }

  tooglePage(): void {
    const isSignUp = !this.state.isSignUp;
    const content: HTMLElement = isSignUp ? (
      <form className="login-form">
        <a className="main__button" href="/">
          <div className="logo login-form__logo"></div>
        </a>
        <div className="login-form_align">
          <label htmlFor="username" className="input-label login-form__input-label">Username:</label>
          <input type="text" placeholder="Username" className="input-line login-form__input-line"
            id="username"/>
          <label id="login__username-label_danger"
            className="input-label login-form__input-label login-from__tooltip_danger invisible">Username
                    have to contain at least 3 charecters (digits, letters or &#171;_&#187;)</label>
        </div>

        <div className="login-form_align">

          <label htmlFor="password" className="input-label login-form__input-label">Password:</label>
          <input type="password" placeholder="Password" className="input-line login-form__input-line"
            id="password"/>
          <label id="login__password-label_danger"
            className="input-label login-form__input-label login-from__tooltip_danger invisible">Password
                    have to contain at least 6 charecters (digits and letters)</label>
        </div>

        <div className="login-form_align">
          <input type="submit" value="Log in" className="button button_blue login-form__button"/>
          <label id="login__submit-label_danger"
            className="input-label login-form__input-label login-from__common-tooltip_danger invisible">placeholder</label>
        </div>

        <div className="menu-footer login-form_align">
          <div className="menu-footer__line">
          </div>
          <p className="menu-footer__text">Don't have an account?</p>
          <a className="button button_gray menu-footer__button" href="/signup"><span>Sign up</span></a>
        </div>
      </form>
    ) : (
      <form className="login-form">
        <a className="main__button" href="/">
          <div className="logo login-form__logo"></div>
        </a>
        <div className="login-form_align">
          <label htmlFor="username" className="input-label login-form__input-label">Username:</label>
          <input type="text" placeholder="Username" className="input-line register-form__input-line"
            id="username"/>
          <label id="login__username-label_danger"
            className="input-label login-form__input-label login-from__tooltip_danger invisible">Username
                        have to
                        contain at least 3 charecters (digits, letters or &#171;_&#187;)</label>
        </div>

        <div className="login-form_align">
          <label htmlFor="email" className="input-label login-form__input-label">Email:</label>
          <input type="text" placeholder="Email" className="input-line register-form__input-line" id="email"/>
          <label id="login__email-label_danger"
            className="input-label login-form__input-label login-from__tooltip_danger invisible">Wrong
                        email
                        format</label>
        </div>

        <div className="login-form_align">
          <label htmlFor="password" className="input-label login-form__input-label">Password:</label>
          <input type="password" placeholder="Password" className="input-line register-form__input-line"
            id="password"/>
          <label id="login__password-label_danger"
            className="input-label login-form__input-label login-from__tooltip_danger invisible">Password
                        have to
                        contain at least 6 charecters (digits and letters)</label>
        </div>

        <div className="login-form_align">
          <label htmlFor="confirmPassword" className="input-label login-form__input-label">Confirm
                    password:</label>
          <input type="password" placeholder="Confirm Password" className="input-line register-form__input-line"
            id="confirmPassword"/>
          <label id="login__password-repeat-label_danger"
            className="input-label login-form__input-label login-from__tooltip_danger invisible">Passwords
                        mismatch</label>
        </div>

        <div className="login-form_align">
          <input type="submit" value="Sign up" className="button button_blue register-form__button"/>
          <label id="register__submit-label_danger"
            className="input-label login-form__input-label login-from__common-tooltip_danger invisible">placeholder</label>
        </div>
        <div className=" menu-footer login-form_align">
          <div className="menu-footer__line"></div>
          <p className="menu-footer__text">Already have an account?</p>
          <a className="button button_gray menu-footer__button" href="/login"><span>Log in</span></a>
        </div>
      </form>
    );
    this.setState({isSignUp,isContent});
  }

  didMount(): void {
    const content: HTMLElement = (
      <form className="login-form">
        <a className="main__button" href="/">
          <div className="logo login-form__logo"></div>
        </a>
        <div className="login-form_align">
          <label htmlFor="username" className="input-label login-form__input-label">Username:</label>
          <input type="text" placeholder="Username" className="input-line login-form__input-line"
            id="username"/>
          <label id="login__username-label_danger"
            className="input-label login-form__input-label login-from__tooltip_danger invisible">Username
              have to contain at least 3 charecters (digits, letters or &#171;_&#187;)</label>
        </div>

        <div className="login-form_align">

          <label htmlFor="password" className="input-label login-form__input-label">Password:</label>
          <input type="password" placeholder="Password" className="input-line login-form__input-line"
            id="password"/>
          <label id="login__password-label_danger"
            className="input-label login-form__input-label login-from__tooltip_danger invisible">Password
                      have to contain at least 6 charecters (digits and letters)</label>
        </div>

        <div className="login-form_align">
          <input type="submit" value="Log in" className="button button_blue login-form__button"/>
          <label id="login__submit-label_danger"
            className="input-label login-form__input-label login-from__common-tooltip_danger invisible">placeholder</label>
        </div>

        <div className="menu-footer login-form_align">
          <div className="menu-footer__line">
          </div>
          <p className="menu-footer__text">Don't have an account?</p>
          <a className="button button_gray menu-footer__button" href="/signup"><span>Sign up</span></a>
        </div>
      </form>
    );
    this.setState({ content });
  }

  render(): VirtualElement {
    return (
      <div class="login-page">
        {this.state.content}
      </div>);
  }
}
