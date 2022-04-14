import VirtualElement from '../../modules/VDom/VirtualElement';
import VDom from '../../modules/VDom';
import Sidebar from './Sidebar/Sidebar';
import Player from './Player/Player';
import '../../index.css';
import './Page.scss';
import { Map } from '../../modules/Store/types';
import { connect } from '../../modules/Connect';
import { IProps } from '../../modules/VDom/Interfaces';
import PlayerConnected from './Player/Player';
import { getPopularTracks } from '../../actions/Playlist';

class Page extends VDom.Component {
  constructor(props: IProps) {
    super(props);
    this.props.getPlaylist();
  }

  render = (): VDom.VirtualElement => {
    const { content, isAuthorized } = this.props;
    return (
      <div class="page">
        <Sidebar playlist={this.props.playlist} isAuthorized={isAuthorized} />
        <div class="content">{content}</div>
        <PlayerConnected />
      </div>
    );
  };
}

const mapStateToProps = (state: any): Map => ({
  playlist: state.tracksPopular ? state.tracksPopular.popular : null,
  something: state.tracksPopular,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  getPlaylist: (): void => {
    dispatch(getPopularTracks);
  },
});

const PageConnected = connect(mapStateToProps, mapDispatchToProps)(Page);
export default PageConnected;
