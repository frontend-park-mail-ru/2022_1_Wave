import Component from '../../../modules/VDom/Component';
import VirtualElement from '../../../modules/VDom/VirtualElement';
import '../../../index.css';
import './Popular.scss';
import CarouselRow from '../../common/CarouselRow/CarouselRow';
import AlbumCard from '../../common/AlbumCard/AlbumCard';
import ArtistCard from '../../common/ArtistCard/ArtistCard';
import VDom from '../../../modules/VDom';
import album from '../../../assets/playlist-track-icon-dummy.png';
import { Map } from '../../../modules/Store/types';
import { connect } from '../../../modules/Connect';
import { albumGetPopular } from '../../../actions/Album';
import { artistGetPopular } from '../../../actions/Artist';
import { IProps } from '../../../modules/VDom/Interfaces';
import artistPopular from '../../../reducers/artist';

class Popular extends VDom.Component {
  constructor(props: IProps) {
    super(props);
    this.props.getAlbums();
    this.props.getArtist();
    this.state = {
      artists: null,
      albums: null,
    };
  }

  didMount() {
    console.log('Popular:', this.props);
  }

  render = (): VDom.VirtualElement => {
    const artists = this.props.artists ? this.props.artists : null;
    if (this.state.playlist !== artists) {
      this.setState({ artists });
    }
    const albums = this.props.albums ? this.props.albums : null;
    if (this.state.playlist !== albums) {
      this.setState({ albums });
    }
    if (this.props.artists) {
      console.log(this.props.artists.map((v:any) => <ArtistCard cover={v.cover} name={v.name}/>));
    }
    // {this.props.artistPopular ? Array(this.props.artistPopular.popular).map((artist):VDom.VirtualElement => (
    //     <ArtistCard cover={artist.cover} name={artist.name}/>)) : null
    // }

    return (

      <div class="main__popular">

        <div class="main__popular__albums main__popular_slider-hidden">
          <div class="text main__popular__title">
                    Popular albums
          </div>
          <CarouselRow>
            <AlbumCard cover={album} title="eboi" artist="viva"/>
            <AlbumCard cover={album} title="eboi" artist="viva"/>
            <AlbumCard cover={album} title="eboi" artist="viva"/>
            <AlbumCard cover={album} title="eboi" artist="viva"/>
            <AlbumCard cover={album} title="eboi" artist="viva"/>
            <AlbumCard cover={album} title="eboi" artist="viva"/>
          </CarouselRow>
        </div>
        <div class="main__popular__artists main__popular_slider-hidden">
          <div class="text main__popular__title">
                    Popular artist
          </div>
          <CarouselRow>
            { this.props.artists ? this.props.artists.map((v:any) => <ArtistCard cover={v.cover} name={v.name}/>) : "" }
          </CarouselRow>
        </div>
      </div>
    );
  };
}
const mapStateToProps = (state: any):Map => ({
  artists: state.artistPopular ? state.artistPopular.popular : null,
  albums: state.albumPopular ? state.albumPopular.popular : null,
});

const mapDispatchToProps = (dispatch:any):Map => ({
  getArtist: ():void => {
    dispatch(artistGetPopular);
  },
  getAlbums: ():void => {
    dispatch(albumGetPopular);
  },
});

const PopularConnected = connect(mapStateToProps, mapDispatchToProps)(Popular);
export default PopularConnected;
