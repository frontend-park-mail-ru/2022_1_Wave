import VirtualElement from '../../modules/VDom/VirtualElement';
import Navbar from '../common/Navbar/Navbar';
import VDom from '../../modules/VDom';
import '../../index.css';
import './PersonalPage.scss';
import avatar from '../../assets/avatar.jpeg';
import { IProps } from '../../modules/VDom/Interfaces';
import { validatePassword, validateUsername } from '../../utils/User';
import { Map } from '../../modules/Store/types';
import {updateAvatar, updateSelf} from '../../actions/User';
import { connect } from '../../modules/Connect';

class PersonalPage extends VDom.Component {
  constructor(props: IProps) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: false,
      userNameChecked: false,
      passwordChecked: false,
      fileLoaded: false,
    };
    this.tryAcceptPassword = this.tryAcceptPassword.bind(this);
    this.tryAcceptPasswordRepeat = this.tryAcceptPasswordRepeat.bind(this);
    this.tryAcceptUName = this.tryAcceptUName.bind(this);
    this.tryAcceptAvatar = this.tryAcceptAvatar.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e: Event): void {
    e.preventDefault();
    const passwordCondition = (this.state.confirmPassword && this.state.passwordChecked);
    const unameCondition = this.state.userNameChecked;
    const fileCondition = this.state.fileLoaded;
    console.log("password:",passwordCondition, "uname:",unameCondition,"file:",fileCondition )
    if( !passwordCondition &&
        !unameCondition &&
        !fileCondition ){
      return;
    }
    const newSet = {}
    if(fileCondition){
      const formData = new FormData();
      formData.append('avatar', e.target.avatar.files[0]);
      for (let value of formData.values()) {
        console.log("form:",value);
      }
      this.props.setNewAvatar(formData);
    }
    if(!passwordCondition && !unameCondition){
      return;
    }
    if(unameCondition){
      newSet.username = e.target.username.value;
    }
    if(passwordCondition){
      newSet.password = e.target.password.value;
    }
    this.props.setNewUser(newSet);
  }

  tryAcceptUName(e: Event): void {
    const uname: string = e.target.value;
    if (!validateUsername(uname)) {
      e.target.classList.add('input__wrong');
      document.getElementById('form__username-label_danger').classList.remove('invisible');
      this.setState({ userNameChecked: false, password });
      return;
    }
    this.setState({ userNameChecked: true, username: uname });
  }

  tryAcceptPassword(e: Event): void {
    const password: string = e.target.value;
    if (!validatePassword(password)) {
      e.target.classList.add('input__wrong');
      document.getElementById('form__password-label_danger').classList.remove('invisible');
      this.setState({ passwordChecked: false, password });
      return;
    }
    this.setState({ passwordChecked: true, password });
  }

  tryAcceptPasswordRepeat(e: Event): void {
    const password: string = e.target.value;
    if (password !== this.state.password) {
      e.target.classList.add('input__wrong');
      document.getElementById('form__confirm-label_danger').classList.remove('invisible');
      this.setState({ confirmPassword: false });
      return;
    }
    this.setState({ confirmPassword: true });
  }

  tryAcceptAvatar(e: Event): void {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (file.type !== 'image/png') {
      e.target.classList.add('input__wrong');
      document.getElementById('form__avatar-label_danger').classList.remove('invisible');
      this.setState({ fileLoaded: false });
    }
    this.setState({ fileLoaded: true });
  }

  clearUName(e: Event): void {
    e.target.classList.remove('input__wrong');
    document.getElementById('form__username-label_danger').classList.add('invisible');
  }

  clearPassword(e: Event): void {
    e.target.classList.remove('input__wrong');
    document.getElementById('form__password-label_danger').classList.add('invisible');
  }

  clearPasswordRepeat(e: Event): void {
    e.target.classList.remove('input__wrong');
    document.getElementById('form__confirm-label_danger').classList.add('invisible');
  }

  clearAvatar(e: Event): void {
    e.target.classList.remove('input__wrong');
    document.getElementById('form__avatar-label_danger').classList.add('invisible');
  }

  render = (): VirtualElement => {
    const { isAuthorized } = this.props;
    return (
      <div class="personal-page">
        <Navbar isAuthorized={true} />
        <form onsubmit={this.submitForm} class="text personal-page__settings-form">
          <div class="settings-form__title">Settings</div>
          <div class="settings-form__form">
            <label htmlFor="username" class="input-label form__username-label">
              New username:
            </label>
            <input
              onblur={this.tryAcceptUName}
              value={this.state.username}
              onfocus={this.clearUName}
              type="text"
              placeholder="Username"
              class="input-line form__username-label"
              id="username"
            />
            <label
              id="form__username-label_danger"
              class="input-label from__tooltip_danger invisible"
            >
              Username have to contain at least 3 charecters (digits, letters or &#171;_&#187;)
            </label>
          </div>
          <div class="settings-form__form">
            <label htmlFor="password" class="input-label form__password-label">
              New password:
            </label>
            <input
              onblur={this.tryAcceptPassword}
              value={this.state.password}
              onfocus={this.clearPassword}
              type="password"
              placeholder="Password"
              class="input-line form__password-input"
              id="password"
            />
            <label
              id="form__password-label_danger"
              class="input-label from__tooltip_danger invisible"
            >
              Password have to contain at least 6 charecters (digits and letters)
            </label>
          </div>
          <div class="settings-form__form">
            <label htmlFor="confirm" class="input-label form__confirm-label">
              Confirm password:
            </label>
            <input
              onblur={this.tryAcceptPasswordRepeat}
              onfocus={this.clearPasswordRepeat}
              type="password"
              placeholder="Confirm"
              class="input-line form__confirm-label"
              id="confirm"
            />
            <label
              id="form__confirm-label_danger"
              class="input-label from__tooltip_danger invisible"
            >
              Passwords are different!
            </label>
          </div>
          <div class="settings-form__form">
            <label htmlFor="avatar" class="input-label form__avatar-label">
              Load new avatar:
            </label>
            <label class="form__upload" style={{ 'background-image': `url(${avatar})` }}>
              <input
                onchange={this.tryAcceptAvatar}
                onfocus={this.clearAvatar}
                type="file"
                placeholder="Avatar"
                class="input-line form__avatar-label"
                id="avatar"
              />
            </label>
            <label
              id="form__avatar-label_danger"
              class="input-label from__tooltip_danger invisible"
            >
              It must be .png!
            </label>
          </div>
          <div class="settings-form__form">
            <input type="submit" value="Submit" class="text form__submit-button" />
          </div>
        </form>
      </div>
    );
  };
}

const mapStateToProps = (state: any): Map => ({});

const mapDispatchToProps = (dispatch: any): Map => ({
  setNewUser: (form: any): void => {
    dispatch(updateSelf(form));
  },
  setNewAvatar: (form: any): void => {
    dispatch(updateAvatar(form))
  }
});

const PersonalConnected = connect(mapStateToProps, mapDispatchToProps)(PersonalPage);
export default PersonalConnected;
