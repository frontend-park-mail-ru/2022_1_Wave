import Component from '../../modules/VDom/Component';
import VirtualElement from '../../modules/VDom/VirtualElement';
import Navbar from '../common/Navbar/Navbar';
import VDom from '../../modules/VDom';
import '../../index.css';
import './PersonalPage.scss';
import album from '../../assets/playlist-track-icon-dummy.png';

export default class PersonalPage extends Component {
  render = (): VirtualElement => {
    const { isAuthorized } = this.props;

    return (
      <div class="personal-page">
        <Navbar isAuthorized={true}/>
        <form class="text personal-page__settings-form">
          <div class="settings-form__title">
                Settings
          </div>
          <div class="settings-form__form">
            <label htmlFor="username" class="input-label form__username-label">New username:</label>
            <input type="text" placeholder="Username" class="input-line form__username-label"
              id="username"/>
            <label id="login__username-label_danger"
              class="input-label from__username-tooltip_danger invisible">Username
                have to contain at least 3 charecters (digits, letters or &#171;_&#187;)</label>
          </div>
          <div class="settings-form__form">
            <label htmlFor="password" class="input-label form__username-label">New password:</label>
            <input type="text" placeholder="Password" class="input-line form__password-label"
              id="username"/>
            <label id="login__password-label_danger"
              class="input-label from__password-tooltip_danger invisible">Username
                have to contain at least 3 charecters (digits, letters or &#171;_&#187;)</label>
          </div>
          <div class="settings-form__form">
            <label htmlFor="confirm" class="input-label form__username-label">Confirm password:</label>
            <input type="text" placeholder="Confirm" class="input-line form__confirm-label"
              id="username"/>
            <label id="login__confirm-label_danger"
              class="input-label from__confirm-tooltip_danger invisible">Passwords are different!</label>
          </div>
          <div class="settings-form__form">
            <label htmlFor="avatar" class="input-label form__avatar-label">New avatar:</label>
            <label class="form__upload">
              <input type="file" placeholder="Avatar" class="input-line form__avatar-label"
                id="username"/>
                Upload
            </label>
            <label id="login__avatar-label_danger"
              class="input-label from__avatar-tooltip_danger invisible">It must be less 1MB!</label>
          </div>
          <div class="settings-form__form">
            <input type="submit" value="Submit" class="text form__submit-button"/>
          </div>
        </form>
      </div>
    );
  };
}
