import VirtualElement from '../../modules/VDom/VirtualElement';
import VDom from '../../modules/VDom';
import Sidebar from './Sidebar/Sidebar';
import Player from './Player/Player';
import '../../index.css';
import './Page.scss';
import { PlayerClass } from '../../modules/Media/player';
import { Map } from '../../modules/Store/types';
import { connect } from '../../modules/Connect';
import { trackGetPopular } from '../../actions/Track';
import { IProps } from '../../modules/VDom/Interfaces';

class Page extends VDom.Component {
  constructor(props:IProps) {
    super(props);
    this.props.getPlaylist();
  }

  render = (): VirtualElement => {
    const { content, isAuthorized } = this.props;
    return (
      <div class="page">
        <Sidebar isAuthorized={isAuthorized}/>
        <div class="content">
          {content}
        </div>
        { this.props.playlist ? (
          <Player playlist={this.props.playlist}></Player>
        ) : ''
        }
      </div>
    );
  };
}

const mapStateToProps = (state: any):Map => ({
  playlist: state.tracksPopular ? state.tracksPopular.popular : null,
  something: state.tracksPopular,
});

const mapDispatchToProps = (dispatch:any):Map => ({
  getPlaylist: () => {
    dispatch(trackGetPopular);
  },
});

const PageConnected = connect(mapStateToProps, mapDispatchToProps)(Page);
export default PageConnected;
