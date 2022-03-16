import {createElement, appendChild} from 'engine';
import App from './components/App/App';
//import User from '/actions/User.js';

document.getElementById('root').appendChild(<App name="foo" />);

// User.getCSRFToken()
//   .then(() => {
//     const root = document.querySelector('#root');
//     const app = new App();
//     app.mount(root);
//   });
