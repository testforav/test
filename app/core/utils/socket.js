import config from 'core/utils/config';

let connector = new WebSocket(config.socket.url);
const callbacks = {};
let delayedSend = [];

let isConnected = false;
let reconnectAttempts = 0;

const _send = (data) => {
    if (isConnected) {
        connector.send(data);
    } else {
        delayedSend.push(data);
    }
};

const subscribe = (chName) => {
    _send(JSON.stringify({
        Command: 'subscribe',
        Channel: chName,
    }));
};
const unsubscribe = (chName) => {
    _send(JSON.stringify({
        Command: 'unsubscribe',
        Channel: chName,
    }));
};
const signin = () => {

};
const send = (data) => {
    _send(data);
};
const listen = (chName, fn) => {
    const ts = +new Date();

    if (!callbacks[chName]) {
        callbacks[chName] = [];
    }

    callbacks[chName].push({
        ts,
        fn,
    });

    return ts;
};
const mute = (chName, ts) => {
    const arr = callbacks[chName];
    if (arr) {
        for (let i = 0, l = arr.length; i < l; i++) {
            if (arr[i].ts === ts) {
                arr.splice(i, 1);
                break;
            }
        }
    }
};
const _reconnect = () => {
    isConnected = false;
    setTimeout(() => {
        reconnectAttempts++;
        if (reconnectAttempts < 5) {
            const newConnector = new WebSocket(config.socket.url);
            newConnector.onmessage = connector.onmessage;
            newConnector.onopen = connector.onopen;
            newConnector.onclose = connector.onclose;
            connector = newConnector;
        } else {
            console.warn('[SOCKET]: too many reconnects');
        }
    }, 500);
};

connector.onmessage = (message) => {
    const data = JSON.parse(message.data);
    const arr = callbacks[data.Channel];
    if (arr) {
        for (let i = 0, l = arr.length; i < l; i++) {
            arr[i].fn(data);
        }
    }
};
connector.onopen = () => {
    _debug('[SOCKET]: open');
    isConnected = true;
    reconnectAttempts = 0;
    for (let i = 0, l = delayedSend.length; i < l; i++) {
        _send(delayedSend[i]);
    }
    delayedSend = [];
};
connector.onclose = (message) => {
    _debug('[SOCKET]: close ', message);
    _reconnect();
};

export default {
    subscribe,
    unsubscribe,
    signin,
    send,
    listen,
    mute,
};
