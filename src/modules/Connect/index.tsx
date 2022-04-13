import VDom from '../VDom';
import { IProps } from '../VDom/Interfaces';
import { IStore, Map } from '../Store/types';
import { Store } from '../Store/store';
import { ContextType, createContext, IContextType } from '../VDom/Context';

export const StoreContext = createContext<IStore>(null);

// eslint-disable-next-line no-unused-vars,max-len,import/prefer-default-export
export const connect =
  (mapStateToProps: Map, mapDispatchToProps: Map) =>
    (WrappedComponent: new (props: any) => VDom.Component): void => {
    // eslint-disable-next-line no-unused-vars
      class Connect extends VDom.Component<any, any, any, Store> {
        static contextType = StoreContext;

        constructor(props: IProps) {
          super(props);
          this.state = this.context.getState();
        }

        didMount(): void {
          this.context.subscribe((state: any): void => {
            this.setState(state);
          });
        }

        render(): VDom.VirtualElement {
          const store = this.context;
          return (
            <WrappedComponent
              {...this.props}
              {...mapStateToProps(store.getState())}
              {...(store ? mapDispatchToProps(store.dispatch) : null)}
            />
          );
        }
      }
      return Connect;
    };
