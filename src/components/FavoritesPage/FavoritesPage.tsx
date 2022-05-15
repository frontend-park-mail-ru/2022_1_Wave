import VDom from '@rflban/vdom';
import {
  Button,
  Headline,
  Subhead,
} from '@rflban/waveui';
import '../../index.css';
import './FavoritesPage.scss';
import { Map } from '../../modules/Store/types';
import { connect } from '../../modules/Connect';
import { config } from '../../modules/Client/Client';
import { ITrack } from '../../modules/Media/media';
import { setTrack, setTracks } from '../../actions/Playlist';
import { startPlay } from '../../actions/Player';
import PagePlaylist from '../common/PagePlaylist/PagePlaylist';
import { getFavorites } from "../../actions/Favorites";
import TracksContainer from '../common/TracksContainer/TracksContainer';
import { mainMobileScreen } from '../../mediaQueries';
import Redirect from '../../modules/Router/Redirect';

class PlaylistPage extends VDom.Component<any, any> {
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
    this.runTrack = this.runTrack.bind(this);
    this.setState({
      smallScreen: mainMobileScreen.matches,
    });
  }

  didMount(): void {
    mainMobileScreen.addEventListener('change', this.mediaSmallScreenhandler);
    this.props.getFavorites();
  }

  addFavoritesToPlayer = (_e: MouseEvent): void => {
    this.props.setTracks(this.props.favorites);
    this.props.runMusic();
  }

  tracksClickHandler = (_e: MouseEvent): void => {
    this.props.setTracks(this.props.favorites);
  }

  runTrack(track: ITrack): (_e: Event) => void {
    return (e: Event) => {
      e.preventDefault();
      this.props.setTrackFromPlaylist(track);
      this.props.runMusic();
    };
  }

  render = (): VDom.VirtualElement => {
    if (this.props.userStatus === 'unauthorized') {
      return <Redirect to="/login" />;
    }
    if (this.props.userStatus === 'pending') {
      return <></>;
    }

    const { favorites } = this.props;

    if (!favorites) {
      return <></>;
    }

    const cover = favorites?.[0] ? favorites[0].cover : null;

    return (
      <div class="waveFavoritesPage">
        <div
          class="waveFavoritesPage__cover"
          style={{
            'background-image': `linear-gradient(180deg, rgba(1, 208, 234, 0.2) 0%, rgba(0, 0, 0, 0) 48.44%),
    linear-gradient(180deg, rgba(11, 18, 32, 0.7) 0%, rgba(11, 18, 32, 0.9) 72.92%, #0B1220 93.23%),url(${
      cover ? config.files + cover : ''
      })`,
          }}
        />
        <div class="waveFavoritesPage__wrapper">
          <div class="waveFavoritesPage__header">
            <Subhead align="left">
              <p class="waveFavoritesPage__label">
                Your
              </p>
            </Subhead>
            <Headline align="left">
              Favorites
            </Headline>
            <Button
              class="waveFavoritesPage__play"
              size={this.state.smallScreen ? 'm' : 's'}
              stretched={this.state.smallScreen}
              onClick={this.addFavoritesToPlayer}
            >
              Play
            </Button>
          </div>

          <Subhead align="left" class="waveFavoritesPage__songs-label">
            Songs
          </Subhead>

          <TracksContainer tracks={favorites} onTrackRun={this.tracksClickHandler} />
        </div>
      </div>
    );

    return (
      <div class="playlist-page">
        <div
          class="playlist-page__main"
          style={{
            'background-image': `linear-gradient(180deg, rgba(1, 208, 234, 0.2) 0%, rgba(0, 0, 0, 0) 48.44%),
    linear-gradient(180deg, rgba(11, 18, 32, 0.7) 0%, rgba(11, 18, 32, 0.9) 72.92%, #0B1220 93.23%),url(${
      cover ? config.files + cover : ''
      })`,
          }}
        >
          <div class="playlist-page__playlist">
            <div class="text playlist__main">
              Playlist
              <div class="playlist__name">Favorites</div>
              <div class="playlist__controls">
                <div onclick={this.addPlaylistToPlayer(favorites)} class="button controls__btn-play">
                  <div class="text">Play</div>
                </div>
              </div>
            </div>
          </div>
          <div class="playlist-page__popular">
            <div class="text playlist__title">Songs</div>
            <PagePlaylist runTrack={this.runTrack} playlist={favorites}>
              {/* <div class="playlist-context"> */}
              {/*  <div class="text context__item">A</div> */}
              {/*  <div class="text context__item">B</div> */}
              {/* </div> */}
            </PagePlaylist>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state: any): Map => ({
  userStatus: state.userStatus,
  cover: state.albumCover ? state.albumCover : null,
  favorites: state.favorites,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  getFavorites: (): void => {
    dispatch(getFavorites());
  },
  setTracks: (tracks: ITrack[]): void => {
    dispatch(setTracks(tracks));
  },
  runMusic: (): void => {
    dispatch(startPlay);
  },
  setTrackFromPlaylist: (track: ITrack): void => {
    dispatch(setTrack(track));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);
