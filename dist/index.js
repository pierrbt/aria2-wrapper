import { defaultConstructor } from "./constructor";
class Aria2 {
    _websocket;
    constructor({ port, host, path } = {}) {
        this._websocket = new WebSocket(`ws://${host || defaultConstructor.host}:${port || defaultConstructor.port}${path || defaultConstructor.path}`);
        this._websocket.onerror = (error) => console.error(`WebSocket error: ${error}`);
    }
    sendRequest = (method, ...params) => {
        return new Promise((resolve, reject) => {
            this._websocket.onmessage = (message) => resolve(JSON.parse(message.data));
            this._websocket.send(JSON.stringify({ jsonrpc: '2.0', id: 'qwer', method, params }));
            this._websocket.onerror = (error) => reject(error);
        });
    };
    connect = async () => {
        return new Promise((resolve, reject) => {
            this._websocket.onopen = () => resolve();
            this._websocket.onerror = (error) => reject(error);
        });
    };
    close = async () => {
        return new Promise((resolve, reject) => {
            this._websocket.onclose = () => resolve();
            this._websocket.onerror = (error) => reject(error);
            this._websocket.close();
        });
    };
    getVersion = () => this.sendRequest('aria2.getVersion');
    addUri = (uris, options) => this.sendRequest('aria2.addUri', [uris], options);
    remove = (gid) => this.sendRequest('aria2.remove', [gid]);
    forceRemove = (gid) => this.sendRequest('aria2.forceRemove', [gid]);
    pause = (gid) => this.sendRequest('aria2.pause', [gid]);
    pauseAll = () => this.sendRequest('aria2.pauseAll');
    forcePause = (gid) => this.sendRequest('aria2.forcePause', [gid]);
    forcePauseAll = () => this.sendRequest('aria2.forcePauseAll');
    unpause = (gid) => this.sendRequest('aria2.unpause', [gid]);
    unpauseAll = () => this.sendRequest('aria2.unpauseAll');
    tellStatus = (gid, keys) => this.sendRequest('aria2.tellStatus', gid, keys);
    tellActive = (keys) => this.sendRequest('aria2.tellActive', [], keys);
    tellWaiting = (offset, num, keys) => this.sendRequest('aria2.tellWaiting', [offset, num], keys);
    tellStopped = (offset, num, keys) => this.sendRequest('aria2.tellStopped', [offset, num], keys);
    getGlobalStat = () => this.sendRequest('aria2.getGlobalStat');
    shutdown = () => this.sendRequest('aria2.shutdown');
    saveSession = () => this.sendRequest('aria2.saveSession');
}
export default Aria2;
