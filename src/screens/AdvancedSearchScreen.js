import React from "react";
import { Button, StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { connect } from 'react-redux';
import * as firebase from 'firebase';


import { watchUserData } from './../redux/app-redux';
import Card from '../components/Card';

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
   };
 }
 const mapDispatchToProps = (dispatch) => {
  return { 
    watchUserData: () => dispatch(watchUserData()),
  };
 }

class AdvancedSearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    }
    this.props.watchUserData();
    var database = firebase.database();
  }
  sortGameArray(gameArray){
    var arraySize = gameArray.length;
    for (var i = 0; i < arraySize-1; i++){
      for (var j = 0; j < arraySize-i-1; j++){
        if (Date.parse(gameArray[j].gameDate) > Date.parse(gameArray[j+1].gameDate))
                {
                    var temp = gameArray[j];
                    gameArray[j] = gameArray[j+1];
                    gameArray[j+1] = temp;
                }
       else if (Date.parse(gameArray[j].gameDate) == Date.parse(gameArray[j+1].gameDate)){
         if(gameArray[j].gameTime.replace(':','') > gameArray[j+1].gameTime.replace(':',''))
         {
                   var temp = gameArray[j];
                   gameArray[j] = gameArray[j+1];
                   gameArray[j+1] = temp;
         }
       }
      }
    }
    return gameArray;
  }
 componentDidMount() {
   var database = firebase.database();
   var commentsRef = firebase.database().ref('games');
   commentsRef.on('child_added', (data) => {
     const newItem = data.val()
     if(Date.parse(newItem.gameDate) >= Date.parse(new Date()) ){
     if (this.state.games===[]) {
      this.setState({games: [newItem]}) ;
     }         
      else{
        this.setState({games: [...this.state.games, newItem]});
     }
    }
   });
   commentsRef.on('child_changed', (data) => {
    const newItem = data.val()
     if(Date.parse(newItem.gameDate) >= Date.parse(new Date()) ){
      for(var a=0; a<this.state.games.length;a++){
        if(this.state.games[a].gameID==newItem.gameID){
          let games = [...this.state.games];
          games.splice(a,1);
          games.splice(a, 0, newItem);
          this.setState({games});
        }
      }
    }
  });
  }
  
  render() {
    if(this.state.games.length==0){
      return(
        <ScrollView>
        <View style={styles.container}> 
        <View style={styles.header}>
            <Text style={styles.headerTitle}>
                <Text style={{color: 'black'}}>Find A Game</Text>
            </Text>
        </View>
          <View style={styles.body}>
          <Text style={{fontSize: 18, margin: 20}}>There is no currently active games for you to join.</Text>
          <Text style={{fontSize: 18, margin: 20}}>You can always create a game yourself by navigating to the create game screen!</Text>
          </View> 
        </View>
        </ScrollView>
        );
    }
    else{
    return(
    <ScrollView>
    <View style={styles.container}> 
    <View style={styles.header}>
        <Text style={styles.headerTitle}>
            <Text style={{color: 'black'}}>Find A Game</Text>
        </Text>
    </View>
      <View style={styles.body}>
      { this.state.games.map(type => <Card gameData = {type} navigation={this.props.navigation} />)}
      </View> 
    </View>
    </ScrollView>
    );
  }
}}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
  },
body: {
  height: '100%',
  marginTop: '5%',
  marginBottom: '10%'
},
header: {
  marginTop: '7%',
  alignContent: 'center'
},
headerTitle: {
  marginTop: '3%',
  paddingTop: '2%',
  fontSize: 20,
  fontWeight: 'bold',
  flex: 1,
  alignSelf: 'center',
  textAlign: 'center'
}
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchScreen);