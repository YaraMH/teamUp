import React from "react";
import { Button, StyleSheet, Text, ScrollView, View } from "react-native";
import * as firebase from 'firebase';

import NotificationCard from '../components/NotificationCard';

class NotificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      games: [],
      attendingGames: [],
    }
    this.state.userID = firebase.auth().currentUser.uid;
    var database = firebase.database();
    var commentsRef = firebase.database().ref('gameAttendees');
    commentsRef.on('child_added', (data) => {
      const newItem = data.val().Attendees;
      console.log(newItem);
      console.log(data.key);
      for(var i=0;i<newItem.length;i++){
        if(newItem[i]==this.state.userID)
        { 
          console.log(newItem);
          if (this.state.attendingGames===[]) {
            this.setState({attendingGames: [newItem]}) ;
           }         
            else{
              this.setState({attendingGames: [...this.state.attendingGames, newItem]});
           }
           //if (this.state.games===[]) {
           // this.setState({games: [data.getKey()]}) ;
           //}         
           // else{
           //   this.setState({games: [...this.state.games, data.getKey()]});
           //}
        }
      }
      
    });
  }
  render(){
    return (
      <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.headerTitle}>
              <Text style={{color: 'black'}}>Team</Text>
              <Text style={{color: '#339CFF'}}>Up</Text>
          </Text>
      </View>
      <NotificationCard></NotificationCard>
      <NotificationCard></NotificationCard>
      <NotificationCard></NotificationCard>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
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
});

export default NotificationScreen;