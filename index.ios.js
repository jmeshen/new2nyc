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
  TabBarIOS,
  TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';

export default class new2nyc extends Component {
  constructor() {
    super()
    this.state = {
      selectedTab: 0,
      currentLat: 0,
      currentLong: 0,
      latDelta: 0.005,
      longDelta: 0.2,
      places:
      [{
        name: 'Empire State Building',
        lat: 40.7484,
        long: -73.9857,
      },
      {
        name: 'Citi Field',
        lat: 40.7571,
        long: -73.8458,
      }]
    };
    this._setLocation = this._setLocation.bind(this);
    // this._clickableLocation = this._clickableLocation.bind(this);
  }

  componentWillMount() {
    navigator.geolocation.requestAuthorization();
    navigator.geolocation.getCurrentPosition((position) => this._setLocation(position.coords.latitude, position.coords.longitude));
  }

  _setLocation(lat, long) {
    this.setState({
      currentLat: lat,
      currentLong: long
    });
  }

  _handleTabChange(num){
    this.setState({
      selectedTab: num
    });
  }

  _clickableLocation(place){
    this.state.places.forEach(elem => {
      if(elem.name === place) {
        this.setState({
          currentLat: elem.lat,
          currentLong: elem.long,
          latDelta: 0.002,
          longDelta: 0.005
        })
      }
    });
  }

  render() {
    return (
        <TabBarIOS>
          <TabBarIOS.Item
            systemIcon="favorites"
            selected={this.state.selectedTab === 0}
            onPress={this._handleTabChange.bind(this, 0)}>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={this._clickableLocation.bind(this, 'Empire State Building')}>
                <Text>Empire State Building</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this._clickableLocation.bind(this, 'Citi Field')}>
                <Text>Citi Field</Text>
              </TouchableOpacity>
            </View>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            systemIcon="featured"
            selected={this.state.selectedTab === 1}
            onPress={this._handleTabChange.bind(this, 1)}>
            <MapView
              style={styles.map}
              region={{
                latitude: this.state.currentLat,
                longitude: this.state.currentLong,
                latitudeDelta: this.state.latDelta,
                longitudeDelta: this.state.longDelta
              }}
            />
          </TabBarIOS.Item>
        </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25
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
    marginTop: 25,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});

AppRegistry.registerComponent('new2nyc', () => new2nyc);
