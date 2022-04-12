import VDom from './index';
import type { IComponentProps } from './IComponentProps';

export type ContextType<T> = {
  Provider: Function;
  defaultValue: T;
};

export const createContext = <T,>(defaultValue: T): ContextType<T> => {
  interface ProviderProps extends IComponentProps {
    value: T;
  }

  class Provider extends VDom.Component<ProviderProps> {
    render = (): VDom.VirtualElement => <>{this.props.children}</>;
  }

  return {
    Provider,
    defaultValue,
  };
};
