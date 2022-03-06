import Component from '/modules/Component/Component.js';

export default class AlbumCard extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['AlbumCard.hbs'];
  }

  render() {
    const { cover, title, artist } = this.props;
    return this.#template({ cover, title, artist });
  }
}
