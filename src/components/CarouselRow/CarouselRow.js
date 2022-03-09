import Component from '/modules/Component/Component.js';

export default class CarouselRow extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['CarouselRow.hbs'];
  }

  render() {
    const { children } = this.props;
    return this.#template({ children });
  }
}
