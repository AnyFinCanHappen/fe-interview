import { Component } from '@angular/core';
import { Tracker } from '../../models/trackframe.model';

@Component({
  selector: '[app-tracker]',
  standalone: true,
  imports: [],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.scss',
})
export class TrackerComponent {
  tracker: Tracker = { trackedObjectId: '', x: 0, y: 0 };
}
