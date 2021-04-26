import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import * as firebase from 'firebase';

import AppNavigator from './src/navigation/AppNavigator';
import AuthenticatedNavigator from './src/navigation/AuthenticatedNavigator';
import { store } from './src/redux/app-redux';
import ApiKeys from './src/constants/ApiKeys';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticationComplete: false,
      isAuthenticated: false,
      isLoadingComplete: false,
      isUserDataComplete: false,
    }     
      if (!firebase.apps.length) {
        firebase.initializeApp(ApiKeys.FireBaseConfig);
      }
      firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    this.setState({isAuthenticationComplete: true});
    this.setState({isAuthenticated: !!user});
  }

  render() { 
    return (
    <Provider store={store}>
      {(this.state.isAuthenticated) ? <AuthenticatedNavigator/> : <AppNavigator/>}
    </Provider>
  );
}

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {    
    width: 100,    
    height: 100,  
  },
});