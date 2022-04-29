import { IComponentPropsCommon } from '../../../../modules/VDom/IComponentProps';
import { Map } from '../../../../modules/Store/types';
import VDom from '../../../../modules/VDom';
import './MatchedBlock.scss';
import Link from "../../../../modules/Router/Link";
import {config} from "../../../../modules/Client/Client";

interface MatchedBlockProps extends IComponentPropsCommon {
  array: Array<Map>;
  type: string;
  title: string;
  drop: () => void;
}

export default class MatchedBlock extends VDom.Component<MatchedBlockProps> {
  render = (): VDom.VirtualElement =>(
    <div class="matched">
      <div class="text matched-title"> {this.props?.title ?? ''} </div>
      <div onclick={this.props.drop} class="text matched-list">
        {this.props.array.map((v) => (
          <Link to={`/${this.props.type !== 'track' ? this.props.type : 'album'}/${v.cover.split('_')[1].split('.')[0]}`} as='div' class="text matched-element">
            <img class="element-cover" alt={`${v.title ?? v.name}`} src={config.files + v.cover}></img>
            <div class="element-name">{v.title ?? v.name}</div>
          </Link>
        ))}
      </div>
    </div>
  )

}
