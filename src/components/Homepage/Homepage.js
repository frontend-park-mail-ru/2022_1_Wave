import Component from '/modules/Component/Component.js';
import Popular from '/components/Homepage/Popular.js';

export default class Homepage extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['Homepage.hbs'];
  }

  render() {
    return this.#template({
      popular: new Popular(),
    });
  }
}
