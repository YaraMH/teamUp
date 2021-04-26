import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const ChatScreen = () => (
  <View style={styles.container}>
    <Text>This is the future chat page</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatScreen;