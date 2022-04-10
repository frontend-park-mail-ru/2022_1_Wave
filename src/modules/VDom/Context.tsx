import VDom from './index';
import Component, { IComponentProps } from './Component';
import Fragment from './Fragment';

export type ContextType<T> = {
  Provider: Function,
  defaultValue: T,
}

export const createContext = <T, >(defaultValue: T): ContextType<T> => {
  interface ProviderProps extends IComponentProps {
    value: T;
  }

  class Provider extends Component<ProviderProps> {
    render = () => (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }

  return {
    Provider,
    defaultValue,
  };
};
