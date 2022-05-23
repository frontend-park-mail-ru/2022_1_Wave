import VDom from '@rflban/vdom';
import App from './components/App/App';
import User from './models/User';
import Router from './modules/Router/Router';
import { StoreContext } from './modules/Connect';
import configureStore from './store';
import Notifier from './components/common/Notifier/Notifier';
import '@rflban/waveui/dist/default-dark';
import '@rflban/waveui/dist/styles';

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

const worker = new SharedWorker('/worker.js');
worker.port.start();

worker.port.onmessage = event => {
  console.log('worker msg!:',event.data)
};

worker.port.onmessageerror = ev => console.log('error worker!',ev);
console.log('worker start',worker);

User.getCSRFToken().then((): void => {
  VDom.render(
    <Router>
      <StoreContext.Provider value={store}>
        <Notifier errActiveTime={3} successActiveTime={2} />
        <App />
      </StoreContext.Provider>
    </Router>,
    document.getElementById('root')!,
  );
});
