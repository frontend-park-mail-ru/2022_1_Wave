import { IComponentPropsCommon } from '../VDom/IComponentProps';

export default interface RouteProps extends IComponentPropsCommon {
  to: string;
  exact?: boolean;
};
