import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../_services/account.service';
import { Router } from '@angular/router';
import { changePassword } from '../../../_models/changePassword';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: true,
  imports: [CardModule, 
    ButtonModule, 
    CommonModule, 
    InputTextModule, 
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    SplitButtonModule],
    providers: [MessageService]
})
export class ChangePasswordComponent implements OnInit {

  myForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  onSubmit(){
    if (this.myForm.valid) {
      const model: changePassword  = this.myForm.value;
      this.accountService.changePassword(model).subscribe({
        next: () =>{
          this.router.navigate(['/login']);
        }
      })
    }
  }

  

}
