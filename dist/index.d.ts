import { Aria2Constructor } from "./constructor";
import { GlobalStat, Status, Version } from "./responses";
import { GlobalOptions } from "./options";
declare class Aria2 {
    private readonly _websocket;
    constructor({ port, host, path }?: Aria2Constructor);
    private sendRequest;
    connect: () => Promise<void>;
    close: () => Promise<void>;
    getVersion: () => Promise<Version>;
    addUri: (uris: string, options?: GlobalOptions) => Promise<string>;
    remove: (gid: string) => Promise<string>;
    forceRemove: (gid: string) => Promise<string>;
    pause: (gid: string) => Promise<string>;
    pauseAll: () => Promise<'OK'>;
    forcePause: (gid: string) => Promise<string>;
    forcePauseAll: () => Promise<'OK'>;
    unpause: (gid: string) => Promise<string>;
    unpauseAll: () => Promise<'OK'>;
    tellStatus: (gid: string, keys?: string[]) => Promise<Status>;
    tellActive: (keys?: string[]) => Promise<Status[]>;
    tellWaiting: (offset: number, num: number, keys?: string[]) => Promise<Status[]>;
    tellStopped: (offset: number, num: number, keys?: string[]) => Promise<Status[]>;
    getGlobalStat: () => Promise<GlobalStat>;
    shutdown: () => Promise<'OK'>;
    saveSession: () => Promise<'OK'>;
}
export default Aria2;
