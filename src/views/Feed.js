import React from "react";
import { View, StyleSheet } from "react-native-web";
import { Link } from "react-router-dom";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import { GET_DOG } from "./Detail";
import DogList from "../DogList";
import { Dog } from "../Dog";
import Header from "../Header";
import { Fetching, Error } from "../Fetching";

const GET_DOGS = gql`
  {
    dogs {
      id
      breed
      displayImage
    }
  }
`;

const Feed = () => (
  <View style={styles.container}>
    <Header />
    <Query query={GET_DOGS}>
      {({ loading, error, data, client }) => {
        if (loading) return <Fetching />;
        if (error) return <Error />;

        return (
          <DogList
            data={data.dogs}
            renderRow={(type, data) => (
              <Link
                to={{
                  pathname: `/${data.breed}/${data.id}`,
                  state: { id: data.id }
                }}
                onMouseOver={() =>
                  client.query({
                    query: GET_DOG,
                    variables: { breed: data.breed }
                  })
                }
                style={{ textDecoration: "none" }}
              >
                <Dog {...data} url={data.displayImage} />
              </Link>
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
  }
});

export default Feed;
