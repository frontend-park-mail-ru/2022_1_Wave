import Component from '/modules/Component/Component.js';
import CarouselRow from '/components/CarouselRow/CarouselRow.js';
import AlbumCard from '/components/AlbumCard/AlbumCard.js';
import ArtistCard from '/components/ArtistCard/ArtistCard.js';

export default class Popular extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['Popular.hbs'];
  }

  render() {
    return this.#template({
      albums: new CarouselRow({
        children: [
          { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/album.jpeg' },
          { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/album.jpeg' },
          { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/album.jpeg' },
          { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/album.jpeg' },
          { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/album.jpeg' },
          { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/album.jpeg' },
          { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/album.jpeg' },
          { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/album.jpeg' },
          { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/album.jpeg' },
          { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/album.jpeg' },
          { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/album.jpeg' },
          { title: 'Children of Bodom', artist: 'Hexed', cover: 'assets/album.jpeg' },
        ].map((item) => new AlbumCard(item)),
      }),
      artists: new CarouselRow({
        children: [
          { name: 'Lady Gaga', cover: 'assets/artist.jpeg' },
          { name: 'Lady Gaga', cover: 'assets/artist.jpeg' },
          { name: 'Lady Gaga', cover: 'assets/artist.jpeg' },
          { name: 'Lady Gaga', cover: 'assets/artist.jpeg' },
          { name: 'Lady Gaga', cover: 'assets/artist.jpeg' },
          { name: 'Lady Gaga', cover: 'assets/artist.jpeg' },
          { name: 'Lady Gaga', cover: 'assets/artist.jpeg' },
          { name: 'Lady Gaga', cover: 'assets/artist.jpeg' },
          { name: 'Lady Gaga', cover: 'assets/artist.jpeg' },
          { name: 'Lady Gaga', cover: 'assets/artist.jpeg' },
          { name: 'Lady Gaga', cover: 'assets/artist.jpeg' },
          { name: 'Lady Gaga', cover: 'assets/artist.jpeg' },
          { name: 'Lady Gaga', cover: 'assets/artist.jpeg' },
          { name: 'Lady Gaga', cover: 'assets/artist.jpeg' },
          { name: 'Lady Gaga', cover: 'assets/artist.jpeg' },
        ].map((item) => new ArtistCard(item)),
      }),
    });
  }
}
