import React, { useState, useEffect } from 'react';
import { Button, Alert, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import * as firebase from 'firebase';

function GamesDetails({ route, navigation }) {
  const { gameinfo } = route.params;
  const {gameCreatorName} = route.params;
  const {gameCreatorEmail} = route.params;
  const {gameDate} = route.params;
  const [missingPlayers, updateMissingPlayers] = useState(gameinfo.missingPlayers);
  const [buttonDisabled, changeButtonState] = useState( () => {
    if(parseInt(gameinfo.missingPlayers)==0)
      return true;
    else {
    var database = firebase.database();
    var userId = firebase.auth().currentUser.uid;
    const dbRef = firebase.database().ref();
    var Attendees = [];
    var disable = false;
    dbRef.child("gameAttendees").child(gameinfo.gameID).get().then((snapshot) => {
      if (snapshot.exists()) {
        Attendees = snapshot.val().Attendees;
        //console.log(Attendees);
        for(var i=0;i<Attendees.length;i++){
          if(Attendees[i]==userId){
            return true;
          }
        }
      } else {
        console.log("no value");
        return false;
      }
    }).catch((error) => {
      console.error(error);
    });
  }});
  JoinOrLeaveGame = () => {
    var database = firebase.database();
    var userId = firebase.auth().currentUser.uid;
    const dbRef = firebase.database().ref();
    var Attendees = [];
    var lMissingPlayers = missingPlayers;
    dbRef.child("gameAttendees").child(gameinfo.gameID).get().then((snapshot) => {
      if (snapshot.exists()) {
        Attendees = snapshot.val().Attendees;
        Attendees.push(userId);
        firebase.database().ref('gameAttendees/' + gameinfo.gameID).set({
           Attendees
        });
        lMissingPlayers = parseInt(gameinfo.totalPlayers) - Attendees.length;
        updateMissingPlayers(lMissingPlayers);
        console.log(missingPlayers);
        var updates = {};
        updates['/games/' + gameinfo.gameID + '/missingPlayers'] = lMissingPlayers;   
        firebase.database().ref().update(updates);
      } else {
        Attendees[0] = userId;
        firebase.database().ref('gameAttendees/' + gameinfo.gameID).set({
          Attendees
       });
       lMissingPlayers = parseInt(gameinfo.totalPlayers) - Attendees.length;
        updateMissingPlayers(lMissingPlayers);
        console.log(lMissingPlayers);
        var updates = {};
         updates['/games/' + gameinfo.gameID + '/missingPlayers'] = lMissingPlayers;   
        firebase.database().ref().update(updates);
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    Alert.alert("You have successfully joined the game");
    changeButtonState(true);
        //this.props.navigation.navigate('ProfileScreen');
  }
  return (
      <ScrollView>
      <View style={styles.container}>
        <View style={{textAlign: 'left', marginTop: '8%', marginLeft: '5%', marginRight: '5%'}}>
          <Text style={styles.descriptionLabel}>Game Creator Name</Text><Text style={styles.description}>{gameCreatorName}</Text>
          <Text style={styles.descriptionLabel}>Game Creator Email</Text><Text style={styles.description}>{gameCreatorEmail}</Text>
          <Text style={styles.descriptionLabel}>Date</Text><Text style={styles.description}>{gameDate}</Text>
          <Text style={styles.descriptionLabel}>Time</Text><Text style={styles.description}>{gameinfo.gameTime}</Text>
          <Text style={styles.descriptionLabel}>Field Name</Text><Text style={styles.description}>{gameinfo.fieldName}</Text>
          <Text style={styles.descriptionLabel}>Field Location</Text><Text style={styles.description}>{gameinfo.fieldLocation}</Text>
          <Text style={styles.descriptionLabel}>Field Surfae Type</Text><Text style={styles.description}>{gameinfo.fieldSurfaceType}</Text>
          <Text style={styles.descriptionLabel}>Game type</Text><Text style={styles.description}>{gameinfo.totalPlayers/2}vs{gameinfo.totalPlayers/2}</Text>
          <Text style={styles.descriptionLabel}>Available Places</Text><Text style={styles.description}>{missingPlayers}</Text>
        </View>
        <Button title="Join Now"
              onPress={JoinOrLeaveGame}
              disabled={buttonDisabled}
        ></Button>
        </View>
      </ScrollView>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    marginBottom: '5%'
  },
  header: {
    marginBottom: 40,
    height: '10%',
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

export default GamesDetails;

//add currently atttending users