import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { TrackframeService } from './services/trackframe.service';
import { Subscription } from 'rxjs';
import { TrackframeMessage, Trackframe } from './models/trackframe.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private trackframeService: TrackframeService = inject(TrackframeService);

  tracks: Trackframe[] = [];
  wsSubscription: Subscription | null = null;
  connectionMessage: string = '';

  ngOnInit(): void {
    this.connectToWebSocket();
  }

  ngOnDestroy(): void {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
    this.trackframeService.close();
  }

  connectToWebSocket(): void {
    this.wsSubscription?.unsubscribe();
    this.wsSubscription = this.trackframeService.connect().subscribe({
      next: (data: TrackframeMessage) => {
        this.connectionMessage = 'Connected to WebSocket';
        this.tracks = data.tracks;
      },
      error: () => (this.connectionMessage = 'WebSocket connection error'),
      complete: () => (this.connectionMessage = 'WebSocket connection completed'),
    });
  }
}
