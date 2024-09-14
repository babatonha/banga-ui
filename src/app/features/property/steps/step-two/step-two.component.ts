import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { AccountService } from '../../../../_services/account.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Amenities } from '../../../../_models/amenities';
import { MultiSelectModule } from 'primeng/multiselect';


@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
  standalone: true,
  imports: [
    ButtonModule, 
    CommonModule, 
    InputTextModule, 
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    DropdownModule,
    InputNumberModule,
    InputTextareaModule,
    MultiSelectModule,
    SplitButtonModule],
    providers: [MessageService]
})
export class StepTwoComponent implements OnInit {
  stepTwoForm!: FormGroup;

  amenitiesList: Amenities[] = [
    {id: 1, name: 'Good zesa'},
    {id: 2, name: 'Municipal water'},
    {id: 3, name:  'Veranda'} , 
    {id: 4, name:  'Walled'},
    {id: 5, name:  'Garden'},
    {id: 6, name:  'Pool'},
    {id: 7, name:  'Gym'},
    {id: 8, name:  'Garage'},
    {id: 9, name:  'Fenced'},
    {id: 10, name:  'Fireplace'}
  ];
 
  
  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private accountService: AccountService,

  ) { }

  ngOnInit() {
    this.stepTwoForm =   this.fb.group({
      price :  [null, [Validators.required]],
      numberOfRooms :  [0],
      numberOfBathrooms :  [0 ],
      parkingSpots :  [0],
      amenities:  [''],
      squareMetres :  [null, [Validators.required]],
      description :  ['', [Validators.required]],
    })
  }

  onSubmit() {
  }

}
