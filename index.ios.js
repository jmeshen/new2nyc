/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS
} from 'react-native';
import Home from './home.ios'

export default class new2nyc extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Home,
          title: 'new2nyc',
          navigationBarHidden: true
        }}
        style={{flex: 1}}
      />
    );
  }
}

AppRegistry.registerComponent('new2nyc', () => new2nyc);
