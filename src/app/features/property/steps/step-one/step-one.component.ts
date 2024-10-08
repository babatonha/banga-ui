import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { AccountService } from '../../../../_services/account.service';
import { DropdownModule } from 'primeng/dropdown';
import { City } from '../../../../_models/city';
import { PropertyType } from '../../../../_models/propertyType';
import { LawFirm } from '../../../../_models/lawFirm';
import { RegistrationType } from '../../../../_models/registrationType';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
  standalone: true,
  imports: [
    ButtonModule, 
    CommonModule, 
    InputTextModule, 
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    DropdownModule,
    SplitButtonModule],
    providers: [MessageService]
})
export class StepOneComponent implements OnInit {

  stepOneForm!: FormGroup;
  @Input() propertyTypes: PropertyType[] = [];
  @Input() selectedPropertyType: PropertyType | undefined;
  @Input() selectedLawFirm: LawFirm | undefined;
  @Input() selectedRegistrationType: RegistrationType | undefined;
  @Input() selectedCity: City | undefined;
  @Input() enteredAddress: string | undefined;
  @Input() lawFirms: LawFirm[] = [];
  @Input() suburbs: any[] = [];
  @Input() cities: City[] = [];
  @Input() registrationTypes: RegistrationType[] = [];




  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private accountService: AccountService,

  ) { }

  ngOnInit() {
    this.stepOneForm =   this.fb.group({
      assignedLawyerId :  [this.selectedLawFirm, [Validators.required ]],
      propertyTypeId :  [this.selectedPropertyType, [Validators.required]],
      registrationTypeId :  [this.selectedRegistrationType, [Validators.required]],
      suburbId :  [null],
      cityId :  [this.selectedCity, [Validators.required]],
      address :  [this.enteredAddress, [Validators.required]],
    })
  }

  onPropertyTypeChange(event: any) {
    const selectedItem = event.value;
    if( event.target){
      event.target.value = selectedItem;
      this.stepOneForm.controls['propertyTypeId'].setValue(selectedItem.propertyTypeId);
    }
  }

  
  onLawFirmChange(event: any) {
    const selectedItem: LawFirm = event.value;
    if( event.target){
      event.target.value = selectedItem;
      this.stepOneForm.controls['assignedLawyerId'].setValue(selectedItem.lawFirmID);
    }

  }

  onSurburbChange(event: any) {
    const selectedItem = event.value;
    if( event.target){
      event.target.value = selectedItem;
      this.stepOneForm.controls['suburbId'].setValue(selectedItem.id);
    }
  }

  onCityChange(event: any) {
    const selectedItem = event.value;
    if( event.target){
      event.target.value = selectedItem;
      this.stepOneForm.controls['cityId'].setValue(selectedItem.cityId);
    }
  }

  onRegistrationTypeChange(event: any) {
    const selectedItem: RegistrationType = event.value;
    if( event.target){
      event.target.value = selectedItem;
      this.stepOneForm.controls['registrationTypeId'].setValue(selectedItem.registrationTypeId);
    }
  }



  onSubmit(){
    if (this.stepOneForm.valid) {
      this.accountService.login(this.stepOneForm.value).subscribe({
        next: () =>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully logged in' });
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Username or password is incorrect" });
        }
      })
    }
  }

}
