import App from '/components/App/App.js';

const root = document.querySelector('#root');
const app = new App({ parent: root });
app.mount(root);
