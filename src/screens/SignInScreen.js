import React, {  } from "react";
import { Button, CheckBox, TouchableOpacity, Alert, StyleSheet, TextInput, View, Text } from "react-native";
import * as firebase from 'firebase';

import Header from '../components/Header';

export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isRememberMe: false,
    }
  }
  onLoginPress = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => {
            //this.props.navigation.navigate('Root');
          }, (error) => {
            Alert.alert("Sign in Failed",error.message);
          });
  }
  onSignupPress = () => {
    this.props.navigation.navigate('SignUpScreen');
  }
  onForgotPasswordPress = () => {
    this.props.navigation.navigate('ForgotPasswordScreen');
  }

  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <TextInput
            style={styles.textInputStyle}
            placeholder="Email"
            value={this.state.email}
            onChangeText={(text) => { this.setState({email: text}) }}
        ></TextInput>
        <TextInput
            style={styles.textInputStyle}
            placeholder="Password"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(text) => { this.setState({password: text}) }} 
        ></TextInput>
        <View style={styles.checkboxContainer}>
          <CheckBox
            style={styles.checkbox}
            value={this.state.isRememberMe}
            onValueChange={(state) => { this.setState({isRememberMe: state}) }}
          />
          <Text style={styles.rememberUserLabel}>Remember Me</Text>
          <TouchableOpacity
            onPress={this.onForgotPasswordPress}
            style={{flexDirection: "row", marginTop: '8%', marginLeft: 80}}
            >
            <Text style={styles.forgotPasswordLabel}>Forgot Password?</Text>
          </TouchableOpacity>
          
        </View>
        <Button title="Login"
          style={styles.button}
          onPress={this.onLoginPress}
        ></Button>
        <View style={styles.signUp}>
          <Text style={{color: 'black'}}>Don't have an account?</Text>
          <TouchableOpacity
          onPress={this.onSignupPress}
          >
            <Text style={{color: '#339CFF', fontWeight: 'bold'}}>  Sign Up</Text>
        </TouchableOpacity>
        </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    padding: 20,
  },
  textInputStyle: {
    height: 40,
    margin: 12,
    borderRadius: 30,
    paddingLeft: 8,
    borderWidth: 1,
  },
  checkbox: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: '6.5%',
    marginLeft: 12
  },
  rememberUserLabel: {
    color: 'black',
    flexDirection: "row",
    marginTop: '8%',
    marginLeft: 4,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  forgotPasswordLabel: {
    color: 'black',
    textDecorationLine: 'underline'
  },
  signUp: {
    flexDirection: "row",
    marginTop: 10,
  }
});
