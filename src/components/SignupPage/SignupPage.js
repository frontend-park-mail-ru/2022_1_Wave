import Component from '/modules/Component/Component.js';

export default class SignupPage extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['SignupPage.hbs'];
  }

  render() {
    return this.#template();
  }
}
