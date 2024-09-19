import { Component, OnInit, viewChild, ViewChild } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Property } from '../../../_models/property';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from '../../../_models/city';
import { PropertyType } from '../../../_models/propertyType';
import { LawFirm } from '../../../_models/lawFirm';
import { PropertyPhoto } from '../../../_models/propertyPhoto';
import { PropertyService } from '../../../_services/property.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { User } from '../../../_models/user';
import { PropertyDetails } from '../../../_models/propertyDetails';
import { RegistrationType } from '../../../_models/registrationType';
import { AccountService } from '../../../_services/account.service';
import { StepOneComponent } from '../steps/step-one/step-one.component';
import { StepTwoComponent } from '../steps/step-two/step-two.component';
import { StepThreeComponent } from '../steps/step-three/step-three.component';
import { StepTwoProperties } from '../../../_models/stepTwo';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss'],
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
    
  ],
  providers: [MessageService]
})
export class EditPropertyComponent implements OnInit {

  currentPropertyId!: number;
  newRecord!: Property;
  myForm!: FormGroup;
  cities: City[] = [];
  propertyTypes: PropertyType[] = [];
  lawFirms: LawFirm[] = [];
  propertyPhotos: PropertyPhoto[] = [];
  registrationTypes: RegistrationType[] = [];
  propertyId: number = 0;

  suburbs: any[] = [];

  isNewProperty: boolean = true;
  loading: boolean = false;
  loggedInUser!: User;

  selectedPropertyType: PropertyType | undefined;
  selectedLawFirm: LawFirm | undefined;
  selectedRegistrationType: RegistrationType | undefined;
  selectedCity: City | undefined;
  enteredAddress: string | undefined;

  stepTwoProperties: StepTwoProperties | undefined;
  existingProperty!: Property;
 
  
    @ViewChild(StepOneComponent) stepOneComponent!: StepOneComponent;
    @ViewChild(StepTwoComponent) stepTwoComponent!: StepTwoComponent;
    @ViewChild(StepThreeComponent) stepThreeComponent!: StepThreeComponent;

  constructor(private route: ActivatedRoute,     
    private propertyService: PropertyService,
    private messageService: MessageService,
    private accountService: AccountService) { }

  ngOnInit() {

    this.route.params.subscribe((params: any) => {
      this.currentPropertyId = +params['id'];
      this.loadPageData();
      
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

  loadPageData(){

    this.propertyService.getPropertyLookupData().subscribe({
      next: (response) => {
          this.cities = response.cities;
          this.suburbs = response.suburbs;
          this.lawFirms = response.lawFirms;  
          this.propertyTypes = response.propertyTypes; 
          this.registrationTypes = response.registrationTypes;
          this.getCurrentPropertyData();   
          this.getCurrentUser();
      }
    });
  }

  uploadAllImages(){
    this.loading = true;
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

      this.loading = true;
      this.propertyService.createProperty(this.newRecord).subscribe({
          next: (response) => {  
            if(response > 0){
              this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Successfully created new property', life: 3000 });
              localStorage.setItem('newPropertyId', response.toString());
              nextCallback.emit();
            }else{
              this.messageService.add({ severity: 'error', summary: 'Error', detail: "Failed to create new property", life: 3000 });
            }
            this.loading = false;
          },error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Failed to create new property", life: 3000 });
            this.loading = false;
          }
        });
    }

  }

  generatePropertyForm(stepOneItems: FormGroup, stepTwoItems: FormGroup){
    this.newRecord = {   
      propertyId : this.currentPropertyId,
      ownerId :  this.loggedInUser.id,
      ownerName :  '',
      assignedLawyerId :  stepOneItems.value.assignedLawyerId.lawFirmID,
      statusID :  this.existingProperty.statusID,
      statusName :  '',
      assignedLawyerName :  '',
      propertyTypeId :  stepOneItems.value.propertyTypeId.propertyTypeId,
      propertyTypeName :  '',
      suburbId :  this.existingProperty.suburbId,
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
      thumbnailUrl: this.existingProperty.thumbnailUrl,
      youtubeUrl : this.existingProperty.youtubeUrl,
      hasLawyer :  this.existingProperty.hasLawyer,
      numberOfLikes :  this.existingProperty.numberOfLikes,
      amenities: JSON.stringify(stepTwoItems.value.amenities),
      registrationTypeId: stepOneItems.value.registrationTypeId.registrationTypeId,
      squareMetres :  stepTwoItems.value.squareMetres,
      isActive : this.existingProperty.isActive,
      isSold : this.existingProperty.isSold,
      isDeleted : this.existingProperty.isDeleted,
    };
  }


  getCurrentPropertyData(){
    this.propertyService.getPropertyById(this.currentPropertyId).subscribe({
      next: (response: PropertyDetails) => {
        if(response){
          this.existingProperty = response.property;

          this.selectedPropertyType = this.propertyTypes.find(x => x.propertyTypeId == this.existingProperty.propertyTypeId);
          this.selectedLawFirm =  this.lawFirms.find(x => x.lawFirmID == this.existingProperty.assignedLawyerId);
          this.selectedRegistrationType =  this.registrationTypes.find(x => x.registrationTypeId == this.existingProperty.registrationTypeId);
          this.selectedCity =  this.cities.find(x => x.cityId == this.existingProperty.cityId);
          this.enteredAddress = this.existingProperty.address;

          this.stepTwoProperties = {
            price: this.existingProperty.price,
            numberOfRooms :   this.existingProperty.numberOfRooms,
            numberOfBathrooms : this.existingProperty.numberOfBathrooms,
            parkingSpots :  this.existingProperty.parkingSpots,
            amenities: JSON.parse(this.existingProperty.amenities),
            squareMetres :  this.existingProperty.squareMetres,
            description :  this.existingProperty.description
          }
        }
      }
    });
  }


}
