import { Likes } from "../_models/likes";

export class DefaultLike {
    static getDefaultLike(): Likes {
      return {
        likeId: 0,
        propertyId: 0,
        userId: 0,
        isLiked: false
    };
  }
}