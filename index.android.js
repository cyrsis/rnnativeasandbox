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
  View
} from 'react-native';
import AppContainer from "./app/AppContainer";

export default class rnnativeasandbox extends Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}


AppRegistry.registerComponent('rnnativeasandbox', () => rnnativeasandbox);
