import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageService } from 'primeng/api';
import { PaymentMethodModel } from '../../../_models/paymentMethod';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { OfferService } from '../../../_services/offer.service';
import { Offer } from '../../../_models/offer';
import { Router } from '@angular/router';

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
    offerRecord!: Offer;
    @Input() currPropertyId: number = 0;
    @Input() currLoggedUserId: number = 0;


    paymentMethods: PaymentMethodModel[] = [{id: 1, name: 'Cash'}, {id: 2, name: 'Instalment'}, {id: 3, name: 'Cash & Instalment'}];

  constructor(private fb: FormBuilder,
    private offerService: OfferService,
    private messageService: MessageService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.loadNewOffer();
  }
  onPaymentMethodTypeChange(e: any){

  }

  onSubmit(){
    if (this.form.valid) {
      this.offerRecord = this.form.value;
      this.offerRecord.paymentMethodId = this.form.value.paymentMethodId.id;

      this.offerService.createOffer(this.offerRecord).subscribe({
        next: () =>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successful' });
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Failed to create" });
        }
      })
    }
  }

  backClick(){

  }

  loadNewOffer(){
    this.form =   this.fb.group({
      propertyOfferId: [0],
      propertyId: [this.currPropertyId],
      offerByUserId: [this.currLoggedUserId],
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
