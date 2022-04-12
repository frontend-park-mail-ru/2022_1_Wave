import VirtualElement from './VirtualElement';
import StringWrapper from './StringWrapper';
import Ref from './Ref';

export interface IComponentProps {
  children: Array<VirtualElement | StringWrapper>;
  ref?: Ref;
}
