import { SearchFilter } from "../_models/searchFilter";

export class DefaultSearchFilter {
    static getDefaultSearchFilter(): SearchFilter {
      return {
        searchTerms: [],
        propertyTypeId: 0,
        registrationTypeId: 0,
        maxPrice: 0,
        minPrice: 0,
        beds:0,
        baths:0
    };
  }
}