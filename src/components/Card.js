import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameData: this.props.gameData,
      gameDay: "",
      gameMonth: "",
      gameYear: "",
      gameDayInMontth: "",
      creatorName: "loadingName",
      creatorEmail: "loadingEmail",
    }
    this.initializeDate(this.props.gameData.gameDate);
    this.getGameCreatorInfo();
    } 
    getGameCreatorInfo() {
        var database = firebase.database();
        const dbRef = firebase.database().ref();
        dbRef.child("users").child(this.state.gameData.creatorID).get().then((snapshot) => {
          if (snapshot.exists()) {
              this.setState({creatorName: snapshot.val().fullName});
              this.setState({creatorEmail: snapshot.val().email});
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
    }
    initializeDate (date) {
        var d = new Date(date);
        this.state.gameDayInMonth = d.getDate();
        this.state.gameYear = d.getFullYear();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.state.gameMonth = months[d.getMonth()];
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.state.gameDay = days[d.getDay()];
    }
    render(){
        return(
            <TouchableOpacity
            onPress={() => {
                this.props.navigation.navigate('GamesDetails', {
                  gameinfo: this.state.gameData,
                  gameCreatorName: this.state.creatorName,
                  gameCreatorEmail: this.state.creatorEmail,
                  gameDate: this.state.gameDay.concat(", ", this.state.gameMonth, " " , this.state.gameDayInMonth, ", ", this.state.gameYear)
                });
              }}
            
            >
                <View style={styles.card}>
                    <View style={styles.imageWrapper}>
                        <Image 
                            source={{uri: 'https://www.summer6aside.com.au/images/slide1.jpg'}}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{this.state.gameDay} {this.state.gameMonth} {this.state.gameDayInMonth} {this.state.gameYear}</Text>
                    </View>
                    <View style={styles.descriptionWrapper}>
                        <Text style={styles.description}>Join us at {this.state.gameData.gameTime} in {this.state.gameData.fieldLocation}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        );
    }
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        height: 200,
        margin: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5
    },
    imageWrapper: {
      width: '100%',
      height: '60%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden'
    },
    image: {
        height: '100%',
        width: '100%'
    },
    titleWrapper: {
        height: '10%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    title: {
        fontSize: 20,
    },
    description:{
        fontSize: 15,
        marginTop: 10
    },
    descriptionWrapper: {
        paddingHorizontal: 15
    }
});

export default Card;