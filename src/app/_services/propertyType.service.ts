import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";


@Injectable({
    providedIn: 'root'
  })
  export class PropertyTypeService {

    constructor(private baseService: BaseService,
        private http: HttpClient) { }

    
    getAllPropertyTypes(){
        return this.http.get<any>(`${this.baseService.baseUrl}PropertyType/`);
    }

        
    getAllRegistrationTypes(){
      return this.http.get<any>(`${this.baseService.baseUrl}PropertyType/RegistrationTypes`);
  }
  }