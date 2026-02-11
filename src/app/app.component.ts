import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { TrackerComponent } from './components/tracker/tracker.component';
import { BoxComponent } from './components/box/box.component';
import { Box } from './models/box.model';
import { TrackframeService } from './services/trackframe.service';
import { Subscription } from 'rxjs';
import { TrackframeMessage } from './models/trackframe.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TrackerComponent, BoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private trackframeService: TrackframeService = inject(TrackframeService);
  wsSubscription: Subscription | null = null;
  connectionMessage: string = '';

  box: Box = {
    p1: { x: -30, y: -10 },
    p2: { x: -10, y: -10 },
    p3: { x: -10, y: 10 },
    p4: { x: -30, y: 10 },
  };

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
        console.log(data);
      },
      error: () => (this.connectionMessage = 'WebSocket connection error'),
      complete: () => (this.connectionMessage = 'WebSocket connection completed'),
    });
  }
}
