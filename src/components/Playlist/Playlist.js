import Component from '/modules/Component/Component.js';
import Track from '/components/Playlist/Track.js';

export default class Playlist extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['Playlist.hbs'];
  }

  render() {
    const { tracks } = this.props;

    return this.#template({
      tracks: tracks.map(
        (track, idx) => new Track({ number: idx + 1, ...track }),
      ),
    });
  }
}
