import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";


@Injectable({
    providedIn: 'root'
  })
  export class PropertyPhotoService {

    constructor(private baseService: BaseService,
        private http: HttpClient) { }

    
    saveAll(photos: any, propertyId: number){
        return this.http.post<any>(`${this.baseService.baseUrl}PropertyPhoto/Upload/${propertyId}`, photos);
    }

    getPropertyPhotos(propertyId: number){
      return this.http.get<any>(`${this.baseService.baseUrl}PropertyPhoto/${propertyId}`);
    }

    deletePhoto(photoId: number){
      return this.http.delete<any>(`${this.baseService.baseUrl}PropertyPhoto/${photoId}`);
    }
  }