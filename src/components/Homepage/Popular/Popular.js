import Component from '/modules/Component/Component.js';
import CarouselRow from '/components/CarouselRow/CarouselRow.js';
import AlbumCard from '/components/ArtistCard/ArtistCard.js';
import ArtistCard from '/components/ArtistCard/ArtistCard.js';
import Album from '/actions/Album.js';
import Artist from '/actions/Artist.js';

export default class Popular extends Component {
  #template;

  #albums;

  #artists;

  #isLoaded;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['Popular.hbs'];

    this.#isLoaded = false;
    this.#albums = [];
    this.#artists = [];
  }

  willMount() {
    if (!this.#isLoaded) {
      Album.getPopular()
        .then((albums) => {
          this.#albums = albums;
          return Artist.getPopular();
        })
        .then((artists) => {
          this.#artists = artists;
          this.#isLoaded = true;
          this.remount();
        });
    } else {
      this.#isLoaded = false;
    }
  }

  render() {
    const albums = this.#albums.map((item) => ({
      title: item.title,
      artist: item.artist,
      cover: item.cover,
    }));

    const artists = this.#artists.map((item) => ({
      name: item.name,
      cover: item.cover,
    }));

    return this.#template({
      albums: new CarouselRow({
        children: albums.map((item) => new AlbumCard(item)),
      }),
      artists: new CarouselRow({
        children: artists.map((item) => new ArtistCard(item)),
      }),
    });
  }
}
