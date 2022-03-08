import App from '/components/App/App.js';
import User from '/actions/User.js';

User.getCSRFToken()
  .then(() => {
    const root = document.querySelector('#root');
    const app = new App({ parent: root });
    app.mount(root);
  });
