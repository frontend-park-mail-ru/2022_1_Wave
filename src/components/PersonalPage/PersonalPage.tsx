import VDom from '@rflban/vdom';
import {
  Caption,
  Headline,
  FormItem,
  Input,
  ImageInput,
  Button,
} from '@rflban/waveui';
import '../../index.css';
import './PersonalPage.scss';
import avatar from '../../assets/avatar.png';
import avatarPlaceholder from '../../assets/avatar_placeholder.png';
import { validatePassword as _validatePassword, validateUsername } from '../../utils/User';
import { Map } from '../../modules/Store/types';
import { updateAvatar, updateSelf, userGetSelf, userSet } from '../../actions/User';
import { connect } from '../../modules/Connect';
import ValidatableInput from '../common/ValidatableInput/ValidatableInput';
import Redirect from '../../modules/Router/Redirect';
import { entrenceSmallScreen, mainSmallScreen } from '../../mediaQueries';

const validateImage = (image?: File): boolean => (
  image != null && image.size <= 2 * 1024 * 1024
);

const validatePassword = (val: string): boolean => (
  val === '' || _validatePassword(val)
);

interface PersonalPageProps {
  isAuth: boolean,
  user: any;
  setNewAvatar: (_form: any) => void;
  setNewUser: (_form: any) => void;
  userGetSelf: () => void;
  setLocalUser: (_partialUser: any) => void;
}

type PersonalPageState = {
  fileLoaded: boolean;
  fileSrc: string;
  smallScreen: boolean;
};

class PersonalPageComponent extends VDom.Component<
  PersonalPageProps,
  PersonalPageState
> {
  private readonly usernameInputRef = new VDom.Ref<FormItem>();

  private readonly passwordInputRef = new VDom.Ref<FormItem>();

  private readonly avatarInputRef = new VDom.Ref<FormItem>();

  private readonly repeatPasswordInputRef = new VDom.Ref<FormItem>();

  private repeatPasswordEdited = false;

  private usernameEdited = false;

  state = {
    fileLoaded: false,
    fileSrc: avatar,
    smallScreen: mainSmallScreen.matches,
  };

  constructor(props: PersonalPageProps) {
    super(props);
    this.props.userGetSelf();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.isEqualToPassword = this.isEqualToPassword.bind(this);
    this.additionalPasswordValidator = this.additionalPasswordValidator.bind(this);
    this.onInputAvatar = this.onInputAvatar.bind(this);
    this.checkAvatar = this.checkAvatar.bind(this);
  }

  additionalPasswordValidator(_e: InputEvent): void {
    this.repeatPasswordInputRef.instance.validateDebounced();
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

  usernameInputHandler = (_e: InputEvent): void => {
    this.usernameEdited = true;
  }

  handleReset = (e: Event): void => {
    e.preventDefault();

    const { instance: usernameInput } = this.usernameInputRef;
    const { instance: passwordInput } = this.passwordInputRef;
    const { instance: avatarInput } = this.avatarInputRef;
    const { instance: repeatPasswordInput } = this.repeatPasswordInputRef;

    usernameInput.reset();
    passwordInput.reset();
    repeatPasswordInput.reset();
    avatarInput.reset();

    usernameInput.value = this.props.user.username;
  }

  handleSubmit = (e: Event): void => {
    e.preventDefault();

    const { user, setNewUser, setNewAvatar, setLocalUser } = this.props;
    let updated = false;

    const { instance: usernameInput } = this.usernameInputRef;
    const { instance: passwordInput } = this.passwordInputRef;
    const { instance: avatarInput } = this.avatarInputRef;
    const { instance: repeatPasswordInput } = this.repeatPasswordInputRef;

    const newUserData: any = {};

    if (usernameInput.value !== user.username && usernameInput.check()) {
      newUserData.username = usernameInput.value;
      this.usernameEdited = false;
      updated = true;
    }
    if (passwordInput.value !== '' && passwordInput.check() && repeatPasswordInput.check()) {
      newUserData.password = passwordInput.value;
      updated = true;
    }

    if (updated) {
      setNewUser(newUserData);
    }

    if (avatarInput.value != null && avatarInput.check()) {
      const formData = new FormData();
      formData.append('avatar', avatarInput.value);
      updated = true;
      newUserData.avatar = URL.createObjectURL(avatarInput.value);

      setNewAvatar(formData);
    }

    if (updated) {
      // setTimeout(() => getSelf(), 500);
      const localUser: any = {};

      if (newUserData.username) {
        localUser.username = newUserData.username;
      }
      if (newUserData.avatar) {
        localUser.avatar = newUserData.avatar;
      }

      setLocalUser(localUser);
    }
  }

  checkAvatar(): boolean {
    return this.state?.fileLoaded ?? false;
  }

  onInputAvatar(e: Event): void {
    const file: File = ((e.target as HTMLInputElement)?.files as FileList)[0];
    if (!file) {
      return;
    }
    const MB: number = 1048576;
    if (file.type.split('/')[0] !== 'image' || file.size > MB) {
      this.setState({ fileLoaded: false });
    }
    this.setState({ fileLoaded: true, fileSrc: URL.createObjectURL(file) });
  }

  mediaSmallScreenHandler = (e: MediaQueryListEvent): void => {
    this.setState({
      smallScreen: e.matches,
    });
  }

  willUmount(): void {
    mainSmallScreen.removeEventListener('change', this.mediaSmallScreenHandler);
  }

  didMount(): void {
    mainSmallScreen.addEventListener('change', this.mediaSmallScreenHandler);

    if (this.props.user) {
      if (!this.usernameEdited) {
        this.usernameInputRef.instance.value = this.props.user.username;
      }

      if (this.props.user.avatar) {
        this.setState({ fileSrc: this.props.user.avatar });
      }
    }
  }

  didUpdate(): void {
    if (this.props.user) {
      if (!this.usernameEdited) {
        this.usernameInputRef.instance.value = this.props.user.username;
      }

      if (this.props.user.avatar) {
        if (this.state.fileSrc !== this.props.user.avatar) {
          if (this.state.fileSrc.split(':')[0] !== 'blob') {
            this.setState({ fileSrc: this.props.user.avatar });
          }
        }
      }
    }
  }

  render(): VDom.VirtualElement {
    if (!this.props.isAuth) {
      return <Redirect to="/login" />;
    }

    const { smallScreen } = this.state;
    const { user } = this.props;

    return (
      <div class="wavePersonalPage">
        <Headline size="s">Settings</Headline>
        <form class="wavePersonalPage__form" onSubmit={this.handleSubmit}>
          <div class="wavePersonalPage__form__item">
            {!smallScreen && (
              <div class="wavePersonalPage__form__item__label">
                <Caption>Your photo</Caption>
              </div>
            )}
            <div class="wavePersonalPage__form__item__wrapper">
              <FormItem
                ref={this.avatarInputRef}
                label={smallScreen ? 'Your photo' : undefined}
                as={ImageInput}
                size="l"
                nonValue={user?.avatar ?? avatarPlaceholder}
                align={smallScreen ? 'center' : 'right'}
                checker={validateImage}
                error="Picture max size is 2Mib"
              />
            </div>
          </div>
          <div class="wavePersonalPage__form__item">
            {!smallScreen && (
              <div class="wavePersonalPage__form__item__label">
                <Caption>Username</Caption>
              </div>
            )}
            <div class="wavePersonalPage__form__item__wrapper">
              <FormItem
                ref={this.usernameInputRef}
                label={smallScreen ? 'Username' : undefined}
                as={Input}
                placeholder="Username"
                error="Username have to contain at 3-16 characters (digits, letters or _)"
                checker={validateUsername}
                onInput={this.usernameInputHandler}
              />
            </div>
          </div>
          <div class="wavePersonalPage__form__item">
            {!smallScreen && (
              <div class="wavePersonalPage__form__item__label">
                <Caption>Password</Caption>
              </div>
            )}
            <div class="wavePersonalPage__form__item__wrapper">
              <FormItem
                type="password"
                ref={this.passwordInputRef}
                label={smallScreen ? 'New password' : undefined}
                as={Input}
                placeholder="New password"
                error="Password have to contain at least 6 characters (digits and letters)"
                checker={validatePassword}
              />
              <FormItem
                type="password"
                ref={this.repeatPasswordInputRef}
                label={smallScreen ? 'Repeat password' : undefined}
                as={Input}
                placeholder="Confirm new password"
                error="Passwords don't match"
                checker={this.isEqualToPassword}
              />
            </div>
          </div>
          <div class="wavePersonalPage__form__controls">
            <Button mode="secondary" size={smallScreen ? 'm' : 's'} stretched={smallScreen} onClick={this.handleReset}>
              Reset changes
            </Button>
            <Button mode="primary" size={smallScreen ? 'm' : 's'} stretched={smallScreen}>
              Confirm
            </Button>
          </div>
        </form>
      </div>
    );
  }

  rrender = (): VDom.VirtualElement => {
    const { user } = this.props;

    return (
      <div class="text personal-page">
        <div class="personal-page__title">Settings</div>
        <form onsubmit={this.handleSubmit} class="personal-page__settings-form">
          <div class="settings-form__form">
            <label htmlFor="avatar" class="input-label form__avatar-label">
              Your photo
            </label>
            <label
              class="form__upload"
              style={{ 'background-image': `url(${this.state.fileSrc})` }}
            >
              <ValidatableInput
                ref={this.avatarInputRef}
                type="file"
                class="input-line form__avatar-label"
                placeholder="Avatar"
                onInput={this.onInputAvatar}
                checker={this.checkAvatar}
                errorMessage={'Avatar is greater 1 MB'}
              />
            </label>
          </div>
          <div class="settings-form__form">
            <label htmlFor="username" class="input-label form__username-label">
              New username:
            </label>
            <ValidatableInput
              ref={this.usernameInputRef}
              type="text"
              placeholder={user?.username ?? 'Username'}
              checker={validateUsername}
              errorMessage={'Username have to contain at 3-16 characters (digits, letters or _)'}
            />
          </div>
          <div class="settings-form__form">
            <label htmlFor="password" class="input-label form__password-label">
              Password
            </label>
            <div class="form__password-inputs">
              <ValidatableInput
                ref={this.passwordInputRef}
                type="password"
                class="login-form__input-line"
                placeholder="Password"
                checker={validatePassword}
                errorMessage={'Password have to contain at least 6 characters (digits and letters)'}
                onInput={this.additionalPasswordValidator}
              />
              <ValidatableInput
                ref={this.repeatPasswordInputRef}
                type="password"
                class="register-form__input-line"
                placeholder="Confirm password"
                checker={this.isEqualToPassword}
                errorMessage={"Passwords don't match"}
              />
            </div>
          </div>
          <div class="settings-form__form _border-none">
            <div class="form__controls">
              <button type="cancel" class="text form__cancel-button">
                Cancel
              </button>
              <button type="submit" class="text form__submit-button">
                Save changes
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };
}

const mapStateToProps = (state: any): Map => ({
  isAuth: state.user?.id != null,
  user: state.user ? state.user : null,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  setNewUser: (form: any): void => {
    dispatch(updateSelf(form));
  },
  setNewAvatar: (form: any): void => {
    dispatch(updateAvatar(form));
  },
  userGetSelf: (): void => {
    dispatch(userGetSelf());
  },
  setLocalUser: (partialUser: any): void => {
    dispatch(userSet(partialUser));
  }
});

const PersonalPage = connect(mapStateToProps, mapDispatchToProps)(PersonalPageComponent);
export default PersonalPage;
