import Component from '/modules/Component/Component.js';
import Popular from '/components/Homepage/Popular.js';
import User from '/actions/User.js';

export default class Homepage extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['Homepage.hbs'];
    this.logout = this.logout.bind(this);
  }

  render() {
    return this.#template({
      popular: new Popular(),
    });
  }

  logout() {
    User.logout().then(() => {
      this.props.parent.remount();
    });
  }

  didMount(node) {
    node.querySelector('.popup__logout').addEventListener('click', this.logout);
  }

  willUnmount(node) {
    node.querySelector('.popup__logout').removeEventListener('click', this.logout);
  }
}
