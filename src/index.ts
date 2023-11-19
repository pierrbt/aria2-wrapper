import { Aria2Constructor, defaultConstructor } from "./constructor";
import { RPCMethod } from "./method";
import { GlobalStat, Status, Version } from "./responses";
import { GlobalOptions } from "./options";

class Aria2 {
  private readonly _websocket: WebSocket;

  constructor({ port, host, path }: Aria2Constructor = {}) {
    this._websocket = new WebSocket(`ws://${host || defaultConstructor.host}:${port || defaultConstructor.port}${path || defaultConstructor.path}`);
    this._websocket.onerror = (error) => console.error(`WebSocket error: ${error}`);
  }

  private sendRequest = <T>(method: RPCMethod, ...params: any[]): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      this._websocket.onmessage = (message) => resolve(JSON.parse(message.data));
      this._websocket.send(JSON.stringify({ jsonrpc: '2.0', id: 'qwer', method, params }));
      this._websocket.onerror = (error) => reject(error);
    });
  };

  connect = async (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this._websocket.onopen = () => resolve();
      this._websocket.onerror = (error) => reject(error);
    });
  };

  close = async (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this._websocket.onclose = () => resolve();
      this._websocket.onerror = (error) => reject(error);
      this._websocket.close();
    });
  };

  getVersion = (): Promise<Version> => this.sendRequest('aria2.getVersion');
  addUri = (uris: string, options?: GlobalOptions): Promise<string> => this.sendRequest('aria2.addUri', [uris], options);
  remove = (gid: string): Promise<string> => this.sendRequest('aria2.remove', [gid]);
  forceRemove = (gid: string): Promise<string> => this.sendRequest('aria2.forceRemove', [gid]);
  pause = (gid: string): Promise<string> => this.sendRequest('aria2.pause', [gid]);
  pauseAll = (): Promise<'OK'> => this.sendRequest('aria2.pauseAll');
  forcePause = (gid: string): Promise<string> => this.sendRequest('aria2.forcePause', [gid]);
  forcePauseAll = (): Promise<'OK'> => this.sendRequest('aria2.forcePauseAll');
  unpause = (gid: string): Promise<string> => this.sendRequest('aria2.unpause', [gid]);
  unpauseAll = (): Promise<'OK'> => this.sendRequest('aria2.unpauseAll');
  tellStatus = (gid: string, keys?: string[]): Promise<Status> => this.sendRequest('aria2.tellStatus', gid, keys);
  tellActive = (keys?: string[]): Promise<Status[]> => this.sendRequest('aria2.tellActive', [], keys);
  tellWaiting = (offset: number, num: number, keys?: string[]): Promise<Status[]> => this.sendRequest('aria2.tellWaiting', [offset, num], keys);
  tellStopped = (offset: number, num: number, keys?: string[]): Promise<Status[]> => this.sendRequest('aria2.tellStopped', [offset, num], keys);
  getGlobalStat = (): Promise<GlobalStat> => this.sendRequest('aria2.getGlobalStat');
  shutdown = (): Promise<'OK'> => this.sendRequest('aria2.shutdown');
  saveSession = (): Promise<'OK'> => this.sendRequest('aria2.saveSession');
}

export default Aria2;
