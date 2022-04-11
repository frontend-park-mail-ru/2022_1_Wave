import VirtualElement from '../../modules/VDom/VirtualElement';
import VDom from '../../modules/VDom';
import Sidebar from './Sidebar/Sidebar';
import Player from './Player/Player';
import '../../index.css';
import './Page.scss';
import { PlayerClass } from '../../modules/Media/player';
import { Store } from '../../modules/Store/store';
import { ContextType, IContextType } from '../../modules/VDom/Context';
import { IStore } from '../../modules/Store/types';
import { connect } from '../../modules/Connect';
import rootReducer from '../../modules/Reducers';
import {getPopularAction} from '../../actions/Album';
import { IProps } from '../../modules/VDom/Interfaces';

class Page extends VDom.Component {
  // constructor(props:IProps) {
  //   super(props);
  //   this.state = {};
  // }
  didMount() {
    this.props.getPlaylist();
  }

  render = (): VirtualElement => {
    // const player = new PlayerClass();
    const { content, isAuthorized } = this.props;
    //console.log('hey', this.props);
    return (
      <div class="page">
        <Sidebar isAuthorized={isAuthorized}/>
        <div class="content">
          {content}
        </div>
        {/* <Player player={player}/> */}
      </div>
    );
  };
}

const mapStateToProps = (state: any) => {
  return ({
    playlist: {},
    something: {},
  });
};

const mapDispatchToProps = (dispatch:any) => {
  return ({
    getPlaylist: () => {
      dispatch(getPopularAction);
    },
  });
};

const PageConnected = connect(mapStateToProps, mapDispatchToProps)(Page);
export default PageConnected;
