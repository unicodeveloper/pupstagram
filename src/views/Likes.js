import React from 'react';
import { View, StyleSheet } from 'react-native-web';

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import { Dog } from '../Dog';
import DogList from '../DogList';
import Header from '../Header';

const GET_LIKED_PHOTOS = gql`
  query {
    likedPhotos @client {
      url
      id
    }
  }
`;

const Likes = () => (
  <View style={styles.container}>
    <Header text="Likes" />
    <Query query={GET_LIKED_PHOTOS}>
      {({ data }) => (
        <DogList
          data={data.likedPhotos}
          renderRow={(type, data) => <Dog {...data} />}
        />
      )}
    </Query>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  fetching: {
    fontSize: 30,
    fontFamily: 'Luckiest Guy',
    color: '#23a599',
    margin: 10,
    letterSpacing: 1,
  },
});

export default Likes;
