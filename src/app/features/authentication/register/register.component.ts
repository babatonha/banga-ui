import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../_services/account.service';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { Register } from '../../../_models/register';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CardModule, 
    ButtonModule, 
    CommonModule, 
    InputTextModule, 
    FormsModule,
    ReactiveFormsModule,
    SplitButtonModule,
    ToastModule],
    providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  registerModel!: Register;
  myForm!: FormGroup;
  constructor(private fb: FormBuilder,
     private accountService: AccountService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.myForm =   this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }


   onSubmit(){
    if (this.myForm.valid) {

      this.registerModel = this.myForm.value;

    this.accountService.register(this.registerModel).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully registered' });
        }
      });
    }
  }


   get userName() {
    return this.myForm.controls['userName'];
  }

   get email() {
    return this.myForm.controls['email'];
  }
  get password() { return this.myForm.controls['password']; }
}
