export interface Viewing{
    id : number;
    propertyId : number | null;
    title : string | null;
    allocatedTo : number | null;
    note : string | null;
    viewingStatus : string | null;
    backgroundColor: string | null;
    start: Date | null;
}