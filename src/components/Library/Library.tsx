import VDom from '@rflban/vdom';
import {
  Button, FormItem,
  Headline, ImageCard, Input, PlaylistIcon,
} from '@rflban/waveui';
import playlistPlaceholder from '../../assets/playlist_placeholder.png';
import favoritesPlaceholder from '../../assets/favorites_placeholder.png';
import { Map } from '../../modules/Store/types';
import { connect } from '../../modules/Connect';
import './Library.scss'
import Redirect from '../../modules/Router/Redirect';
import Link from '../../modules/Router/Link2';
import * as UserPlaylist from '../../actions/UserPlaylist';
import { validateUsername } from '../../utils/User';
import { mainSmallScreen } from '../../mediaQueries';

interface LibraryProps {
  isAuth: boolean;
  playlists: any;
  getPlaylists: Function;
  createPlaylist: (_title: string) => void;
}

interface LibraryState {
  smallScreen: boolean;
}

class Library extends VDom.Component<LibraryProps, LibraryState> {
  private inputRef = new VDom.Ref<FormItem>();

  state = {
    smallScreen: mainSmallScreen.matches,
  }

  handleSubmit = (e: Event): void => {
    e.preventDefault();

    const { instance: titleInput } = this.inputRef;

    if (titleInput.check()) {
      this.props.createPlaylist(titleInput.value);
      titleInput.reset();
    }
  }

  mediaSmallScreenHandler = (e: MediaQueryListEvent): void => {
    this.setState({
      smallScreen: e.matches,
    });
  }

  willUmount(): void {
    mainSmallScreen.removeEventListener('change', this.mediaSmallScreenHandler);
  }

  didMount(): void {
    mainSmallScreen.addEventListener('change', this.mediaSmallScreenHandler);
    this.props.getPlaylists();
  }

  render(): VDom.VirtualElement {
    // if (!this.props.isAuth) {
    //   return <Redirect to="/login" />;
    // }

    const { smallScreen } = this.state;

    return (
      <div class="waveLibrary">
        <Headline size="s">Library</Headline>
        <div class="waveLibrary__inner">
          <div class="waveLibrary__playlists">
            <Link to="/favorites">
              <div class="waveLibrary__link">
                <ImageCard
                  src={favoritesPlaceholder}
                  title="Favorites"
                  direction="row"
                  icon={<PlaylistIcon style={{ height: '25%', }}/>}
                />
              </div>
            </Link>
            {
              (Array(20).fill('').map(() => (
                <Link to="/favorites">
                  <div class="waveLibrary__link">
                    <ImageCard
                      src={playlistPlaceholder}
                      title="Favorites"
                      direction="row"
                      icon={<PlaylistIcon style={{ height: '25%', }}/>}
                    />
                  </div>
                </Link>
              )))
            }
          </div>
          <form class="waveLibrary__playlist-form" onSubmit={this.handleSubmit}>
            <FormItem
              as={Input}
              ref={this.inputRef}
              label="New playlist"
              error="Only 3-16 of latin letters, numbers or _ are allowed"
              checker={validateUsername}
              placeholder="New playlist name"
            />
            <Button
              mode="outline"
              size={smallScreen ? 'm' : 's'}
              stretched={smallScreen}
            >
              Create new playlist
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any): Map => ({
  isAuth: state.user?.id != null,
  playlists: state.userPlaylists,
});

const mapDispatchToProps = (dispatch: Function): Map => ({
  getPlaylists: () => UserPlaylist.getPlaylists()(dispatch),
  createPlaylist: (title: string) => UserPlaylist.createPlaylist(title)(dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(Library);
