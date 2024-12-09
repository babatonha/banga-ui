import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import {  FullCalendarModule } from '@fullcalendar/angular'; 
import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
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
   calendarOptions: CalendarOptions  = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: this.isMobile ? 'customButton' : 'customButton',
      center: 'title',
      right: this.isMobile ? 'dayGridMonth' : 'prev,next,dayGridMonth,dayGridWeek,dayGridDay'
    },
    customButtons: {
      customButton: {
        text: 'New',
        click: () => {
          this.visible = true;
        }
      }
    },
    plugins: [dayGridPlugin, interactionPlugin],
    //dateClick: (arg) => this.handleDateClick(arg),
    events: [
      { title: 'event 1', date: '2024-12-01', propertyId: 1 },
      { title: 'event 2', date: '2024-12-02' }  
    ],
    eventClick: (e:any) => {
      this.visible = true;
    }
  };
   viewing: Viewing = {
    viewingId: 0,
    propertyId : 0,
    title: null,
    date : null,
    allocatedTo : 0,
    note : null,
    viewingStatus : 'Available',
    isConfirmed : false

   };

   eventList: Viewing[] = [];
   events: any




  constructor(private messageService: MessageService,
    private viewingService: ViewingService) { 

  }

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
    this.viewingService.getPropertyViewingsByUserId(1,1).subscribe({
      next: (response) => {
        this.calendarOptions = {
          initialView: 'dayGridMonth',
          headerToolbar: {
            left: this.isMobile ? 'customButton' : 'customButton',
            center: 'title',
            right: this.isMobile ? 'dayGridMonth' : 'prev,next,dayGridMonth,dayGridWeek,dayGridDay'
          },
          customButtons: {
            customButton: {
              text: 'New',
              click: () => {
                this.visible = true;
              }
            }
          },
          plugins: [dayGridPlugin, interactionPlugin],
          //dateClick: (arg) => this.handleDateClick(arg),
          events: [
            { title: 'event 1', date: '2024-12-01', propertyId: 1 },
            { title: 'event 2', date: '2024-12-02' }  
          ],
          eventClick: (e:any) => {
            this.visible = true;
          }
        };
      }
    });

  }



 }
