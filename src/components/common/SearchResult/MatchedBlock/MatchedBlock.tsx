import VDom from '@rflban/vdom';
import {Caption, Divider} from "@rflban/waveui/dist";
import { Map } from '../../../../modules/Store/types';
import './MatchedBlock.scss';
import Link from '../../../../modules/Router/Link2';
import { config } from '../../../../modules/Client/Client';

interface MatchedBlockProps {
  array: Array<Map>;
  type: string;
  title: string;
  drop?: (_e:Event) => void;
}

export default class MatchedBlock extends VDom.Component<MatchedBlockProps> {
  render = (): VDom.VirtualElement => (
    <div class="matched">
      <Caption class="matched-title" align='left'>
        {this.props?.title ?? ''}
      </Caption>
      <Divider/>
      <div onclick={this.props.drop} class="text matched-list">
        {this.props.array.map((v) => (
          <Link
            to={`/${this.props.type !== 'track' ? this.props.type : 'album'}/${
              v.cover.split('_')[1].split('.')[0]
            }`}
            class="text matched-element"
          >
            <img
              class="element-cover"
              alt={`${v.title ?? v.name}`}
              src={config.files + v.cover}
            ></img>
            <div class="element-name">{v.title ?? v.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
