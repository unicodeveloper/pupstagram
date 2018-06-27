import { gql } from "apollo-boost";

export const defaults = {
  likedPhotos: []
};

export const resolvers = {
  Image: {
    isLiked: () => false
  },
  Mutation: {
    toggleLikedPhoto: (_, { id }, { cache, getCacheKey }) => {
      const fragment = gql`
        fragment isLiked on Image {
          isLiked
          url
        }
      `;
      const fragmentId = getCacheKey({ id, __typename: "Image" });
      const photo = cache.readFragment({
        fragment,
        id: fragmentId
      });

      // first we have to toggle the client-side only field
      cache.writeData({
        id: fragmentId,
        data: {
          ...photo,
          isLiked: !photo.isLiked
        }
      });

      const query = gql`
        {
          likedPhotos @client {
            url
            id
          }
        }
      `;
      const { likedPhotos } = cache.readQuery({ query });

      // if we're unliking the photo, remove it from the array.
      const data = {
        likedPhotos: photo.isLiked
          ? likedPhotos.filter(photo => photo.id !== id)
          : likedPhotos.concat([
              { url: photo.url, id, __typename: "LikedPhoto" }
            ])
      };

      // add the liked photo to an array for easy access
      cache.writeData({ data });
      return data;
    }
  }
};
