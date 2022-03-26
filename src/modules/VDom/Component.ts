import VirtualElement from './VirtualElement';

export default abstract class Component<Snapshot = any> {
  abstract render(): VirtualElement;

  didMount(): void {}

  didUpdate(snapshot: Snapshot | null): void {}

  willUmount(): void {}

  makeSnapshot(): Snapshot | null { return null; }
}
