import {IComponentPropsCommon} from "@rflban/vdom/dist/IComponentProps";
import VDom from "@rflban/vdom";
import Link from "../../../../modules/Router/Link2";
import './LinkedTextButton.scss';

interface LinkedButtonProps extends IComponentPropsCommon{
    to:string,
    text:string,
    align?:string
}

export default class LinkedTextButton extends VDom.Component<LinkedButtonProps> {
  render = (): VDom.VirtualElement => {
    const {to,text} = this.props;
    let {align} = this.props;
    align = align || 'center';

    return (
      <div class="menu__button" style={{textAlign: align}}>
        <Link to={to} class="text button__text ">
          {text}
        </Link>
      </div>
    );
  }
}