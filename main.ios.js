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
import countries from './data';

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      selectedTab: 0,
      currentLat: 0,
      currentLong: 0,
      latDelta: 0.005,
      longDelta: 0.2,
      markers: [],
      countries: countries,
      query: '',
      homeScreen: true
    };
    this._setLocation = this._setLocation.bind(this);
  }

  componentWillMount() {
    console.log(countries);
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
    console.log(this.state);
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
    const homeScreen = this.state.homeScreen;
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          systemIcon="favorites"
          selected={this.state.selectedTab === 0}
          onPress={this._handleTabChange.bind(this, 0)}>
          <View style={styles.container}>
            <Text style={styles.inputLabel}>What country are you from?</Text>
            <Autocomplete
              style={styles.input}
              data={country}
              defaultValue={query}
              onChangeText={text => this.setState({ query: text })}
              renderItem={({ title, places }) => (
                <TouchableOpacity onPress={() => {
                    this.setState({ query: title })
                    this.setState({ markers: places })
                    this._handleTabChange(1)
                  }
                }>
                  <Text>
                    {title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="featured"
          selected={this.state.selectedTab === 1}
          onPress={this._handleTabChange.bind(this, 1)}>
          <MapView
            style={styles.map}
            showsUserLocation={true}
            region={{
              latitude: this.state.currentLat,
              longitude: this.state.currentLong,
              latitudeDelta: this.state.latDelta,
              longitudeDelta: this.state.longDelta
            }}
          >
            {this.state.markers.map(marker => (
              <MapView.Marker
                key={marker.title}
                coordinate={marker.latlng}
                title={marker.title}
              />
            ))}
          </MapView>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputLabel: {
    margin: 10,
    fontSize: 20
  },
  input: {
    margin: 10,
    width: 300
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
