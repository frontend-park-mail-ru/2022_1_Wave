const internalChannelName = 'syncChannel';

const websocketUrl = 'ws://localhost/api/v1/player-sync';

let ws;

const internalChannel = new BroadcastChannel(internalChannelName);

const websocketOnMessage = (eMsg) => {
  console.log('ws data:',eMsg.data);
}

const initWebsocket = () => {
  console.log('try to init worker:');
  if (ws instanceof WebSocket) {
    console.log('load exits');

    if (ws.readyState === WebSocket.OPEN){
      console.log('ws opened');
      internalChannel.postMessage({type:'WSState', payload: ws.readyState});
      return;
    }
    if (ws.readyState === WebSocket.CONNECTING){
      return;
    }
  }
  console.log('init new')
  ws = new WebSocket(websocketUrl);
  ws.onopen = () =>
      internalChannel.postMessage({type:'WSState', payload: ws.readyState});
  ws.onclose = () =>
      internalChannel.postMessage({type:'WSState', payload: ws.readyState});
  ws.onmessage = websocketOnMessage;
}

const internalChannelOnMessage = (eMsg ) => {
  const {type,payload} = eMsg.data
  console.log('type:',type,'data:',payload,'ws state:',
      ws.readyState,'const:',WebSocket.OPEN);
  switch (type){
    case 'WSCommand': {
      switch (payload) {
        case 'connect':
          if (ws.readyState === WebSocket.OPEN) {
            internalChannel.postMessage({type: 'WSState', payload: ws.readyState});
            break;
          }
          initWebsocket();
          break;
        case 'disconnect':
          if (ws.readyState === WebSocket.CLOSED) {
            internalChannel.postMessage({type: 'WSState', payload: ws.readyState});
            break;
          }
          ws.close();
          break;
        default:
      }
      break;
    }
    case 'playlist': {
      console.log('got playlist,',ws.readyState,'const:',WebSocket.OPEN)
      if (ws.readyState === WebSocket.OPEN) {

        const ids = payload.map((v) => v.id)
        console.log('recieved ids', ids)
        const msg = {
          type_push_state: "new_tracks_queue",
          tracks_queue: ids,
          time_state_update: new Date(),
        }
        console.log('created msg', msg)
        ws.send(msg);
      }
      break;
    }
    case 'position':
      if(ws.readyState === WebSocket.OPEN)
        ws.send('hui');
      break;
    case 'currentTime':
      if(ws.readyState === WebSocket.OPEN)
        ws.send('hui');
      break;
    default:
  }


}

internalChannel.onmessage = internalChannelOnMessage;

self.onconnect = (event) => {
  initWebsocket();
}
