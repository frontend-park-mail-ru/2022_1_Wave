import App from './components/App/App';
import  {createElement,appendChild} from 'factory';

document.getElementById('root').appendChild(<App name="foo" />);

// User.getCSRFToken()
//   .then(() => {
//     const root = document.querySelector('#root');
//     const app = new App();
//     app.mount(root);
//   });
