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
  TouchableOpacity,
  Picker
} from 'react-native';
import MapView from 'react-native-maps';
import Autocomplete from 'react-native-autocomplete-input';
import countryData from './data';

export default class new2nyc extends Component {
  constructor() {
    super()
    this.state = {
      selectedTab: 0,
      currentLat: 0,
      currentLong: 0,
      latDelta: 0.005,
      longDelta: 0.2,
      places: [
        {
          name: 'Empire State Building',
          lat: 40.7484,
          long: -73.9857,
        },
        {
          name: 'Citi Field',
          lat: 40.7571,
          long: -73.8458,
        }
      ],
      countries: countryData,
      query: ''
    };
    this._setLocation = this._setLocation.bind(this);
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

  findCountry(query) {
    if (query === '') {
      return [];
    }

    const { countries } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return countries.filter(country => country.title.search(regex) >= 0);
  }

  render() {
    const { query } = this.state;
    const country = this.findCountry(query);
    return (
        <TabBarIOS>
          <TabBarIOS.Item
            systemIcon="favorites"
            selected={this.state.selectedTab === 0}
            onPress={this._handleTabChange.bind(this, 0)}>
            <View style={styles.container}>
              <Text>Where you from</Text>
              <Autocomplete
                data={country}
                defaultValue={query}
                onChangeText={text => this.setState({ query: text })}
                renderItem={({ title, consulate }) => (
                  <TouchableOpacity onPress={() => {
                      this.setState({ query: title })
                      this._handleTabChange(1)
                      this._setLocation(consulate.lat, consulate.long)
                    }
                  }>
                    <Text>
                      {title}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                onPress={() => {
                  this._clickableLocation('Empire State Building')
                  this._handleTabChange(1)
                }}>
                <Text>Empire State Building</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this._clickableLocation('Citi Field')
                  this._handleTabChange(1)
                }}>
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
