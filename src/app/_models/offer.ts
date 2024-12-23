export interface Offer{
    propertyOfferId: number;
    propertyId: number;
    offerByUserId: number;
    buyerName?: string | null;
    description: string | null;
    statusId: number;
    status?: string | null;
    paymentMethodId: number;
    paymentMethod?: string;
    amount: number;
    createdDate?: Date | null;
    lastUpdatedDate?: Date | null;
}