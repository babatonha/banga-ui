import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { LawFirm } from "../_models/lawFirm";
import { LawFirmRating } from "../_models/rating";


@Injectable({
    providedIn: 'root'
  })
  export class LawFirmService {
    lawFirms: LawFirm[] = [];

    constructor(private baseService: BaseService,
        private http: HttpClient) { }

    
    getAllLawFirms(){
        return this.http.get<any>(`${this.baseService.baseUrl}LawFirm/`);
    }

    getLawFirmById(lawFirmId: number){
      return this.http.get<any>(`${this.baseService.baseUrl}LawFirm/${lawFirmId}`);
    }

    getLawFirmRatings(lawFirmId: number){
      return this.http.get<any>(`${this.baseService.baseUrl}LawFirm/Ratings/${lawFirmId}`);
    }

    getUserLawFirmRatings(lawFirmId: number, userId: number){
      return this.http.get<any>(`${this.baseService.baseUrl}LawFirm/Ratings/${lawFirmId}/${userId}`);
    }


    createLawFirm(lawFirm: LawFirm){
      return this.http.post<any>(`${this.baseService.baseUrl}LawFirm/`, lawFirm);
    }

    createLawFirmRating(lawFirm: LawFirmRating){
      return this.http.post<any>(`${this.baseService.baseUrl}LawFirm/Ratings`, lawFirm);
    }

    updateLawFirm(lawFirm: LawFirm){
      return this.http.put<any>(`${this.baseService.baseUrl}LawFirm/`, lawFirm);
    }



    setLawFirmData(firms: LawFirm[]){
      this.lawFirms = firms;
    }

    getFirmsData(){
      return this.lawFirms;
    }
  }