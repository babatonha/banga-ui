import { Property } from "./property";
import { PropertyOffer } from "./propertyOffer";
import { PropertyPhoto } from "./propertyPhoto";

export interface PropertyDetails{
    property: Property;
    propertyOffers: PropertyOffer[];
    propertyPhotos: PropertyPhoto[];
}