import { Component, Input, OnInit } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { ViewingService } from '../../../_services/viewing.service';
import { MessageService } from 'primeng/api';
import { ViewingStatus } from '../../../_enums/viewingStatus';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../../_services/property.service';
import { PropertyDetails } from '../../../_models/propertyDetails';

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
  @Input() currentPropertyId: number = 1;
  currentPropertyOwnerId!: number;


  constructor( private messageService: MessageService,
    private route: ActivatedRoute,     
    private propertyService: PropertyService,
    private viewingService: ViewingService, ) {}

  ngOnInit() {
     this.getCurrentPropertyData();
  }

  getCurrentPropertyData(){
    this.propertyService.getPropertyById(this.currentPropertyId).subscribe({
      next: (response: PropertyDetails) => {
        if(response){
          this.currentPropertyOwnerId = response.property.ownerId;
          if(this.currentPropertyId && this.currentPropertyOwnerId )
            this.getEvents(this.currentPropertyOwnerId, this.currentPropertyId );
        }
      }
    });
  }


  getEvents(ownerId: number, propertyId: number){
    this.viewingService.getPropertyViewingsByUserId(ownerId,propertyId).subscribe({
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
