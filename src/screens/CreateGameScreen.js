import React from "react";
import { Button, Alert, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard, ScrollView} from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { TextInputMask } from 'react-native-masked-text'
import * as firebase from 'firebase';

var radio_field_type = [
  {label: 'Natural Turf', value: 'Natural Turf' },
  {label: 'Artificial Turf', value: 'Artificial Turf' }
];
class CreateGameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameDate: "",
      gameTime: "",
      totalPlayers: "",
      missingPlayers: "",
      fieldName: "",
      fieldLocation: "",
      fieldSurfaceType: "Artificial Turf",
    }
    
  }
  createGame = () => {
    const isValid = this.datetimeField.isValid();
    const isValid1 = this.timeField.isValid()
    if (this.state.gameDate=="" || this.state.gameTime=="" || this.state.totalPlayers=="" || this.state.missingPlayers=="" || this.state.fieldName=="" || this.state.fieldLocation=="" || this.state.fieldSurfaceType=="") {
      Alert.alert("Missing Fields!","Please fill all fields then click on create");
      return;
    }
    else if (!isValid) {
      Alert.alert("Invalid Date!","Please enter a valid date");
      return;
    }
    else if (!isValid1) {
      Alert.alert("Invalid time!","Please enter a valid game time");
      return;
    }
    else if(parseInt(this.state.missingPlayers, 8)>parseInt(this.state.totalPlayers, 8)){
      Alert.alert("Missing Players Error","Missing players cannot be more than the total required players");
      return;
    }
    var database = firebase.database();
    var postListRef = firebase.database().ref('games');
    var newPostRef = postListRef.push();
    var userId = firebase.auth().currentUser.uid;
    var gameid = Date.parse(new Date());
    postListRef.child(gameid).set({
      gameID: gameid,
      gameDate: this.state.gameDate,
      gameTime: this.state.gameTime,
      totalPlayers: this.state.totalPlayers,
      missingPlayers: this.state.missingPlayers,
      fieldName: this.state.fieldName,
      fieldLocation: this.state.fieldLocation,
      fieldSurfaceType: this.state.fieldSurfaceType,
      creatorID: userId,
    });
    var attendeeListRef = firebase.database().ref('gameAttendees');
    var Attendees = [];
    var unknownPlayers = this.state.totalPlayers - this.state.missingPlayers;
    for (var i=0;i<unknownPlayers;i++){
      if (Attendees.length==0){
        Attendees=["unknown"];
      }
      else
        Attendees=[...Attendees, "unknown"];
    }
    attendeeListRef.child(gameid).set({
        Attendees,
    });
    Alert.alert("Creation successfull!","You have successfully created a game");
    this.setState({ gameDate: ""});
    this.setState({ gameTime: ""});
    this.setState({ totalPlayers: ""});
    this.setState({ missingPlayers: ""});
    this.setState({ fieldName: ""});
    this.setState({ fieldLocation: ""});
    this.setState({ fieldSurfaceType: "Artificial Turf"});
  }
  render() {
    return (
  <TouchableWithoutFeedback 
  onPress={() => Keyboard.dismiss()}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
  <View style={styles.container}>
     <View style={styles.header}>
        <Text style={styles.headerTitle}>
            <Text style={{color: 'black'}}>Create Game</Text>
        </Text>
    </View>
    <View style={{margin: 3}}>
    <Text  style={styles.label}>Please select the game date (format YYYY-MM-DD)</Text>
    <TextInputMask
        style={styles.textInputStyle}
        type={'datetime'}
        options={{
          format: 'YYYY-MM-DD'
        }}
        value={this.state.gameDate}
        onChangeText={text => {
          this.setState({
            gameDate: text
          })
        }}
        ref={(ref) => this.datetimeField = ref}
      />
    </View>
    <View style={{margin: 3}}>
    <Text  style={styles.label}>Please select the game time (format HH:mm)</Text>
    <TextInputMask
        style={styles.textInputStyle}
        type={'datetime'}
        options={{
          format: 'HH:mm'
        }}
        value={this.state.gameTime}
        onChangeText={text => {
          this.setState({
            gameTime: text
          })
        }}
        ref={(ref) => this.timeField = ref}
      />
    </View>
    <View>
      <Text  style={styles.label}>Please enter the total number of required players</Text>
      <TextInput
        style={styles.textInputStyle}
        keyboardType = 'numeric'
        value={this.state.totalPlayers}
        onChangeText={text => {
          this.setState({
            totalPlayers: text
          })
        }}
    ></TextInput>
      <Text  style={styles.label}>Please enter the number of missing players </Text>
      <TextInput
        style={styles.textInputStyle}
        keyboardType = 'numeric'
        value={this.state.missingPlayers}
        onChangeText={text => {
          this.setState({
            missingPlayers: text
          })
        }}
    ></TextInput>
    </View>
    <View>
      <Text  style={styles.label}>Please enter the field name</Text>
      <TextInput
        style={styles.textInputStyle}
        value={this.state.fieldName}
        onChangeText={text => {
          this.setState({
            fieldName: text
          })
        }}
    ></TextInput>
      <Text  style={styles.label}>Please enter the field location</Text>
      <TextInput
        style={styles.textInputStyle}
        multiline={true}
        value={this.state.fieldLocation}
        onChangeText={text => {
          this.setState({
            fieldLocation: text
          })
        }}
    ></TextInput>
      </View>
      <View
      style={styles.radioFormSelector}>
      <Text
        style={styles.label}
      >Select the field surface type</Text>
      <RadioForm
        radio_props={radio_field_type}
        initial={1}
        onPress={(value) => {this.setState({fieldSurfaceType: value})}}
      />
    </View>
    <View style={styles.button}>
    <Button title="Create"
          onPress={this.createGame}
    ></Button>
    </View>
  </View>
  </ScrollView>
  </TouchableWithoutFeedback>
  );
  }}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    padding: 20
  },
  header: {
    marginBottom: 40,
    height: '10%',
    flexDirection: 'row',
},
headerTitle: {
    marginTop: '3%',
    paddingTop: '2%',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center'
},
textInputStyle: {
  height: 40,
  margin: 3,
  padding: 12,
  borderWidth: 1,
  borderColor: 'black'
},
label: {
  marginBottom: 6,
  fontSize: 14,
},
radioFormSelector: {
  margin: 3,
  marginBottom: '10%'
},
});

export default CreateGameScreen;