import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Viewing } from "../_models/viewing";


@Injectable({
    providedIn: 'root'
  })
  export class ViewingService {

    constructor(private baseService: BaseService,
        private http: HttpClient) { }

    
    
    createViewing(viewing: Viewing){
        return this.http.post<any>(`${this.baseService.baseUrl}Viewing`, viewing);
    }

    getPropertyViewingsByUserId(ownerId: number, propertyId: number){
        return this.http.get<Viewing[]>(`${this.baseService.baseUrl}Viewing/${ownerId}/${propertyId}`);
    }

    deleteViewing(viewingId: number){
        return this.http.delete<any>(`${this.baseService.baseUrl}Viewing/${viewingId}`);
    }
}