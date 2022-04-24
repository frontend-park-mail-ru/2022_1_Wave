// eslint-disable-next-line max-classes-per-file
// noinspection RequiredAttributes

import VDom from './modules/VDom';
import App from './components/App/App';
import User from './models/User';
import Router from './modules/Router/Router';
import { StoreContext } from './modules/Connect';
import configureStore from './store';

const store = configureStore();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js', { scope: '/' })
    .then((registration) => {
      console.log('sw available on scope:', registration.scope);
    })
    .catch((err) => {
      console.error(err);
    });
}

User.getCSRFToken().then((): void => {
  VDom.render(
    <Router>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </Router>,
    document.getElementById('root')!,
  );
});
