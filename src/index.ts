import { Aria2Constructor, defaultConstructor } from "./constructor";

class Aria2 {
  private readonly _port = defaultConstructor.port
  private readonly _host = defaultConstructor.host
  private readonly _path = defaultConstructor.path

  private _websocket: WebSocket

  private on_message = (message: MessageEvent) => {
    console.log(`Unexpected message : ${message}`);
  }

  constructor({port, host, path}: Aria2Constructor = {}) {
    this._port = port || this._port
    this._host = host || this._host
    this._path = path || this._path

    this._websocket = new WebSocket(`ws://${this._host}:${this._port}${this._path}`);
    this._websocket.onmessage = this.on_message;

    this._websocket.onerror = (error) => {
      console.error(`WebSocket error: ${error}`);
    }
  }

  async connect() {
    return new Promise<void>((resolve, reject) => {
      this._websocket.onopen = () => {
        resolve()
      }
      this._websocket.onerror = (error) => {
        reject(error)
      }
    })
  }


}