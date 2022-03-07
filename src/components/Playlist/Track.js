import Component from '/modules/Component/Component.js';

export default class Track extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['Track.hbs'];
  }

  render() {
    const { number, title, artist, cover } = this.props;
    return this.#template({
      number: number.toString().padStart(2, '0'),
      title,
      artist,
      cover,
    });
  }
}
