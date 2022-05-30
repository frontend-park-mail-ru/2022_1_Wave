const internalChannelName = 'syncChannel';
const websocketUrl = 'wss://wave-music.online/api/v1/player-sync';
let activePorts = 0;
let ws;

const internalChannel = new BroadcastChannel(internalChannelName);

const currentState = {
  playlists : [],
  playlistPos: 0,
  currentTime: 0,
  isPaused: false,
  lastUpdate: new Date().getTime(),
}

const websocketOnMessage = ({data}) => {
  const parsedData = JSON.parse(data);
  console.log('ws data:',parsedData);
  const lastSecPos = parsedData.last_sec_position;
  const trackPos = parsedData.queue_position;
  const lastUpdate = parsedData.time_state_update;
  const playlist = parsedData.tracks_queue;
  const isPaused = parsedData.on_pause;
  
  if( lastUpdate < currentState.lastUpdate) return;
  currentState.lastUpdate = lastUpdate;

  if(playlist && JSON.stringify(currentState.playlists) !== JSON.stringify(playlist)){
    console.log('setting pause state:',currentState);

    currentState.playlist = playlist;
    currentState.isPaused = isPaused;
    currentState.currentTime = 0;
    currentState.playlistPos = trackPos;

    internalChannel.postMessage({type:'playlist', payload: currentState.playlist});

    setTimeout( () => {
      internalChannel.postMessage({type:'position', payload: currentState.playlistPos});
    }, 20);

    setTimeout( () => {
      internalChannel.postMessage({type:'progress', payload: currentState.currentTime});
      internalChannel.postMessage({type:'playState',payload: !currentState.isPaused});
    },15);

    return;
  }
  console.log('queue pos:', trackPos,currentState.playlistPos)

  if( typeof trackPos !== 'undefined' && currentState.playlistPos !== trackPos){
    console.log('setting pause queue pos:', trackPos)
    internalChannel.postMessage({type:'position', payload: trackPos});
    currentState.playlistPos = trackPos;
  }

  if( typeof isPaused !== 'undefined' && currentState.isPaused !== isPaused){
    console.log('setting pause state:', isPaused,currentState.isPaused);
    internalChannel.postMessage({type:'playState',payload: !isPaused});
    currentState.isPaused = isPaused;
  }

  if ( typeof lastSecPos !== 'undefined' && currentState.currentTime !== lastSecPos){
    console.log('setting progress:', lastSecPos)
    internalChannel.postMessage({type:'progress', payload: lastSecPos});
    currentState.currentTime = lastSecPos;
  }
}

const initWebsocket = () => {
  console.log('try to init worker:',ws);
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
  ws.onopen = (e) =>{
    console.log('ws state:',e);
    const msg = {
      type_push_state: "get_player_state",
    }
    console.log('get state created msg:', msg)
    ws.send(JSON.stringify(msg));
    internalChannel.postMessage({type:'WSState', payload: ws.readyState});
  }
  ws.onclose = (e) =>{
    console.log('ws state:',e);
    internalChannel.postMessage({type:'WSState', payload: ws.readyState});
  }
  ws.onmessage = websocketOnMessage;
}

const internalChannelOnMessage = (eMsg ) => {
  const {type,payload} = eMsg.data

  if (!(ws instanceof WebSocket)) {
    console.log('type:',type,'data:',payload);
    if (type !== 'WSCommand' || payload !== 'connect') return;
    initWebsocket();
    return;
  }
  console.log('type:',type,'data:',payload,'ws state:',
    'msg:',eMsg.data,
    ws.readyState,'const:',WebSocket.OPEN);
  switch (type){
  case 'WSCommand': {
    switch (payload) {
    case 'connect':
      console.log('connecting ws current ws state',);
      initWebsocket();
      break;
    case 'disconnect':
      activePorts -= 1;
      if (activePorts > 0) return;
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
  case 'getWSState': {
    console.log('get state websocket:',ws.readyState);
    if (ws.readyState === WebSocket.OPEN) {
      const msg = {
        type_push_state: "get_player_state",
      }
      const msgStop = {
        type_push_state: "on_pause",
        data: {
          last_sec_position: currentState.currentTime,
          time_state_update: currentState.lastUpdate,
        }
      }
      ws.send(JSON.stringify(msgStop));
      console.log('get state created msg:', msg);
      setTimeout( () => {
        ws.send(JSON.stringify(msg));
      },20);
    }
    break;
  }
  case 'playlist': {
    if (ws.readyState === WebSocket.OPEN) {
      if (JSON.stringify(currentState.playlists) === JSON.stringify(payload)) return;
      currentState.playlists = payload;
      const updateTime = new Date().getTime();
      if( updateTime < currentState.lastUpdate ) return;
      currentState.lastUpdate = updateTime
      currentState.playlistPos = 0;
      const msg = {
        type_push_state: "new_tracks_queue",
        data: {
          last_sec_position: 0,
          tracks_queue: currentState.playlists,
          queue_position : currentState.playlistPos,
          time_state_update: currentState.lastUpdate,
        }
      }
      console.log('playlist created msg:', msg);
      ws.send(JSON.stringify(msg));
    }
    break;
  }
  case 'position':
    if(ws.readyState === WebSocket.OPEN) {
      console.log('current pos',currentState.playlistPos, 'payload:',payload)
      if (currentState.playlistPos === payload) return;

      currentState.playlistPos = payload;
      const updateTime = new Date().getTime();
      if (updateTime < currentState.lastUpdate) return;
      currentState.lastUpdate = updateTime

      const msg = {
        type_push_state: "new_track",
        data: {
          queue_position: currentState.playlistPos,
          last_sec_position: 0,
          time_state_update: currentState.lastUpdate,
        }
      }
      console.log('position created msg:', msg);
      ws.send(JSON.stringify(msg));
    }
    break;
  case 'progress':
    if(ws.readyState === WebSocket.OPEN){
      const { from } = eMsg.data;

      currentState.currentTime = payload;

      if( from && from === 'user') {
        const updateTime = new Date().getTime();
        if (updateTime < currentState.lastUpdate) return;
        currentState.lastUpdate = updateTime

        const msgStop = {
          type_push_state: "on_pause",
          data: {
            last_sec_position: currentState.currentTime,
            time_state_update: currentState.lastUpdate,
          }
        }

        const msg = {
          type_push_state: "change_position",
          last_sec_position: currentState.currentTime,
          time_state_update: currentState.lastUpdate,
        }

        const msgStart = {
          type_push_state: "off_pause",
          data: {
            last_sec_position: currentState.currentTime,
            time_state_update: currentState.lastUpdate,
          }
        }

        console.log('currentTime created msg:', msg);
        ws.send(JSON.stringify(msgStop));
        ws.send(JSON.stringify(msg));
        setTimeout( () => {
          ws.send(JSON.stringify(msgStart));
        }, 20 );
      }
    }
    break;
  case 'playState':
    if(ws.readyState === WebSocket.OPEN){

      if ( currentState.isPaused === !payload ) return;

      currentState.isPaused = !payload;
      const updateTime = new Date().getTime();
      if (updateTime < currentState.lastUpdate) return;
      currentState.lastUpdate = updateTime

      const msg = {
        type_push_state: currentState.isPaused ? "on_pause" : "off_pause",
        data: {
          last_sec_position: currentState.currentTime,
          time_state_update: currentState.lastUpdate,
        }
      }
      const msgStop = {
        type_push_state: "on_pause",
        data: {
          last_sec_position: currentState.currentTime,
          time_state_update: currentState.lastUpdate,
        }
      }
      ws.send(JSON.stringify(msgStop));
      setTimeout( () => {
        ws.send(JSON.stringify(msg));
      },50)
    }
    break;
  default:
  }
}

internalChannel.onmessage = internalChannelOnMessage;

self.onconnect = () => {
  activePorts += 1;
  if ( ws ) {
    internalChannel.postMessage({type: 'WSState', payload: ws.readyState});

  }
}
