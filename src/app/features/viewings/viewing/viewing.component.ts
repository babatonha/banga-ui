import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewing',
  templateUrl:'./viewing.component.html',
  styleUrl: './viewing.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    CalendarComponent
  ],
})
export class ViewingComponent { }
