import VirtualElement from '../../modules/VDom/VirtualElement';
import VDom from '../../modules/VDom';
import '../../index.css';
import './PersonalPage.scss';
import avatar from '../../assets/avatar.png';
import { validatePassword, validateUsername } from '../../utils/User';
import { Map } from '../../modules/Store/types';
import { updateAvatar, updateSelf, userGetSelf } from '../../actions/User';
import { connect } from '../../modules/Connect';
import ValidatableInput from "../common/ValidatableInput/ValidatableInput";
import {IComponentPropsCommon} from "../../modules/VDom/IComponentProps";


interface PersonalPageComponentProps extends IComponentPropsCommon {
  user: any;
  setNewAvatar: (form:any) => void;
  setNewUser: (form:any) => void;
  userGetSelf: () => void;
}

type PersonalPageComponenState = {
  fileLoaded: boolean;
  fileSrc: string;
};

class PersonalPageComponent extends VDom.Component<PersonalPageComponentProps,PersonalPageComponenState> {
  private readonly usernameInputRef = new VDom.Ref<ValidatableInput>();

  private readonly passwordInputRef = new VDom.Ref<ValidatableInput>();

  private readonly avatarInputRef = new VDom.Ref<ValidatableInput>();

  private readonly repeatPasswordInputRef = new VDom.Ref<ValidatableInput>();

  constructor(props: PersonalPageComponentProps) {
    super(props);
    this.state = {
      fileLoaded: false,
      fileSrc: avatar,
    };
    this.props.userGetSelf();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.isEqualToPassword = this.isEqualToPassword.bind(this);
    this.additionalPasswordValidator = this.additionalPasswordValidator.bind(this);
    this.onInputAvatar = this.onInputAvatar.bind(this);
    this.checkAvatar = this.checkAvatar.bind(this);
  }

  isEqualToPassword(repeatPassword: string): boolean {
    return repeatPassword === this.passwordInputRef.instance.value;
  }

  additionalPasswordValidator(_e: InputEvent): void {
    this.repeatPasswordInputRef.instance.validateDebounced();
  }

  handleSubmit(e: Event): void {
    e.preventDefault();

    const { instance: usernameInput } = this.usernameInputRef;
    const { instance: passwordInput } = this.passwordInputRef;
    const { instance: avatarInput } = this.avatarInputRef;
    const { instance: repeatPasswordInput } = this.repeatPasswordInputRef;

    const usernameIsValid = usernameInput.validate();
    const passwordIsValid = passwordInput.validate();
    const repeatPasswordIsValid = repeatPasswordInput.validate();
    const avatarIsValid = avatarInput.validate();

    if (!usernameIsValid && !passwordIsValid && !repeatPasswordIsValid && !avatarIsValid) {
      return;
    }

    const newSet:any = {};
    if (avatarIsValid) {
      const file:File = (((e.target as HTMLElement)?.querySelector('input[type=file]') as HTMLInputElement)?.files as FileList)[0]
      const formData:any = new FormData();
      formData.append('avatar', file);
      this.props.setNewAvatar(formData);
    }
    if (passwordIsValid && repeatPasswordIsValid || usernameIsValid) {
      if (usernameIsValid) {
        newSet.username = usernameInput.value;
      }
      if (passwordIsValid && repeatPasswordIsValid) {
        newSet.password = passwordInput.value;
      }
      this.props.setNewUser(newSet);
    }
    this.props.userGetSelf();
  }

  checkAvatar():boolean {
    return this.state?.fileLoaded;
  }

  onInputAvatar(e: Event): void {
    const file: File = ((e.target as HTMLInputElement)?.files as FileList)[0];
    if (!file) {
      return;
    }
    const MB:number = 1048576
    if (file.type.split('/')[0] !== 'image' || file.fize > MB) {
      this.setState({ fileLoaded: false });
    }
    this.setState({ fileLoaded: true, fileSrc: URL.createObjectURL(file) });
  }

  didMount():void {
    if (this.props.user) {
      if (this.props.user.avatar) {
        this.setState({ fileSrc: this.props.user.avatar });
      }
    }
  }

  didUpdate():void {
    if (this.props.user) {
      if (this.props.user.avatar) {
        if (this.state.fileSrc !== this.props.user.avatar) {
          if (this.state.fileSrc.split(':')[0] !== 'blob') {
            this.setState({ fileSrc: this.props.user.avatar });
          }
        }
      }
    }
  }

  render = (): VirtualElement => {
    const { user } = this.props;

    return (
      <div class="text personal-page">
        <div class="personal-page__title">Settings</div>
        <form onsubmit={this.handleSubmit} class="personal-page__settings-form">
          <div class="settings-form__form">
            <label htmlFor="avatar" className="input-label form__avatar-label">
              Your photo
            </label>
            <label
              class="form__upload"
              style={{'background-image': `url(${this.state.fileSrc})`}}
            >
              <ValidatableInput
                ref={this.avatarInputRef}
                type="file"
                class="input-line form__avatar-label"
                placeholder="Avatar"
                onInput={this.onInputAvatar}
                checker={this.checkAvatar}
                errorMessage={"Avatar is greater 1 MB"}
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
              <button type="cancel" class="text form__cancel-button">Cancel</button>
              <button type="submit" class="text form__submit-button">Save changes</button>
            </div>
          </div>
        </form>
      </div>
    );
  };
}

const mapStateToProps = (state: any): Map => ({
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
});

const PersonalPage = connect(mapStateToProps, mapDispatchToProps)(PersonalPageComponent);
export default PersonalPage;
