import { createElement } from 'factory';
// import App from './components/App/App';
import patch from './modules/VDom/patchNode';
import VirtualElement from './modules/VDom/VirtualElement';

let counter = 0;

// document.getElementById('root').appendChild(<App name="Faris" />);
let vnode = new VirtualElement('div', [
  new VirtualElement('p', [counter.toString()]),
  new VirtualElement('div', []),
]);
const root = document.getElementById('root');
patch({
  oldVNode: null,
  newVNode: vnode,
  domNode: null,
  parentDom: root!,
  pos: 0,
});

setInterval(() => {
  counter += 1;

  const newVnode = new VirtualElement('div', [
    new VirtualElement('p', [counter.toString()]),
    new VirtualElement('div', []),
  ]);

  patch({
    oldVNode: vnode,
    newVNode: newVnode,
    domNode: root!.firstElementChild as HTMLElement,
    parentDom: root!,
    pos: 0,
  });

  vnode = newVnode;
}, 1000);

// User.getCSRFToken()
//   .then(() => {
//     const root = document.querySelector('#root');
//     const app = new App();
//     app.mount(root);
//   });
