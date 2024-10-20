import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ToggleButtonModule } from 'primeng/togglebutton';
import { UserService } from '../../../_services/user.service';
import { AccountService } from '../../../_services/account.service';
import { UserDetails } from '../../../_models/user-details';
import { User } from '../../../_models/user';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [ 
    CardModule, 
    ButtonModule, 
    CommonModule, 
    InputTextModule, 
    FormsModule, 
    CardModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    ToggleButtonModule],
    providers: [ConfirmationService, MessageService]
})
export class ProfileComponent implements OnInit {

  myForm!: FormGroup;
  currentUserId?: number;
  userDetails?: UserDetails;
  loggedInUser!: User;
  constructor(private fb: FormBuilder, 
    private userService: UserService, 
    private messageService: MessageService,
    private accountService: AccountService) { }

  ngOnInit() {
    this.generateForm();
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.accountService.currentUser$.subscribe({
       
      next: user => {
        if(user){
          this.loggedInUser = user;
        }else{
            this.loggedInUser  = this.accountService.getLoggedInUser(); //try getting it from local storage
        }

        this.getUser( this.loggedInUser.id);
      }
    })
  }


  generateForm(){
    this.myForm = this.fb.group({
      id : [0],
      userName : [''],
      email : [''],
      fullName : [''],
      firstName: ['', [Validators.required]],
      lastName: ['',[Validators.required]],
      roles: [''],
      phoneNumber: ['', [Validators.required]],
      idNumber: ['', [Validators.required]],
    });
  }

  getUser(id: number){
    this.userService.getUser(id).subscribe({
      next: user => {
        this.myForm.patchValue(user);
        this.userDetails = user;
      }
    })
  }

  changeProfilePicture(){

  }

  onSubmit(){

    if(this.myForm.valid){
      this.userService.createUser(this.myForm.value).subscribe({
        next: () => {
          this.getUser(this.currentUserId!);
          // this.toastr.success("Succesfully updated");
          this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Successfully Saved', life: 3000 });
          // this.spinner.hide();
        }
      })
    }

  }


}
