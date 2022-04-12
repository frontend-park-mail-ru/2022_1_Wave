import VirtualElement from '../../modules/VDom/VirtualElement';
import VDom from '../../modules/VDom';
import Sidebar from './Sidebar/Sidebar';
import Player from './Player/Player';
import '../../index.css';
import './Page.scss';
import { Map } from '../../modules/Store/types';
import { connect } from '../../modules/Connect';
import { trackGetPopular } from '../../actions/Track';
import { IProps } from '../../modules/VDom/Interfaces';

class Page extends VDom.Component {
  constructor(props: IProps) {
    super(props);
    this.props.getPlaylist();
    this.state = {
      contentHeight: 0,
    };
  }

  didUpdate():void {
    const contentHeight:number = document.getElementsByClassName('content')[0] ? document.getElementsByClassName('content')[0].clientHeight : 0;
    if (this.state.contentHeight !== contentHeight) {
      this.setState({ contentHeight });
    }
  }

  render = (): VDom.VirtualElement => {
    const { content, isAuthorized } = this.props;
    return (
      <div class="page" style={{ height: `${this.state.contentHeight.toString()}px` }}>
        <Sidebar playlist={this.props.playlist} isAuthorized={isAuthorized}/>
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

const mapStateToProps = (state: any): Map => ({
  playlist: state.tracksPopular ? state.tracksPopular.popular : null,
  something: state.tracksPopular,
});

const mapDispatchToProps = (dispatch:any):Map => ({
  getPlaylist: ():void => {
    dispatch(trackGetPopular);
  },
});

const PageConnected = connect(mapStateToProps, mapDispatchToProps)(Page);
export default PageConnected;
