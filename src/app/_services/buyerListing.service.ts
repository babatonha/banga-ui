import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { BuyerListing } from "../_models/buyerListing";

@Injectable({
    providedIn: 'root'
  })
  export class BuyerListingService {

    constructor(private baseService: BaseService,
        private http: HttpClient) { }

    
    getAllBuyerListings(){
        return this.http.get<any>(`${this.baseService.baseUrl}BuyersListing/`);
    }

    createBuyerListing(buyer: BuyerListing){
      return this.http.post<any>(`${this.baseService.baseUrl}BuyersListing/`, buyer);
    }

    updateBuyerListing(buyer: BuyerListing){
      return this.http.put<any>(`${this.baseService.baseUrl}BuyersListing/`, buyer);
    }

    deleteBuyerListing(buyerListingId: number){
      return this.http.delete<any>(`${this.baseService.baseUrl}BuyersListing/${buyerListingId}`);
    }
  }