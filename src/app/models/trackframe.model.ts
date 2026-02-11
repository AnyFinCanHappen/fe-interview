export interface Trackframe {
  trackedObjectId: string;
  x: number;
  y: number;
}

export interface TrackframeMessage {
  tracks: Trackframe[];
  timestamp: string;
}
