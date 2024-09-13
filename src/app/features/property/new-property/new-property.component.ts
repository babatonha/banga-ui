import { Component, OnInit, viewChild, ViewChild } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { StepOneComponent } from '../steps/step-one/step-one.component';
import { CardModule } from 'primeng/card';
import { Property } from '../../../_models/property';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from '../../../_models/city';
import { PropertyType } from '../../../_models/propertyType';
import { LawFirm } from '../../../_models/lawFirm';
import { PropertyPhoto } from '../../../_models/propertyPhoto';
import { PropertyService } from '../../../_services/property.service';
import { PropertyPhotoService } from '../../../_services/propertyPhoto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { StepTwoComponent } from '../steps/step-two/step-two.component';
import { StepThreeComponent } from '../steps/step-three/step-three.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.scss'],
  standalone: true,
  imports: [
    StepperModule,
    CardModule, 
    ButtonModule, 
    CommonModule, 
    StepOneComponent, 
    StepTwoComponent,
    StepThreeComponent,
    ToastModule,
    NgxSpinnerModule
  ],
  providers: [MessageService]
})
export class NewPropertyComponent implements OnInit {

  newRecord!: Property;
  myForm!: FormGroup;
  cities: City[] = [];
  propertyTypes: PropertyType[] = [];
  lawFirms: LawFirm[] = [];
  propertyPhotos: PropertyPhoto[] = [];
  propertyId: number = 0;
 currentPropertyId!: number;

  suburbs: any[] = [];

  isNewProperty: boolean = true;
  
    @ViewChild(StepOneComponent) stepOneComponent!: StepOneComponent;
    @ViewChild(StepTwoComponent) stepTwoComponent!: StepTwoComponent;
    @ViewChild(StepThreeComponent) stepThreeComponent!: StepThreeComponent;

  constructor(private fb: FormBuilder,
    private propertyService: PropertyService,
    private propertyPhotoService: PropertyPhotoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadPageData(); 
   
  }

  loadPageData(){

    this.propertyService.getPropertyLookupData().subscribe({
      next: (response) => {
          this.cities = response.cities;
          this.suburbs = response.suburbs;
          this.lawFirms = response.lawFirms;  
          this.propertyTypes = response.propertyTypes;    
      }
    });
  }

  uploadAllImages(){
    this.stepThreeComponent.onTemplatedUpload();
  }


  onSubmit(nextCallback: any){
   
    if(!this.stepOneComponent.stepOneForm.valid){
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Please fill in all required fields on address details section', life: 3000 });
    }
    else if(!this.stepTwoComponent.stepTwoForm.valid){
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Please fill in all required fields on property details section', life: 3000 });
    }else{
      this.generatePropertyForm(this.stepOneComponent.stepOneForm, this.stepTwoComponent.stepTwoForm);

      this.spinner.show();
 
      this.propertyService.createProperty(this.newRecord).subscribe({
          next: () => {  
            this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Successfully created new property', life: 3000 });
            nextCallback.emit();
            this.spinner.hide();
          },error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Failed to create new property", life: 3000 });
            this.spinner.hide();
          }
        });
    }

  }

  generatePropertyForm(stepOneItems: FormGroup, stepTwoItems: FormGroup){
    this.newRecord = {
      propertyId : 0,
      ownerId :  0,
      ownerName :  '',
      assignedLawyerId :  stepOneItems.value.assignedLawyerId.lawFirmID,
      statusID :  0,
      statusName :  '',
      assignedLawyerName :  '',
      propertyTypeId :  stepOneItems.value.propertyTypeId.propertyTypeId,
      propertyTypeName :  '',
      suburbId :  0,
      cityId :  stepOneItems.value.cityId.cityId,
      cityName :  '',
      provinceId :  stepOneItems.value.cityId.proviceId,
      provinceName :  '',
      address :  stepOneItems.value.address,
      price :  stepTwoItems.value.price,
      description : stepTwoItems.value.description,
      numberOfRooms : stepTwoItems.value.numberOfRooms,
      numberOfBathrooms :  stepTwoItems.value.numberOfBathrooms,
      parkingSpots :  stepTwoItems.value.parkingSpots,
      thumbnailUrl: '',
      youtubeUrl : '',
      hasLawyer :  false,
      numberOfLikes :  0,
      amenities: JSON.stringify(stepTwoItems.value.amenities),
      registrationTypeId: stepOneItems.value.registrationTypeId.id,
      squareMetres :  stepTwoItems.value.squareMetres,
      isActive : false,
      isSold : false,
      isDeleted : false,
    };
  }



}

