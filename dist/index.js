import { defaultConstructor } from "./constructor";
class Aria2 {
    _port = defaultConstructor.port;
    _host = defaultConstructor.host;
    _path = defaultConstructor.path;
    _websocket;
    on_message = (message) => {
        console.log(`Unexpected message : ${message}`);
    };
    constructor({ port, host, path } = {}) {
        this._port = port || this._port;
        this._host = host || this._host;
        this._path = path || this._path;
        this._websocket = new WebSocket(`ws://${this._host}:${this._port}${this._path}`);
        this._websocket.onmessage = this.on_message;
        this._websocket.onerror = (error) => {
            console.error(`WebSocket error: ${error}`);
        };
    }
    async connect() {
        return new Promise((resolve, reject) => {
            this._websocket.onopen = () => {
                resolve();
            };
            this._websocket.onerror = (error) => {
                reject(error);
            };
        });
    }
}
