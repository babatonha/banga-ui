import { Offer } from "../_models/offer";

export class DefaultOffer {
    static getDefaultOffer(): Offer {
      return {
        propertyOfferId : 0,
        propertyId : 0,
        offerByUserId : 0,
        buyerName : '',
        description : '',
        amount : 0,
        createdDate : new Date(),
        lastUpdatedDate : new Date(),
        isAccepted : false
    };
  }
}