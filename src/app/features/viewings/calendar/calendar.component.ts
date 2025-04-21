import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import {  FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular'; 
import { CalendarOptions, EventClickArg, EventInput, EventSourceInput } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Viewing } from '../../../_models/viewing';
import { MessageService } from 'primeng/api';
import { ViewingService } from '../../../_services/viewing.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    FullCalendarModule,
    DialogModule, 
    ButtonModule, 
    InputTextModule,
    CalendarModule,
    FormsModule,
    CommonModule,
    InputTextareaModule
  ],
  providers: [MessageService],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
   visible: boolean = false;
   isMobile = window.innerWidth <= 768;
   date: Date | undefined;
   hourFormat: string  = "12";
   notes: string | undefined;
   minDate: Date = new Date();
   @Input() eventList : Viewing[] = [];
   calendarOptions!: CalendarOptions;
   viewing: Viewing = {
    id: 0,
    propertyId : 0,
    title: null,
    allocatedTo : 0,
    note : null,
    viewingStatus : 'Available',
    backgroundColor: 'green',
    start: null

   };

   calendarViewings: EventInput[] = [];

   @Input() currentPropertyId: number = 1;
   @Input() currentPropertyOwnerId!: number;
   @ViewChild('calendar') calendar?: FullCalendarComponent
   
  constructor(private messageService: MessageService,
    private viewingService: ViewingService) { 

  }

  calendarSettings: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev next today',
      center: 'title',
      right: 'dayGridMonth timeGridWeek timeGridDay listWeek'
    },
    buttonText: {
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      list: 'List'
    },
    initialView: 'timeGridWeek',
    weekends: false,
    editable: true,
    views: {
      timeGridDay: {
        slotDuration: '00:15:00',
        slotMinTime: '07:00:00',
        slotMaxTime: '19:00:00'
      },
      timeGridWeek: {
        slotDuration: '00:15:00',
        slotMinTime: '07:00:00',
        slotMaxTime: '19:00:00'
      }
    },

    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    // select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    // eventDrop: this.handleEventDrop.bind(this),
    // eventResize: this.handleResize.bind(this),
    // datesSet: this.handleDateChange.bind(this),
  };










  ngOnInit() {
   this.loadCalendar();
  }


  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }

    toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
  }

  saveViewing(){
    this.viewing.propertyId = this.currentPropertyId;
    this.viewingService.createViewing(this.viewing).subscribe({
      next: (response) => {  
        if(response > 0){
          this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Successfully created viewing', life: 3000 });
          this.visible = false;
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Failed to create new viewing", life: 3000 });
        }

      },error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Failed to create new viewing", life: 3000 });
      }
    });
  }


  loadCalendar(){
    this.eventList.forEach(x => {


      this.calendarViewings?.push(     
        {
        id:'21',
        title: x.title ?? 'test',
        start: new Date('2025-04-25 14:34:15.000'),
        end: new Date('2025-04-25 14:34:15.000'),
        backgroundColor: 'green',
        borderColor: 'red',
        textColor: 'black',
      });
    });




    // this.calendarOptions = {
    //   initialView: 'dayGridMonth',
    //   headerToolbar: {
    //     left: this.isMobile ? 'customButton' : 'customButton',
    //     center: 'title',
    //     right: this.isMobile ? 'dayGridMonth' : 'prev,dayGridMonth,dayGridWeek,dayGridDay,next'
    //   },
    //   customButtons: {
    //     customButton: {
    //       text: 'New',
    //       click: () => {
    //         this.visible = true;
    //       }
    //     }
    //   },
      
    //   plugins: [dayGridPlugin, interactionPlugin],
    //   events:this.eventList,
    //   eventClick: (e:EventClickArg ) => {
    //     // this.viewing = {
    //     //   id: parseInt(e.event.id),
    //     //   propertyId : 0,
    //     //   title: e.event.title,
    //     //   allocatedTo : 0,
    //     //   note : e.event.note,
    //     //   viewingStatus : 'Available',
    //     //   backgroundColor: 'green',
    //     //   start: null
    //     // }
    //     // console.log(this.eventList)
    //     console.log(e.event)
    //     //this.viewing = this.eventList.find((x: any) => x.id === e.event.id);
    //     console.log(this.viewing );
    //     this.visible = true;
    //   }
    // };

  }



 }
