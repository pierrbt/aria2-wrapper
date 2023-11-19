interface Aria2Constructor {
  host?: string;
  port?: number;
  path?: string;
}

const defaultConstructor = {
  host: 'localhost',
  port: 6800,
  path: '/jsonrpc'
}

export {Aria2Constructor, defaultConstructor}