const internalChannelName = 'syncChannel';

const websocketUrl = 'ws://localhost/api/v1/';

let ws;

const internalChannel = new BroadcastChannel(internalChannelName);

const websocketOnMessage = (eMsg) => {
  console.log('ws data:',eMsg.data);
}

const initWebsocket = () => {
  ws = new WebSocket(websocketUrl);
  ws.onopen = () =>
    internalChannel.postMessage({type:'WSState', payload: ws.readyState});
  ws.onclose = () =>
    internalChannel.postMessage({type:'WSState', payload: ws.readyState});
  ws.onmessage = websocketOnMessage;
}

const internalChannelOnMessage = (eMsg ) => {
  const {type,payload} = eMsg.data
  console.log('shared worker internal type:',type,'data:',payload);
  switch (type){
  case 'WSCommand':
    switch (payload){
    case 'connect':
      initWebsocket();
      break;
    case 'disconnect':
      ws.close();
      break;
    default:
    }
    break;
  case 'playlist':
    if(ws.readyState === 1)
      ws.send('hui');
    break;
  case 'position':
    if(ws.readyState === 1)
      ws.send('hui');
    break;
  case 'currentTime':
    if(ws.readyState === 1)
      ws.send('hui');
    break;
  default:
  }


}

internalChannel.onmessage = internalChannelOnMessage;

self.onconnect = (event) => {
  console.log('hui hui',event)
  initWebsocket();
}
