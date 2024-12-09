export interface Viewing{
    viewingId : number;
    propertyId : number | null;
    title : string | null;
    date : Date | null;
    allocatedTo : number | null;
    note : string | null;
    viewingStatus : string | null;
    isConfirmed : boolean | null;
}