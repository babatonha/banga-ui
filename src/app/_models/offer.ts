export interface Offer{
    propertyOfferId : number;
    propertyId : number;
    offerByUserId : number;
    buyerName : string;
    description : string;
    amount : number;
    createdDate : Date;
    lastUpdatedDate : Date;
    isAccepted : boolean;
    isOfferConfirmed: boolean;
}