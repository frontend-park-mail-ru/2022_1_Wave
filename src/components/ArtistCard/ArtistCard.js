import Component from '/modules/Component/Component.js';

export default class ArtistCard extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['ArtistCard.hbs'];
  }

  render() {
    const { cover, name } = this.props;
    return this.#template({ cover, name });
  }
}
