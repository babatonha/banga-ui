import { Amenities } from "./amenities";

export interface StepTwoProperties{
    price: number;
    numberOfRooms :   number;
    numberOfBathrooms :   number;
    parkingSpots :  number;
    amenities:   Amenities[];
    squareMetres :  number;
    description :  string;
}