import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";


@Injectable({
    providedIn: 'root'
  })
  export class LocationService {

    constructor(private baseService: BaseService,
        private http: HttpClient) { }

    
    getAllCitites(){
        return this.http.get<any>(`${this.baseService.baseUrl}PropertyLocation/Cities`);
    }

    getAllSuburbs(){
      return this.http.get<any>(`${this.baseService.baseUrl}PropertyLocation/Suburbs`);
    }

    getAllCitySuburbs(){
      return this.http.get<any>(`${this.baseService.baseUrl}PropertyLocation/CitySuburbs`);
    }
  }