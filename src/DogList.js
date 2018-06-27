import React, { Component } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native-web';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from 'recyclerlistview/web';

export default class DogList extends Component {
  constructor(props) {
    super(props);

    const dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    this.layoutProvider = new LayoutProvider(
      index => 1,
      (type, dim) => {
        dim.width = this.state.width / 3;
        dim.height = this.state.width / 3;
      },
    );

    const { height, width } = Dimensions.get('window');

    this.state = {
      dataProvider: dataProvider.cloneWithRows(this.props.data),
      height,
      width,
    };
  }

  componentWillReceiveProps(nextProps) {
    const dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });
    this.setState({ dataProvider: dataProvider.cloneWithRows(nextProps.data) });
  }

  render() {
    const computedStyles = styles(this.state);

    return (
      <View style={computedStyles.container}>
        <RecyclerListView
          layoutProvider={this.layoutProvider}
          dataProvider={this.state.dataProvider}
          rowRenderer={this.props.renderRow}
          canChangeSize
          useWindowScroll
        />
      </View>
    );
  }
}

const styles = ({ height, width }) =>
  StyleSheet.create({
    container: {
      height,
      width,
    },
  });
