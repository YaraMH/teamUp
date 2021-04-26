import React from "react";
import { Button, Alert, boolean, StyleSheet, TextInput, View, Text, ScrollView, TouchableOpacity } from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import * as firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { watchUserData } from './../redux/app-redux'

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
const mapStateToProps = (state) => {
  return {
    userData: state.userData
   };
 }
 const mapDispatchToProps = (dispatch) => {
  return { 
    watchUserData: () => dispatch(watchUserData())
  };
 }
class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      newFullName: "",
      gender: "",
      newGender: "",
      country: "",
      newCountry: "",
      city: "",
      newCity: "",
      fitnessLevel: "",
      newFitnessLevel: "",
      footballProficiency: "",
      newFootballProficiency: "",
      email: "",
      newEmail: "",
      userId: "",
    }
    this.props.watchUserData();
    var database = firebase.database();
    this.state.userId = firebase.auth().currentUser.uid;
    this.state.email = this.props.userData.email;
    this.state.newEmail = this.state.email;
    this.state.fullName = this.props.userData.fullName;
    this.state.newFullName = this.state.fullName;
    this.state.gender = this.props.userData.gender;
    this.state.newGender = this.state.gender;
    this.state.country = this.props.userData.country;
    this.state.newCountry = this.state.country;
    this.state.city = this.props.userData.city;
    this.state.newCity = this.state.city;
    this.state.fitnessLevel = this.props.userData.fitnessLevel;
    this.state.newFitnessLevel = this.state.fitnessLevel;
    this.state.footballProficiency = this.props.userData.proficiencyLevel;
    this.state.newFootballProficiency = this.state.footballProficiency ;
  }
  onSignOutPress = () => {
    firebase.auth().signOut();
  }
  updateUserInfo = () => {
    if (this.state.fullName=="" || this.state.email=="" || this.state.gender=="" || this.state.country=="" || this.state.city=="" || this.state.fitnessLevel=="" || this.state.proficiencyLevel=="") {
      Alert.alert("Missing Fields!","Please fill all fields then click on Save again");
      return;
    }
    var updates = {};
    updates['/users/' + this.state.userId + '/fullName'] = this.state.newFullName;   
    updates['/users/' + this.state.userId + '/gender'] = this.state.newGender;
    updates['/users/' + this.state.userId + '/proficiencyLevel'] = this.state.newFootballProficiency;
    updates['/users/' + this.state.userId + '/fitnessLevel'] = this.state.newFitnessLevel;
    updates['/users/' + this.state.userId + '/country'] = this.state.newCountry;
    updates['/users/' + this.state.userId + '/city'] = this.state.newCity;
    if (this.state.newEmail !== this.state.email) {
      updates['/users/' + this.state.userId + '/email'] = this.state.newEmail;
      var user = firebase.auth().currentUser;
      firebase.database().ref().update(updates);   
      firebase.auth().signOut();
      Alert.alert("Update Successfull!", "Please sign in again using your new email!");      
    user.updateEmail(this.state.newEmail).then(function() {
    }).catch(function(error) {
      Alert.alert("Update Failed!","We could not update your email, please try again");
      return;
    });
    }
    else{
      firebase.database().ref().update(updates);   
      this.props.navigation.navigate('ProfileScreen');      
    }
    
  }
  onBackPress = () => {
    this.props.navigation.navigate('ProfileScreen')
  }
  onChangePasswordPress = () => {
    this.props.navigation.navigate('ForgotPasswordScreenEditProfile');
  }


  render() {
    let genderIndex = -1;
    let proficiencyIndex =-1;
    let fitnessIndex=-1;
    if(this.props.userData.gender==="Female") {
      genderIndex=0;
    }        
    else {
      genderIndex=1;
    } 
    if(this.props.userData.proficiencyLevel==="Beginner") {
      proficiencyIndex=0;
    } 
    else if (this.props.userData.proficiencyLevel==="Intermediate") {
      proficiencyIndex=1;
    }        
    else {
      proficiencyIndex=2;
    } 
    if(this.props.userData.fitnessLevel==="Below Average") {
      fitnessIndex=0;
    } 
    else if (this.props.userData.fitnessLevel==="Average") {
      fitnessIndex=1;
    }        
    else {
      fitnessIndex=2;
    } 
    return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.headerTitle}>
            <Text style={{color: '#339CFF'}}>Edit Profile</Text>
        </Text>
        <TouchableOpacity
          onPress={this.onBackPress}
          style={{position: 'absolute', top: '70%', left: '5%'}}
          >
          <FontAwesome name="arrow-left" size={32} color="#339CFF" 
                />
          </TouchableOpacity>
    </View>
    <TouchableOpacity
            onPress={this.onChangePasswordPress}
            style={{flexDirection: "row", margin: 15}}
            >
            <Text style={styles.changePasswordLabel}>Change Password</Text>
          </TouchableOpacity>
    <TextInput
        style={styles.textInputStyle}
        placeholder="full name"
        value={this.state.newFullName}
        onChangeText={(text) => { this.setState({newFullName: text}) }}
    ></TextInput>
    <TextInput
        style={styles.textInputStyle}
        placeholder="Email"
        value={this.state.newEmail}
        onChangeText={(text) => { this.setState({newEmail: text}) }}
    ></TextInput>
    <TextInput
        style={styles.textInputStyle}
        placeholder="Country"
        value={this.state.newCountry}
        onChangeText={(text) => { this.setState({newCountry: text}) }}
    ></TextInput>
    <TextInput
        style={styles.textInputStyle}
        placeholder="City"
        value={this.state.newCity}
        onChangeText={(text) => { this.setState({newCity: text}) }}
    ></TextInput>
    <View
    style={styles.radioFormSelector}>
    <Text
    style={styles.label}
    >Select Gender</Text>
    <RadioForm
      radio_props={radio_gender_props}
      onPress={(value) => {this.setState({newGender: value})}}
      initial={genderIndex}    
    />
    </View>
    <View
      style={styles.radioFormSelector}>
      <Text
        style={styles.label}
      >Select your fitness level</Text>
      <RadioForm
        radio_props={radio_fitnessLevel_props}
        onPress={(value) => {this.setState({newFitnessLevel: value})}}
        initial={fitnessIndex}
        
      />
    </View>
    <View
      style={styles.radioFormSelector}>
      <Text
        style={styles.label}
      >Select your football proficiency level</Text>
      <RadioForm
        radio_props={radio_proficiencyLevel_props}
        onPress={(value) => {this.setState({newFootballProficiency: value})}}
        initial={proficiencyIndex}       
      />
    </View>
    <Button title="Save"
          onPress={this.updateUserInfo}
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
    marginBottom: '5%'
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
  },
  header: {
    marginBottom: 40,
    height: '8%',
    alignContent: 'center'
},
headerTitle: {
    marginTop: '10%',
    paddingTop: '2%',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
},
changePasswordLabel: {
  color: '#339CFF',
  textDecorationLine: 'underline',
  fontWeight: 'bold'
},
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);