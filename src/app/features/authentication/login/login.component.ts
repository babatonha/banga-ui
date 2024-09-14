import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Login } from '../../../_models/login';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../_services/account.service';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CardModule, 
    ButtonModule, 
    CommonModule, 
    InputTextModule, 
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    SplitButtonModule],
    providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginModel!: Login;
  myForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
    this.myForm =   this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    if (this.myForm.valid) {
      this.loginModel = this.myForm.value;
      this.accountService.login(this.loginModel).subscribe({
        next: () =>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully logged in' });
          this.router.navigate(['/home']);
        }
      })
    }
   }


   get userName() {
    return this.myForm.controls['userName'];
  }
  get password() { return this.myForm.controls['password']; }

}
