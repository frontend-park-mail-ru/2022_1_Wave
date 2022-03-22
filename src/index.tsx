import { createElement } from 'factory';
import App from './components/App/App';


document.getElementById('root').appendChild(<App name="Faris" />);

// User.getCSRFToken()
//   .then(() => {
//     const root = document.querySelector('#root');
//     const app = new App();
//     app.mount(root);
//   });
