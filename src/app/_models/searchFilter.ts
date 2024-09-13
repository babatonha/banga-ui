export interface SearchFilter{
    searchTerms: string[];
    propertyTypeId: number;
    registrationTypeId: number;
    maxPrice: number;
    minPrice: number;
    beds: number;
    baths:number;
}