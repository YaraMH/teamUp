import React from "react";
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

import { watchUserData } from './../redux/app-redux';


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
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    }
    this.props.watchUserData();
  }
  setUpdateUserName = snapshot => {
    this.state.fullName = snapshot.val();  
  }
  onSignOutPress = () => {
    firebase.auth().signOut();
  }

  
  render() {  

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
              <Text style={{color: 'black'}}>Team</Text>
              <Text style={{color: '#339CFF'}}>Up</Text>
          </Text>
          <TouchableOpacity
          onPress={this.onSignOutPress}
          >
          <FontAwesome name="sign-out" size={32} color="black" 
                style={{marginLeft: '5%', marginTop: '60%'}}
                />
          </TouchableOpacity>
          </View>
          <View style={{alignSelf: 'center', textAlign: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{ this.props.userData.fullName }</Text>
            <Text>{ this.props.userData.email }</Text>
          </View>
          <View style={{textAlign: 'left', marginTop: '8%', marginLeft: '5%', marginRight: '5%'}}>
            <Text style={styles.descriptionLabel}>Gender</Text><Text style={styles.description}>{ this.props.userData.gender }</Text>
            <Text style={styles.descriptionLabel}>Location</Text><Text style={styles.description}>{ this.props.userData.country }/{ this.props.userData.city }</Text>
            <Text style={styles.descriptionLabel}>Fitness Level</Text><Text style={styles.description}>{ this.props.userData.fitnessLevel }</Text>
            <Text style={styles.descriptionLabel}>Football Proficiency</Text><Text style={styles.description}>{ this.props.userData.proficiencyLevel }</Text>
        </View>
        <TouchableOpacity
            style={{position:'absolute',bottom: '5%', right: '3%',alignSelf:'flex-end'}}
            onPress={() => this.props.navigation.navigate('EditProfileScreen')}
            >
        <MaterialCommunityIcons name="circle-edit-outline" size={50} color="black"/>
        </TouchableOpacity>
    </View>
    );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
  },
  header: {
    marginBottom: 40,
    height: '12%',
    flexDirection: 'row',
    borderBottomColor: '#339CFF',
    borderBottomWidth: 1,
},
headerTitle: {
    marginTop: '5%',
    paddingTop: '2%',
    marginLeft: '5%',
    fontSize: 25,
    fontWeight: 'bold',
    flex: 1,
},
description: {
  fontSize: 16,
  marginBottom: '10%',
  fontWeight: 'bold',
  paddingBottom: '2%',
  borderBottomColor: '#80ccff',
  borderBottomWidth: 1,
},
descriptionLabel: {
  fontSize: 16,
}
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
