import VDom from '../VDom';
import { IStore, Map } from '../Store/types';
import { Store } from '../Store/store';
import { createContext } from '../VDom/Context';

export const StoreContext = createContext<IStore>(null as unknown as IStore);

type ComponentConstructor<Props, State, Snapshot, ContextValue> = new (
  _props: Props,
) => VDom.Component<Props, State, Snapshot, ContextValue>;
type ConnectedConstructor<Pros, Snapshot> = ComponentConstructor<Pros, Map, Snapshot, Store>;
type WrappedToConnected<Props, State, Snapshot, ContextValue> = (
  _WrappedComponent: ComponentConstructor<Props, State, Snapshot, ContextValue>,
) => ConnectedConstructor<Props, Snapshot>;

export function connect<Props, State, Snapshot, ContextValue>(
  mapStateToProps: (_: Map) => Map,
  mapDispatchToProps: (_: Map) => Map,
): WrappedToConnected<Props, State, Snapshot, ContextValue> {
  return (
    WrappedComponent: ComponentConstructor<Props, State, Snapshot, ContextValue>,
  ): ConnectedConstructor<Props, Snapshot> => {
    class Connect extends VDom.Component<Props, Map, Snapshot, Store> {
      static contextType = StoreContext;

      private unsubscribe: () => void;

      constructor(props: Props) {
        super(props);
        this.state = this.context.getState();
      }

      didMount(): void {
        this.unsubscribe = this.context.subscribe((state: any): void => {
          this.setState(state);
        });
      }

      willUmount(): void {
        if (this.unsubscribe) {
          this.unsubscribe();
        }
      }

      render(): VDom.VirtualElement {
        const store = this.context;
        return (
          <WrappedComponent
            {...this.props}
            {...mapStateToProps(store.getState())}
            {...(mapDispatchToProps(store.dispatch) ?? null)}
          >
            {this.props.children}
          </WrappedComponent>
        );
      }
    }

    return Connect;
  };
}
