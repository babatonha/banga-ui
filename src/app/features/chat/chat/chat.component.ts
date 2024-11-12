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
import { BadgeModule } from 'primeng/badge';
import { CapitalizePipe } from '../../../_pipes/capitalize.pipe';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-chat',
  templateUrl:'./chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextareaModule,
    InputTextModule,
    InputTextareaModule,
    AvatarModule,
    DataViewModule ,
    ButtonModule, 
    TagModule,
    BadgeModule,
    CapitalizePipe,
    ScrollPanelModule,
    CardModule,
    PanelModule
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

  messages: ChatModel[] = [];

  threadVisible: boolean = false;

  constructor( private http: HttpClient, 
    private accountService: AccountService,
    private baseService: BaseService ){
    this.getCurrentUser();
    this.hub = new signalR.HubConnectionBuilder().withUrl(`${this.baseService.hubUrl}chat-hub`).build();

    this.hub.start().then(()=> {    
      this.hub?.invoke("Connect", this.user.id);

      this.hub?.on("Users", (res:User) => {
        this.users.find(p=> p.id == res.id)!.isOnline = res.isOnline;        
      });

      this.hub?.on("Messages",(res:ChatModel)=> {

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

    this.http.get(`${this.baseService.baseUrl}Chat/GetChats/${this.user.id}/${this.selectedUserId}`).subscribe((res:any)=>{
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
      "message": this.message,
      "date": new Date().toString()
    }
    this.http.post<ChatModel>(`${this.baseService.baseUrl}Chat/SendMessage`,data).subscribe(
      (res)=> {
        console.log(res);
        this.chats.push(data);
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


  onUserClick(user: User){
    this.threadVisible = true;
    this.selectedUser = user;
    this.changeUser(user);
  }

  onChatClick(){
    this.threadVisible = false;
  }

 }
