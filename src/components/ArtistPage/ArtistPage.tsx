import VDom from '@rflban/vdom';
import { AlbumIcon, Button, Headline, HorizontalScroll, ImageCard, Subhead } from '@rflban/waveui';
import '../../index.css';
import './ArtistPage.scss';
import CarouselRow from '../common/CarouselRow/CarouselRow';
import AlbumCard from '../common/AlbumCard/AlbumCard';
import { Map } from '../../modules/Store/types';
import { artistGetById, artistGetPopularById } from '../../actions/Artist';
import { connect } from '../../modules/Connect';
import RouterContext from '../../modules/Router/RouterContext';
import RouteNavigator from '../../modules/Router/RouteNavigator';
import { config } from '../../modules/Client/Client';
import { ITrack } from '../../modules/Media/media';
import { setTrack, setTracks } from '../../actions/Playlist';
import {setPosition, startPlay} from '../../actions/Player';
import PagePlaylist from '../common/PagePlaylist/PagePlaylist';
import {addTrackPlaylist, getPlaylists} from "../../actions/UserPlaylist";
import TracksContainer from '../common/TracksContainer/TracksContainer';
import Link from '../../modules/Router/Link2';
import { mainMobileScreen } from '../../mediaQueries';

class ArtistPageComponent extends VDom.Component<any, any, null, RouteNavigator> {
  static contextType = RouterContext;

  mediaSmallScreenhandler = (e: MediaQueryListEvent): void => {
    this.setState({
      smallScreen: e.matches,
    });
  }

  willUmount(): void {
    mainMobileScreen.removeEventListener('change', this.mediaSmallScreenhandler);
  }

  constructor(props: any) {
    super(props);
    this.getArtist = this.getArtist.bind(this);
    this.getTracks = this.getTracks.bind(this);
    this.state = {
      albumLikes: 12511,
      isLiked: false,
      isShowPlaylistChoose: false,
      smallScreen: mainMobileScreen.matches,
    };

    this.setLikeToArtist = this.setLikeToArtist.bind(this);
    this.addPopularToPlaylist = this.addPopularToPlaylist.bind(this);
    this.showPlaylists = this.showPlaylists.bind(this);
    this.unshowPlaylists = this.unshowPlaylists.bind(this);
  }

  showPlaylists():void {
    this.setState({isShowPlaylistChoose:true});
  }

  unshowPlaylists():void {
    this.setState({isShowPlaylistChoose:false});
  }

  didMount(): void {
    mainMobileScreen.addEventListener('change', this.mediaSmallScreenhandler);
    this.getArtist();
    this.getTracks();
    this.props.getPlaylists();
  }

  didUpdate(): void {
    this.getArtist();
    this.getTracks();
  }

  getArtist(): void {
    if (!this.props.artist || !this.props.artist[this.context.params.slug]) {
      this.props.getArtist(this.context.params.slug);
    }
  }

  getTracks(): void {
    if (!this.props.popularTracks || !this.props.popularTracks[this.context.params.slug]) {
      this.props.getArtistPopularTracks(this.context.params.slug);
    }
  }

  setLikeToArtist(): void {
    let likes = this.state.albumLikes;
    likes = this.state.isLiked ? likes - 1 : likes + 1;
    const isLiked = !this.state.isLiked;
    this.setState({ albumLikes: likes, isLiked });
  }

  addPopularToPlaylist(_e: Event): void {
    this.props.setArtistPlaylist(this.props.popularTracks[this.context.params.slug]);
    this.props.setPos(0);
    this.props.runMusic();
  }

  tracksClickHandler = (_e: MouseEvent): void => {
    this.props.setArtistPlaylist(this.props.popularTracks[this.context.params.slug]);
  }

  render = (): VDom.VirtualElement => {
    const { slug }: { slug: string } = this.context.params;
    if (!this.props.artist || !this.props.popularTracks) {
      return <></>;
    }
    const artist = this.props.artist[slug] ? this.props.artist[slug] : null;
    const popularTracks = this.props.popularTracks[slug] ? this.props.popularTracks[slug] : null;
    if (!artist || !popularTracks) {
      return <></>;
    }

    return (
      <div class="waveArtistPage">
        <div
          class="waveArtistPage__cover"
          style={{
            'background-image': `linear-gradient(180deg, rgba(1, 208, 234, 0.2) 0%, rgba(0, 0, 0, 0) 48.44%),
    linear-gradient(180deg, rgba(11, 18, 32, 0.7) 0%, rgba(11, 18, 32, 0.9) 72.92%, #0B1220 93.23%),url(${
      config.files + artist.cover
      })`,
          }}
        />
        <div class="waveArtistPage__wrapper">
          <div class="waveArtistPage__header">
            <Subhead align="left">
              <p class="waveArtistPage__label">
                Artist
              </p>
            </Subhead>
            <Headline align="left">
              {artist.name}
            </Headline>
            <Button
              class="waveArtistPage__play"
              size={this.state.smallScreen ? 'm' : 's'}
              stretched={this.state.smallScreen}
              onClick={this.addPopularToPlaylist}
            >
              Play
            </Button>
          </div>

          <Subhead align="left" class="waveArtistPage__songs-label">
            Popular songs
          </Subhead>

          <TracksContainer tracks={popularTracks} onTrackRun={this.tracksClickHandler} hideArtist />

          <div class="waveArtistPage__albums">
            <Subhead align="left" class="waveArtistPage__albums-label">
              Albums
            </Subhead>
            <HorizontalScroll controlsCenterOffset={57} leftOffset={40} rightOffset={40}>
              {
                Object.entries(artist.albums).map(([_, v]: [k: string, v: Map]) =>
                  <ImageCard
                    zoom
                    src={config.files + v.cover}
                    title={
                      <Link to={`/album/${v.id}`}>
                        {v.title}
                      </Link>
                    }
                    size="l"
                    imageWrapper={(img): VDom.VirtualElement => (
                      <Link to={`/album/${v.id}`}>
                        {img}
                      </Link>
                    )}
                  />
                )
              }
            </HorizontalScroll>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state: any): Map => ({
  artist: state.artist ? state.artist : null,
  popularTracks: state.artistPopularTracks ? state.artistPopularTracks : null,
  playlists: state.userPlaylists,

});

const mapDispatchToProps = (dispatch: any): Map => ({
  getArtist: (id: string): void => {
    dispatch(artistGetById(id));
  },
  setPos: (num: number): void => {
    dispatch(setPosition(num));
  },
  getPlaylists: (): void => {
    dispatch(getPlaylists());
  },
  getArtistPopularTracks: (id: string): void => {
    dispatch(artistGetPopularById(id));
  },
  setArtistPlaylist: (tracks: ITrack[]): void => {
    dispatch(setTracks(tracks));
  },
  setSingleTrack: (track: ITrack): void => {
    dispatch(setTrack(track));
  },
  runMusic: (): void => {
    dispatch(startPlay);
  },
  setTrackFromArtist: (track: ITrack): void => {
    dispatch(setTrack(track));
  },
  addTrack: ({trackid,playlistid}: {trackid:number,playlistid:number}): void => {
    dispatch(addTrackPlaylist({trackID: trackid,playlistID: playlistid}))
  }
});

const ArtistPage = connect(mapStateToProps, mapDispatchToProps)(ArtistPageComponent);
export default ArtistPage;
