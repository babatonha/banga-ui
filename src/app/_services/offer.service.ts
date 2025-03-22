import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Offer } from "../_models/offer";
import { PaginatedResult } from "../_models/paginatedResult";


@Injectable({
    providedIn: 'root'
  })
  export class OfferService {

    constructor(private baseService: BaseService,
        private http: HttpClient) { }

    
    
    createOffer(offer: Offer){
        return this.http.post<any>(`${this.baseService.baseUrl}PropertyOffer`, offer);
    }

    getCurrentBuyerOffer(propertyId: number, buyerId: number){
        return this.http.get<Offer>(`${this.baseService.baseUrl}PropertyOffer/${propertyId}/${buyerId}`);
    }

    getPropertyOffers(propertyId: number, pageNumber: number, pageSize: number){
        return this.http.get<PaginatedResult<Offer>>(`${this.baseService.baseUrl}PropertyOffer/${propertyId}/${pageNumber}/${pageSize}`);
    }

    getUserOffers(userId: number){
        return this.http.get<Offer[]>(`${this.baseService.baseUrl}PropertyOffer/UserOffers/${userId}`);
    }

    confirmOffer(offerId: number, isOfferConfirmed: boolean){
        return this.http.get<any>(`${this.baseService.baseUrl}PropertyOffer/ConfirmOffer/${offerId}/${isOfferConfirmed}`);
    }

}