export interface BitTorrentStatus {
  announceList: string[][];
  comment: string;
  creationDate: string;
  mode: 'single' | 'multi';
  info: {
    name: string;
  }
}

export interface Status {
  gid: string;
  status: 'active' | 'waiting' | 'paused' | 'error' | 'complete' | 'removed';
  totalLength: string;
  completedLength: string;
  uploadLength: string;
  bitfield: string;
  downloadSpeed: string;
  uploadSpeed: string;
  infoHash: string;
  numSeeders: string;
  seeder: 'true' | 'false';
  pieceLength: string;
  numPieces: string;
  connections: string;
  errorCode: string;
  errorMessage: string;
  followedBy: string[];
  following: string;
  belongTo: string;
  dir: string;
  files: File[];
  bittorrent: BitTorrentStatus;
  verifiedLength: string;
  verifyIntegrityPending: string;
}

export interface GlobalStat {
  downloadSpeed: string;
  numActive: string;
  numStopped: string;
  numStoppedTotal: string;
  numWaiting: string;
  uploadSpeed: string;
}

export interface Version {
  version: string;
  enabledFeatures: string[];
}