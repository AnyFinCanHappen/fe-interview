import { Component, Input, OnInit } from '@angular/core';
import { Box } from '../../models/box.model';

@Component({
  selector: '[app-box]',
  standalone: true,
  imports: [],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss',
})
export class BoxComponent implements OnInit {
  @Input({ required: true }) box: Box;

  points: string = '';

  ngOnInit(): void {
    this.points = this.initPoints();
  }

  initPoints(): string {
    const { p1, p2, p3, p4 } = this.box;
    return `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`;
  }
}
