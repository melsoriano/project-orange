import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { ExpoConfigView } from "@expo/samples";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.settingsText}>Settings page placeholder</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  settingsText: {
    fontSize: 17,
    color: "black",
    lineHeight: 24,
    textAlign: "center"
  }
});
