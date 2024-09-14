import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../_services/account.service';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [
    CardModule, 
    ButtonModule, 
    CommonModule, 
    InputTextModule, 

    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    SplitButtonModule],
    providers: [MessageService]
})
export class ForgotPasswordComponent implements OnInit {

  myForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      userName: ['', Validators.required]
    });
  }

  get userName() {
    return this.myForm.controls['userName'];
  }

  onSubmit(){
    if (this.myForm.valid) {
      const usernameOrPassword = this.myForm.value.username;
      this.accountService.forgotPassword(usernameOrPassword).subscribe({
        next: () =>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password recovered, Please check your email!' });
          this.router.navigate(['/change-password']);
        }
      })

    }
  }
}
