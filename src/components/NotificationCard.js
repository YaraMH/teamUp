import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const NotificationCard = props => {

return(
        <View style={styles.card}>          
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>UserName123 has Just joined your game</Text>
            </View>
        </View>
);
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        height: 50,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5
    },
    titleWrapper: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center', 
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default NotificationCard;