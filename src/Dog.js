import React from "react";
import { Text, View, Image, StyleSheet } from "react-native-web";

import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

import Heart from "./Heart";

const TOGGLE_LIKED_PHOTO = gql`
  mutation toggleLikedPhoto($id: String!) {
    toggleLikedPhoto(id: $id) @client
  }
`;

export const Dog = ({ breed, url }) => {
  return (
    <View style={styles.container}>
      <Image source={url} style={styles.image} />
      {breed && <Text style={styles.text}>{breed}</Text>}
    </View>
  );
};

export const DogWithLikes = ({ url, imageId, isLiked }) => {
  return (
    <Mutation mutation={TOGGLE_LIKED_PHOTO} variables={{ id: imageId }}>
      {toggleLike => (
        <View style={styles.container}>
          <Image source={url} style={styles.image} />
          <Heart
            color={isLiked ? "pink" : "#17cbc4"}
            height={30}
            width={30}
            onPress={toggleLike}
          />
        </View>
      )}
    </Mutation>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    height: 150,
    width: 150,
    marginBottom: 5
  },
  text: {
    fontSize: 20,
    fontFamily: "Luckiest Guy",
    color: "#17cbc4",
    margin: 10,
    letterSpacing: 1
  }
});
