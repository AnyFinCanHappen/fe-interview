export interface Tracker {
  trackedObjectId: string;
  x: number;
  y: number;
}

export interface TrackframeMessage {
  tracks: Tracker[];
  timestamp: string;
}
