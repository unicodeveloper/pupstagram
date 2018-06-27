import React from "react";
import { View, StyleSheet } from "react-native-web";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import { DogWithLikes } from "../Dog";
import DogList from "../DogList";
import Header from "../Header";
import { Fetching, Error } from "../Fetching";

export const GET_DOG = gql`
  query getDogByBreed($breed: String!) {
    dog(breed: $breed) {
      images {
        url
        id
        isLiked @client
      }
    }
  }
`;

const Detail = ({ match: { params: { breed, id } } }) => (
  <View style={styles.container}>
    <Header text={breed} />
    <Query query={GET_DOG} variables={{ breed }}>
      {({ loading, error, data }) => {
        if (loading) return <Fetching />;
        if (error) return <Error />;

        return (
          <DogList
            data={data.dog.images}
            renderRow={(type, data) => (
              <DogWithLikes
                id={id}
                isLiked={data.isLiked}
                imageId={data.id}
                url={data.url}
              />
            )}
          />
        );
      }}
    </Query>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  },
  fetching: {
    fontSize: 30,
    fontFamily: "Luckiest Guy",
    color: "#23a599",
    margin: 10,
    letterSpacing: 1
  }
});

export default Detail;
