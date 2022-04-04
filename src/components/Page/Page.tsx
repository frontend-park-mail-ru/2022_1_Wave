import Component from '../../modules/VDom/Component';
import VirtualElement from '../../modules/VDom/VirtualElement';
import VDom from '../../modules/VDom';
import Navbar from '../common/Navbar/Navbar';
import { IProps } from '../../modules/VDom/Interfaces';
import Sidebar from './Sidebar/Sidebar';
import Player from './Player/Player';
import '../../index.css';
import './Page.scss';
import Homepage from '../Homepage/Homepage';
import { PlayerClass } from '../../modules/Media/player';

export default class Page extends Component {
  constructor(props:IProps) {
    super(props);
    this.state = {
      content: <div/>,
    };
  }

  didMount():void {
    const someel = <Homepage/>;
    this.setState({ content: someel });
  }

  render = (): VirtualElement => {
    const player = new PlayerClass();

    return (
      <div className="page">
        <Sidebar/>
        <div className="content">
          {this.state.content}
        </div>
        {/*<Player player={player}/>*/}
      </div>
    );
  };
}
