import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { ViewingService } from '../../../_services/viewing.service';
import { MessageService } from 'primeng/api';
import { ViewingStatus } from '../../../_enums/viewingStatus';

@Component({
  selector: 'app-viewing',
  templateUrl:'./viewing.component.html',
  styleUrl: './viewing.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    CalendarComponent
  ],
  providers: [MessageService],
})
export class ViewingComponent implements OnInit{
  eventList: any;
  eventsLoaded: boolean = false;
  constructor( private messageService: MessageService,
    private viewingService: ViewingService, ) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents(){
    this.viewingService.getPropertyViewingsByUserId(1,1).subscribe({
      next: (response) => {  
        if(response){
          this.eventList = response.map((updated) =>{
            if(updated.viewingStatus === ViewingStatus[ViewingStatus.Available]){
              updated.backgroundColor = "green";
            }
            else if(updated.viewingStatus === ViewingStatus[ViewingStatus.Requested]){
              updated.backgroundColor = "orange";
            }
            else if(updated.viewingStatus === ViewingStatus[ViewingStatus.Booked]){
              updated.backgroundColor = "red";
            }
            return updated;
          });


          this.eventsLoaded = true;
          this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Successfully created viewing', life: 3000 });
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Failed to create new viewing", life: 3000 });
          this.eventsLoaded = true;
        }
      },error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Failed to create new viewing", life: 3000 });
        this.eventsLoaded = true;
      }
    });
  }
 }
