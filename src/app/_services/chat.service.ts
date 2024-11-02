import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { LawFirm } from "../_models/lawFirm";
import { LawFirmRating } from "../_models/rating";
import { ChatModel } from "../_models/chat";


@Injectable({
    providedIn: 'root'
  })
  export class ChatService {
    chats: ChatModel[] = [];

    constructor(private baseService: BaseService,
        private http: HttpClient) { }


    

  }