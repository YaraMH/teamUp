import React from "react";
import { Button, Alert, TouchableOpacity, StyleSheet, TextInput, View, Text, ScrollView } from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import * as firebase from 'firebase';

import Header from '../components/Header';


var radio_gender_props = [
  {label: 'Female', value: 'Female' },
  {label: 'Male', value: 'Male' }
];
var radio_fitnessLevel_props = [
  {label: 'Below Average', value: 'Below Average'},
  {label: 'Average', value: 'Average'},
  {label: 'Above Average', value: 'Above Average'},
];
var radio_proficiencyLevel_props = [
  {label: 'Beginner', value: 'Beginner'},
  {label: 'Intermediate', value: 'Intermediate'},
  {label: 'Advanced', value: 'Advanced'},
];

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      gender: "",
      country: "",
      city: "",
      fitnessLevel: "",
      proficiencyLevel: "",
      passwordConfirm: "",
      userId: "",
    }
  }
  onSignupPress = () => {
    if(this.state.password !== this.state.passwordConfirm) {
      Alert.alert("Passwords do not match");
      return;
    }
    else if (this.state.fullName=="" || this.state.email=="" || this.state.gender=="" || this.state.country=="" || this.state.city=="" || this.state.fitnessLevel=="" || this.state.proficiencyLevel=="") {
      Alert.alert("Missing Fields!","Please fill all fields then click on Sign Up again");
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then( () => {
      var database = firebase.database();
      var userId = firebase.auth().currentUser.uid;
      this.writeUserData(userId, this.state.fullName, this.state.email, this.state.gender, this.state.country, this.state.city, this.state.fitnessLevel, this.state.proficiencyLevel);
      firebase.auth().signOut();
      Alert.alert("Sign Up Successfull","Please sign in using your created account");
    }, (error) => {
        Alert.alert(error.message)
    });

  }
  backToLogin =() => {
    this.props.navigation.navigate('SignInScreen');
  }

  writeUserData = (userId, fullName, email, gender, country, city, fitnessLevel, proficiencyLevel) => {
    firebase.database().ref('users/' + userId).set({
      fullName: fullName,
      email: email,
      gender: gender,
      country: country,
      city: city,
      fitnessLevel: fitnessLevel,
      proficiencyLevel: proficiencyLevel
    });
  }

  render() {
    return (
      <ScrollView>
          <View style={styles.container}>
            <Header/>
            <TouchableOpacity
                style={{position: 'absolute', left: '2%', top: '5%'}}
                onPress={this.backToLogin}
              >
                <Text style={{color: '#339CFF', fontWeight: 'bold'}}>  Back To Sign in</Text>
             </TouchableOpacity>
            <TextInput
                style={styles.textInputStyle}
                placeholder="FullName"
                onChangeText={(text) => { this.setState({fullName: text}) }}
            ></TextInput>
            <TextInput
                style={styles.textInputStyle}
                placeholder="Email"
                onChangeText={(text) => { this.setState({email: text}) }}
            ></TextInput>
            <TextInput
                style={styles.textInputStyle}
                placeholder="Password"
                secureTextEntry={true} 
                onChangeText={(text) => { this.setState({password: text}) }}
            ></TextInput>
            <TextInput
                style={styles.textInputStyle}
                placeholder="Confirm Password"
                secureTextEntry={true} 
                onChangeText={(text) => { this.setState({passwordConfirm: text}) }}
            ></TextInput>
            <TextInput
                style={styles.textInputStyle}
                placeholder="Country"
                onChangeText={(text) => { this.setState({country: text}) }}
            ></TextInput>
            <TextInput
                style={styles.textInputStyle}
                placeholder="City"
                onChangeText={(text) => { this.setState({city: text}) }}
            ></TextInput>
            <View
            style={styles.radioFormSelector}>
            <Text
            style={styles.label}
            >Select Gender</Text>
            <RadioForm
              radio_props={radio_gender_props}
              initial={'Female'}
              onPress={(value) => {this.setState({gender: value})}}
            />
            </View>           
            <View
              style={styles.radioFormSelector}>
              <Text
                style={styles.label}
              >Select your fitness level</Text>
              <RadioForm
                radio_props={radio_fitnessLevel_props}
                initial={'Below Average'}
                onPress={(value) => {this.setState({fitnessLevel: value})}}
              />
            </View>
            <View
              style={styles.radioFormSelector}>
              <Text
                style={styles.label}
              >Select your football proficiency level</Text>
              <RadioForm
                radio_props={radio_proficiencyLevel_props}
                initial={'Beginner'}
                onPress={(value) => {this.setState({proficiencyLevel: value})}}
              />
            </View>
            <Button title="Sign Up"
                  onPress={this.onSignupPress}
            ></Button>            
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    padding: 20
  },
  textInputStyle: {
    height: 40,
    margin: 12,
    borderRadius: 30,
    paddingLeft: 8,
    borderWidth: 1,
    borderColor: '#339CFF'
  },
  radioFormSelector: {
    marginTop: 12,
    marginBottom:12, 
    paddingLeft: 20,
  },
  label: {
    marginBottom: 6,
    fontWeight: 'bold',
    fontSize: 16,
  }
});
