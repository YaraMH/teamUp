import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Header = () => (
    <View style={styles.header}>
            <Text style={styles.headerTitle}>
                <Text style={{color: 'black'}}>Team</Text>
                <Text style={{color: '#339CFF'}}>Up</Text>
            </Text>
    </View>
  );

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f2f2f2',
        marginBottom: 40,
    },
    headerTitle: {
        marginTop: 40,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default Header;