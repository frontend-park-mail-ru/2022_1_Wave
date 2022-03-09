import Component from '/modules/Component/Component.js';
import Playlist from '/components/Playlist/Playlist.js';
import Song from '/actions/Song.js';

export default class Sidebar extends Component {
  #template;

  #tracks;

  #isLoaded;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['Sidebar.hbs'];

    this.#isLoaded = false;
    this.#tracks = [];
  }

  willMount() {
    if (!this.#isLoaded) {
      Song.getPopular()
        .then((songs) => {
          this.#isLoaded = true;
          this.#tracks = songs;
          this.remount();
        });
    } else {
      this.#isLoaded = false;
    }
  }

  render() {
    const playlist = new Playlist({
      tracks: this.#tracks.map((item) => ({
        title: item.title,
        cover: item.cover,
        artist: item.artist,
      })),
    });

    return this.#template({ playlist });
  }
}
