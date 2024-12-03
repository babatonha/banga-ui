import { ChangeDetectionStrategy, Component } from '@angular/core';
import {  FullCalendarModule } from '@fullcalendar/angular'; 
import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    FullCalendarModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
   isMobile = window.innerWidth <= 768;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: this.isMobile ? 'customButton' : 'customButton',
      center: 'title',
      right: this.isMobile ? 'dayGridMonth' : 'prev,next,dayGridMonth,dayGridWeek,dayGridDay'
    },
    customButtons: {
      customButton: {
        text: 'New',
        click: function () {
          alert('Custom Button Clicked!');
        }
      }
    },
    plugins: [dayGridPlugin, interactionPlugin],
    // dateClick: (arg) => this.handleDateClick(arg),
    events: [
      { title: 'event 1', date: '2024-12-01' },
      { title: 'event 2', date: '2024-12-02' }
    ],
    eventClick: (e:any) => {
      alert(e);
    }
  };

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }

    toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }
 }
