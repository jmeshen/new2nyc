/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';
import MapView from 'react-native-maps';

export default class new2nyc extends Component {
  constructor() {
    super()
    this.state = {
      selectedTab: 0
    };
  }

  render() {
    return (
        <TabBarIOS>
          <TabBarIOS.Item
            systemIcon="favorites"
            selected={this.state.selectedTab === 0}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            systemIcon="featured"
            selected={this.state.selectedTab === 1}>

          </TabBarIOS.Item>
        </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});

AppRegistry.registerComponent('new2nyc', () => new2nyc);
