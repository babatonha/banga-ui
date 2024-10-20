import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PropertyType } from '../../../_models/propertyType';
import { LawFirm } from '../../../_models/lawFirm';
import { RegistrationType } from '../../../_models/registrationType';
import { DropdownModule } from 'primeng/dropdown';
import { AccountService } from '../../../_services/account.service';
import { PropertyTypeService } from '../../../_services/propertyType.service';
import { DefaultLookUp } from '../../../_static/defaltLookUpDtata';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone: true,
  imports: [
    DialogModule, 
    ButtonModule, 
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
  ]
})
export class FilterComponent implements OnInit {
  visible: boolean = false;

  myForm!: FormGroup;

  @Input() propertyTypes: PropertyType[] = [];
  @Input() selectedPropertyType: PropertyType | undefined;
  @Input() selectedLawFirm: LawFirm | undefined;
  @Input() selectedRegistrationType: RegistrationType | undefined;
  @Input() enteredAddress: string | undefined;
  @Input() lawFirms: LawFirm[] = [];
  @Input() suburbs: any[] = [];
  @Input() registrationTypes: RegistrationType[] = [];
  prices = DefaultLookUp.getDefaultPrices()
  numberDataSource = DefaultLookUp.getDefaultNumberFilters();


  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private propertyTypeSrvice: PropertyTypeService,
  ) { }

  ngOnInit() {

    this.getPropertyTypes();
    this.getRegistrationTypes();
    this.generateForm();
  }


  
  getPropertyTypes(){
    this.propertyTypeSrvice.getAllPropertyTypes().subscribe({
      next: (response) => {
          this.propertyTypes = response;
      }
    });
  }

  getRegistrationTypes(){
    this.propertyTypeSrvice.getAllRegistrationTypes().subscribe({
      next: (response) => {
          this.registrationTypes = response;
      }
    });
  }

  generateForm(){
    this.myForm = this.fb.group({
      propertyTypeId: [0],
      registrationTypeId:  [0],
      maxPrice:  [0],
      minPrice:  [0],
      beds:[0],
      baths:[0]
    });
  }

}
