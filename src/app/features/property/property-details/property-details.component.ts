import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';
import { PanelModule } from 'primeng/panel';
import { PropertyDetails } from '../../../_models/propertyDetails';
import { PropertyPhoto } from '../../../_models/propertyPhoto';
import { User } from '../../../_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../../_services/property.service';
import { MessageService } from 'primeng/api';
import { AccountService } from '../../../_services/account.service';
import { Property } from '../../../_models/property';
import { ChipModule } from 'primeng/chip';
import { Amenities } from '../../../_models/amenities';
import { PropertyPhotoService } from '../../../_services/propertyPhoto.service';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { MyOffersComponent } from '../../offer/my-offers/my-offers.component';
import { CalendarComponent } from "../../viewings/calendar/calendar.component";
import { ViewingComponent } from '../../viewings/viewing/viewing.component';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss'],
  standalone: true,
  imports: [
    GalleriaModule,
    PanelModule,
    CardModule,
    ImageModule,
    ChipModule,
    ButtonModule,
    MyOffersComponent,
    ViewingComponent
],
  providers: [MessageService]
})
export class PropertyDetailsComponent implements OnInit {

  propertyPhotos: PropertyPhoto[] = [];
  currentPropertyId!: number;
  loggedInUser!: User;
  currentProperty!: Property;
  currentAmenities: Amenities[] = [];
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];


  constructor(private route: ActivatedRoute,     
    private propertyService: PropertyService,
    private router: Router,
    private propertyPhotoService: PropertyPhotoService,
    private accountService: AccountService) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.currentPropertyId = +params['id'];
      this.getCurrentPropertyData();
      this.getPropertyPhotos(this.currentPropertyId);
      
    });
  }



  getCurrentUser(){
    this.accountService.currentUser$.subscribe({     
      next: user => {
        if(user){
          this.loggedInUser = user;
        }else{
            this.loggedInUser  = this.accountService.getLoggedInUser(); //try getting it from local storage
        }
      }
    })
  }

  navigateToNewPage(url: string){
    this.router.navigate([`${url}`]);
   }

   navigateToPageWithId(url: string, id: number){
     this.router.navigate([`${url}`,id]);
   }

  getPropertyPhotos(propertyId: number){
    this.propertyPhotoService.getPropertyPhotos(propertyId).subscribe({
      next: response =>{
        this.propertyPhotos = response;
        
        if( !(this.propertyPhotos.length>0)){
          this.propertyPhotos.push({propertyPhotoId: 0, propertyId:0, photoUrl: '/assets/default.jpg'})
        }
      }
    })
  }


  getCurrentPropertyData(){
    this.propertyService.getPropertyById(this.currentPropertyId).subscribe({
      next: (response: PropertyDetails) => {
        if(response){
            this.currentProperty = response.property;
            this.currentAmenities = JSON.parse(response.property.amenities);
        }
      }
    });
  }

}
