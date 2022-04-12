import Navbar from '../common/Navbar/Navbar';
import VDom from '../../modules/VDom';
import '../../index.css';
import './ArtistPage.scss';
import img from '../../assets/img.png';
import ArtistPlaylist from './ArtistPlaylist/ArtistPlaylist';
import CarouselRow from '../common/CarouselRow/CarouselRow';
import AlbumCard from '../common/AlbumCard/AlbumCard';
import album from '../../assets/playlist-track-icon-dummy.png';
import { Map } from '../../modules/Store/types';
import { artistGetById } from '../../actions/Artist';
import { connect } from '../../modules/Connect';
import { IProps } from '../../modules/VDom/Interfaces';
import RouterContext from '../../modules/Router/RouterContext';
import RouteNavigator from '../../modules/Router/RouteNavigator';

class ArtistPage extends VDom.Component<any, any, null, RouteNavigator> {
  static contextType = RouterContext;

  constructor(props: IProps) {
    super(props);
    console.log(this.props);
    this.getArtist = this.getArtist.bind(this);
    this.state = {
      albumLikes: 12511,
      isLiked: false,
    };
    this.setLikeToArtist = this.setLikeToArtist.bind(this);
  }

  didMount():void {
    this.getArtist();
  }

  didUpdate():void {
    this.getArtist();
  }

  getArtist():void {
    const { slug } : {slug:string} = this.context.params;
    if (!this.props.artist || !this.props.artist[slug]) {
      this.props.getArtist(slug);
    }
  }

  setLikeToArtist():void {
    let likes = this.state.albumLikes;
    likes = this.state.isLiked ? likes - 1 : likes + 1;
    const isLiked = !this.state.isLiked;
    this.setState({ albumLikes: likes, isLiked });
  }

  render = (): VDom.VirtualElement => {
    const { slug } : {slug:string} = this.context.params;
    if (!this.props.artist) {
      return (<div class="artist-page"/>);
    }
    const artist = this.props.artist[slug] ? this.props.artist[slug] : null;
    if (!artist) {
      return (<div class="artist-page"/>);
    }
    return (
      <div class="artist-page">
        <div class="artist-page__main" style={{ 'background-image': `url(${artist.cover})` }}>
          <Navbar isAuthorized={true}/>
          <div class="artist-page__artist">
            <div class="artist__related">
              <div class="text related__title">
                Related artists:
              </div>
              <span class="text related__names">
                    Lana Del Rey, Moby
              </span>
            </div>
            <div class="text artist__main">
              Artist
              <div class="artist__name">
                {artist.name}
              </div>
              <div class="artist__controls">
                <div class="button controls__btn-play">
                  <div class="text">Play</div>
                </div>
                <div class="text controls__likes">
                  <div onclick={this.setLikeToArtist} class={`${this.state.isLiked ? 'fa-solid' : 'fa-regular'} fa-heart likes__icon`}></div>
                  <div class="likes__num">{this.state.albumLikes}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="artist-page__popular">
          <div class="text artist__title">Popular songs</div>
          <ArtistPlaylist/>
        </div>
        <div class="artist-page__albums">
          <div class="text artist__title">Albums</div>
          <CarouselRow>
            { artist.albums ? artist.albums.map((v:any) => <AlbumCard cover={v.cover} title={v.title} artist={v.artist}/>) : '' }
          </CarouselRow>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state: any):Map => ({
  artist: state.artist ? state.artist : null,
});

const mapDispatchToProps = (dispatch:any):Map => ({
  getArtist: (id:string):void => {
    dispatch(artistGetById(id));
  },
});

const ArtistConnected = connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
export default ArtistConnected;
