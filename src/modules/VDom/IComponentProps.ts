import VirtualElement from './VirtualElement';
import StringWrapper from './StringWrapper';
import Ref from './Ref';

export interface IComponentProps {
  parentDomNode: HTMLElement;
  leftSibling: HTMLElement;
  vNode: VirtualElement;
  children: Array<VirtualElement | StringWrapper>;
  ref?: Ref;
}
