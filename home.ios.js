import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
  ImageBackground
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
      <ImageBackground
        source={require('./nyc.jpg')}
        style={styles.container}
      >
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to NYC!</Text>
          <Text style={styles.welcomeBlurb}>new2nyc is here to help{'\n'} you feel right at home</Text>
          <TouchableHighlight
            onPress={() => this.goToMain()}
            underlayColor='rgba(0,0,0,0)'
            activeOpacity={0.7}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                Get Started
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: null,
    height: null,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  welcome: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10
  },
  welcomeBlurb: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#33aaff',
    marginBottom: 5,
    padding: 10,
    borderRadius: 4
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
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
