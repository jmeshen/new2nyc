import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Main from './main.ios'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {}
  }

  goToMain() {
    this.props.navigator.push({
      component: Main,
      navigationBarHidden: true,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to NYC!</Text>
        <TouchableHighlight onPress={() => this.goToMain()}>
          <Text>
            Get Started
          </Text>
        </TouchableHighlight>
      </View>
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
