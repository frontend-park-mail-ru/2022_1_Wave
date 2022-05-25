import './EditPlaylist.scss';
import VDom from '@rflban/vdom';
import {
  Button,
  FormItem,
  Input, Subhead,
} from '@rflban/waveui';
import { connect } from '../../../modules/Connect';
import { mainMobileScreen } from '../../../mediaQueries';
import * as UserPlaylist from '../../../actions/UserPlaylist';

const validatePlaylistName = (value: string): boolean => {
  const reg = /^[a-zа-я0-9_ ]{1,32}$/;
  return reg.test(value.toLowerCase().trim());
}

interface EditPlaylistProps {
  id: number;
  editPlaylist: (_id: number, _title: string) => void;
  onCancel?: () => void;
}

interface EditPlaylistState {
  smallScreen: boolean;
}

class EditPlaylist extends VDom.Component<EditPlaylistProps, EditPlaylistState> {
  state = {
    smallScreen: mainMobileScreen.matches,
  }

  private inputRef = new VDom.Ref<FormItem>();

  mediaSmallScreenHandler = (e: MediaQueryListEvent): void => {
    this.setState({
      smallScreen: e.matches,
    });
  }

  didMount(): void {
    mainMobileScreen.addEventListener('change', this.mediaSmallScreenHandler);
  }

  willUmount(): void {
    mainMobileScreen.removeEventListener('change', this.mediaSmallScreenHandler);
  }

  handleSubmit = (e: Event): void => {
    e.preventDefault();

    const { instance: titleInput } = this.inputRef;

    if (titleInput.check()) {
      this.props.editPlaylist(this.props.id, titleInput.value);
      titleInput.reset();
      this.props.onCancel?.();
    }
  }

  cancelHandler = (e: MouseEvent): void => {
    e.preventDefault();
    this.props.onCancel?.();
  }

  render(): VDom.VirtualElement {
    const {
      smallScreen,
    } = this.state;

    return (
      <div class="waveEditPlaylist">
        <Subhead size={smallScreen ? 'l' : 'm'} align={smallScreen ? 'center' : 'left'}>
          Edit playlist
        </Subhead>
        <form className="waveEditPlaylist__playlist-form" onSubmit={this.handleSubmit}>
          <FormItem
            as={Input}
            ref={this.inputRef}
            label="Playlist name"
            error="Only 1-32 of letters, numbers or _ are allowed"
            checker={validatePlaylistName}
            placeholder="Playlist new name"
          />
          <div class="waveEditPlaylist__controls">
            <Button
              onClick={this.cancelHandler}
              mode="secondary"
              size={smallScreen ? 'm' : 's'}
              stretched={smallScreen}
            >
              Cancel
            </Button>
            <Button
              mode="primary"
              size={smallScreen ? 'm' : 's'}
              stretched={smallScreen}
            >
              Edit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (_state: any): any => ({
});

const mapDispatchToProps = (dispatch: Function): any => ({
  editPlaylist: (id: number, title: string): void => dispatch(UserPlaylist.editPlaylist(id, title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPlaylist);
