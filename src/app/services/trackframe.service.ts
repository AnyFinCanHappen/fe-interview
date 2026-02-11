import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { TrackframeMessage } from '../models/trackframe.model';

@Injectable({
  providedIn: 'root',
})
export class TrackframeService {
  private readonly url: string = 'wss://interview-trackframe-service-1055952109740.us-west1.run.app/v4/trackframes';
  private socket$: WebSocketSubject<TrackframeMessage> | null = null;

  constructor() {}

  public connect(): Observable<TrackframeMessage> {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket<TrackframeMessage>(this.url);
    }
    return this.socket$.asObservable();
  }

  public sendMessage(msg: any): void {
    if (this.socket$) {
      this.socket$.next(msg);
    } else {
      console.error('WebSocket is not connected.');
    }
  }

  public close(): void {
    if (this.socket$) {
      this.socket$.complete();
      this.socket$ = null;
    }
  }
}
