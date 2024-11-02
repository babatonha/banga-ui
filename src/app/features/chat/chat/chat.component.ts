import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '../../../_models/user';
import { ChatModel } from '../../../_models/chat';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';
import { AccountService } from '../../../_services/account.service';
import { BaseService } from '../../../_services/base.service';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-chat',
  templateUrl:'./chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AvatarModule,
    DataViewModule ,
    ButtonModule, 
    TagModule
  ],
})
export class ChatComponent implements OnInit  {
  users: User[] = [];
  chats: ChatModel[] = [];
  selectedUserId!: number;
  selectedUser!: User;
  user! : User;
  hub: signalR.HubConnection | undefined;
  message: string = ""; 


  constructor( private http: HttpClient, 
    private accountService: AccountService,
    private baseService: BaseService ){
    this.getCurrentUser();
    this.hub = new signalR.HubConnectionBuilder().withUrl(`${this.baseService.hubUrl}chat-hub`).build();

    this.hub.start().then(()=> {
      console.log("Connection is started...");  
      
      this.hub?.invoke("Connect", this.user.id);

      this.hub?.on("Users", (res:User) => {
        console.log(res);
        this.users.find(p=> p.id == res.id)!.isOnline = res.isOnline;        
      });

      this.hub?.on("Messages",(res:ChatModel)=> {
        console.log(res);        
        
        if(this.selectedUserId == res.userId){
          this.chats.push(res);
        }
      })
    })
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
      this.http.get<User[]>(`${this.baseService.baseUrl}User/`).subscribe({
        next: res => {
          this.users = res.filter(p => p.id != this.user.id);
        }
      }
    )
  }



  changeUser(user: User){
    this.selectedUserId = user.id;
    this.selectedUser = user;

    this.http.get(`${this.baseService.baseUrl}Chat/GetChats?userId=${this.user.id}&toUserId=${this.selectedUserId}`).subscribe((res:any)=>{
      this.chats = res;
    });
  }

  logout(){
    localStorage.clear();
    document.location.reload();
  }

  sendMessage(){
    const data ={
      "userId": this.user.id,
      "toUserId": this.selectedUserId,
      "message": this.message
    }
    this.http.post<ChatModel>(`{this.baseService.baseUrl}Chat/SendMessage`,data).subscribe(
      (res)=> {
        this.chats.push(res);
        this.message = "";
    });
  }

  getCurrentUser(){
    this.accountService.currentUser$.subscribe({
       
      next: user => {
        if(user){
          this.user = user;
        }else{
            this.user  = this.accountService.getLoggedInUser(); //try getting it from local storage
        }
      }
    })
  }

 }
