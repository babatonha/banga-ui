// import { HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { BaseService } from "./base.service";
// import { getPaginatedResult, getPaginationHeaders } from "../_helpers/paginationHelper";
// import { Message } from "../_models/message";
// import { environment } from "../../environments/enironment.development";
// import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
// import { User } from "../_models/user";
// import { BehaviorSubject, take } from "rxjs";
// import { Group } from "../_models/group";


// @Injectable({
//     providedIn: 'root'
//   })
//   export class MessageService {
//     hubUrl = environment.hubUrl;
//     private hubConnection?: HubConnection;
//     private messageThreadSource = new BehaviorSubject<Message[]>([]);
//     messageThread$ = this.messageThreadSource.asObservable();


//     constructor(private baseService: BaseService,
//         private http: HttpClient) { }

//     createHubConnection(user: User, otherUsername: string) {
//         this.hubConnection = new HubConnectionBuilder()
//             .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
//             accessTokenFactory: () => user.token
//             })
//             .withAutomaticReconnect()
//             .build();
//         this.hubConnection.start().catch(error => console.log(error));
    
//         this.hubConnection.on('ReceiveMessageThread', messages => {
//             this.messageThreadSource.next(messages);
//         })
    
//         this.hubConnection.on('NewMessage', message => {
//             this.messageThread$.pipe(take(1)).subscribe({
//             next: messages => {
//                 this.messageThreadSource.next([...messages, message])
//             }
//             })
//         })
    
//         this.hubConnection.on('UpdatedGroup', (group: Group) => {
//             if (group.connections.some(x => x.username === otherUsername)) {
//             this.messageThread$.pipe(take(1)).subscribe({
//                 next: messages => {
//                 messages.forEach(message => {
//                     if (!message.dateRead) {
//                     message.dateRead = new Date(Date.now())
//                     }
//                 })
//                 this.messageThreadSource.next([...messages]);
//                 }
//             })
//             }
//         })
//     }

//     stopHubConnection(){
//         if(this.hubConnection){
//             this.hubConnection.stop();
//         }   
//     }

//     getMessages(pageNumber: number, pageSize: number, container: string){
//         let params = getPaginationHeaders(pageNumber, pageSize);
//         params = params.append('Container', container);
//         return getPaginatedResult<Message[]>(this.baseService.baseUrl + 'Messages',params, this.http);
//     }

//     getMessageThread(username: string){
//         return this.http.get<Message[]>(`${this.baseService.baseUrl}Messages/thread/${username}`)
//     }

//     async sendMessage(username: string, content: string){
//         return this.hubConnection?.invoke('SendMessage', {recipientUsername: username, content})
//         .catch(error => console.log(error));
//     }

//     deleteMessage(messageId: number){
//         return this.http.delete(`${this.baseService.baseUrl}Messages/${messageId}`)
//     }

// }