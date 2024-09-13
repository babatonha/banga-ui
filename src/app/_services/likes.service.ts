import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Likes } from "../_models/likes";


@Injectable({
    providedIn: 'root'
  })
  export class LikesService {

    constructor(private baseService: BaseService,
        private http: HttpClient) { }

    
    getUserLikes(propertyId: number, userId: number){
        return this.http.get<Likes>(`${this.baseService.baseUrl}Likes/${propertyId}/${userId}`);
    }

    createLike(like: Likes){
      return this.http.post<any>(`${this.baseService.baseUrl}Likes`, like);
    }
  }