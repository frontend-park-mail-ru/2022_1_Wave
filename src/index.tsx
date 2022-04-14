// eslint-disable-next-line max-classes-per-file
// noinspection RequiredAttributes

import VDom from './modules/VDom';
import App from './components/App/App';
import User from './models/User';

User.getCSRFToken().then((): Promise<any> => {
  return User.getUser();
}).catch().then(() => {
  VDom.render(<App />, document.getElementById('root')!);
});
