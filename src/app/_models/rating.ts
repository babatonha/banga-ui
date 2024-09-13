export interface LawFirmRating {
    ratingId: number;
    lawFirmId: number;
    userId: number;
    rating: number;
    review: string | null;
    userName: string | null;
    userFullName: string | null;
}