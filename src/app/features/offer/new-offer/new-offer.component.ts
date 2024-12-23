import { Component, OnInit } from '@angular/core';
import { NewPropertyComponent } from "../../property/new-property/new-property.component";
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageService } from 'primeng/api';
import { Offer } from '../../../_models/offer';
import { Status } from '../../../_models/status';
import { PaymentMethodModel } from '../../../_models/paymentMethod';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.scss'],
  standalone: true,
  imports: [
    ButtonModule, 
    CardModule, 
    CommonModule, 
    InputTextModule, 
    InputTextareaModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    DropdownModule,
    SplitButtonModule],
     providers: [MessageService]
})
export class NewOfferComponent implements OnInit {
    form!: FormGroup;

    paymentMethods: PaymentMethodModel[] = [];

  constructor(private fb: FormBuilder,
    private messageService: MessageService

  ) { }

  ngOnInit() {
    this.loadNewOffer();
  }
  onPaymentMethodTypeChange(e: any){

  }

  onSubmit(){
    if (this.form.valid) {
      // this.accountService.login(this.stepOneForm.value).subscribe({
      //   next: () =>{
      //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully logged in' });
      //   },
      //   error: error => {
      //     this.messageService.add({ severity: 'error', summary: 'Error', detail: "Username or password is incorrect" });
      //   }
      // })
    }
  }

  loadNewOffer(){
    this.form =   this.fb.group({
      propertyOfferId: [0, [Validators.required]],
      propertyId: [0, [Validators.required]],
      offerByUserId: [0, [Validators.required]],
      buyerName: [null],
      description: ['', [Validators.required]],
      statusId: [0, [Validators.required]],
      status: [null],
      paymentMethodId: [0, [Validators.required]],
      paymentMethod: [null],
      amount: [0, [Validators.required]],
      createdDate: [null],
      lastUpdatedDate: [null],
    })
  }

}
