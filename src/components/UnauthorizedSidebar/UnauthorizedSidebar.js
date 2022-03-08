import Component from '/modules/Component/Component.js';
import Playlist from '/components/Playlist/Playlist.js';

export default class UnauthorizedSidebar extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['UnauthorizedSidebar.hbs'];
  }

  render() {
    const playlist = new Playlist({
      tracks: [
        { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/playlist-track-icon-dummy.png' },
        { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/playlist-track-icon-dummy.png' },
        { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/playlist-track-icon-dummy.png' },
        { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/playlist-track-icon-dummy.png' },
        { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/playlist-track-icon-dummy.png' },
        { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/playlist-track-icon-dummy.png' },
        { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/playlist-track-icon-dummy.png' },
        { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/playlist-track-icon-dummy.png' },
        { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/playlist-track-icon-dummy.png' },
        { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/playlist-track-icon-dummy.png' },
        { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/playlist-track-icon-dummy.png' },
        { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/playlist-track-icon-dummy.png' },
      ],
    });

    return this.#template({ playlist });
  }
}