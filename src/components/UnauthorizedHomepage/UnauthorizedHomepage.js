import Component from '/modules/Component/Component.js';
import Popular from '/components/Homepage/Popular.js';

export default class UnauthorizedHomepage extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['UnauthorizedHomepage.hbs'];
  }

  render() {
    return this.#template({
      popular: new Popular(),
    });
  }
}
