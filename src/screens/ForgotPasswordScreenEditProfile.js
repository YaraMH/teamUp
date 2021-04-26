import React, {  } from "react";
import { Button, CheckBox, Alert, TouchableOpacity, StyleSheet, TextInput, View, Text } from "react-native";
import * as firebase from 'firebase';

import Header from '../components/Header';

export default class ForgotPasswordScreenEditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    }
  }
  passwordReset = () => {
    firebase.auth().sendPasswordResetEmail(this.state.email)
        .then(() => {
           Alert.alert("Change email has been sent."); 
           this.props.navigation.navigate('EditProfileScreen');
        }, (error) => {
            Alert.alert(error.message);
        });
  }
  
  backToEditProfile =() => {
    this.props.navigation.navigate('EditProfileScreen');
  }
  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <TouchableOpacity
                style={{position: 'absolute', left: '2%', top: '5%'}}
                onPress={this.backToEditProfile}
              >
                <Text style={{color: '#339CFF', fontWeight: 'bold'}}>Back To Edit Profile</Text>
             </TouchableOpacity>
        <TextInput
            style={styles.textInputStyle}
            placeholder="Email"
            value={this.state.email}
            onChangeText={(text) => { this.setState({email: text}) }}
        ></TextInput>
        <Button title="Change Password"
          style={styles.button}
          onPress={this.passwordReset}
        ></Button>

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
    flexDirection: "row",
    marginTop: '8%',
    marginLeft: 80,
    textDecorationLine: 'underline'
  },
  signUp: {
    flexDirection: "row",
    marginTop: 10,
  }
});
