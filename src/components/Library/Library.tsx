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
import { mainSmallScreen } from '../../mediaQueries';

const validatePlaylistName = (value: string): boolean => {
  const reg = /^[a-zа-я0-9_ ]{1,16}$/;
  return reg.test(value.toLowerCase().trim());
}

interface LibraryProps {
  playlists: any;
  getPlaylists: Function;
  createPlaylist: (_title: string) => void;
  userStatus: string;
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
    if (this.props.userStatus === 'unauthorized') {
      return <Redirect to="/login" />;
    }
    if (this.props.userStatus === 'pending') {
      return <></>;
    }

    const { smallScreen } = this.state;
    const { playlists } = this.props;

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
            {playlists &&
              Object.entries(playlists).map(([_,p]:[_:string,p:Map]) => (
                <Link to={`/playlists/${p.id}`}>
                  <div class="waveLibrary__link">
                    <ImageCard
                      src={playlistPlaceholder}
                      title={p.title}
                      direction="row"
                      icon={<PlaylistIcon style={{ height: '25%', }}/>}
                    />
                  </div>
                </Link>
              ))
            }
          </div>
          <form class="waveLibrary__playlist-form" onSubmit={this.handleSubmit}>
            <FormItem
              as={Input}
              ref={this.inputRef}
              label="New playlist"
              error="Only 1-16 of latin letters, numbers or _ are allowed"
              checker={validatePlaylistName}
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
  playlists: state.userPlaylists,
  userStatus: state.userStatus,
});

const mapDispatchToProps = (dispatch: Function): Map => ({
  getPlaylists: () => UserPlaylist.getPlaylists()(dispatch),
  createPlaylist: (title: string) => UserPlaylist.createPlaylist(title)(dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(Library);
