import Component from '/modules/Component/Component.js';

export default class LoginPage extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['LoginPage.hbs'];
  }

  render() {
    return this.#template();
  }
}
