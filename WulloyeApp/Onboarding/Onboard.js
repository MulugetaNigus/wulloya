import React from "react";
import { StyleSheet, View , Image, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

function Onboard() {
  return (
    <SafeAreaView style={styles.startterOneContainer}>
      <StatusBar backgroundColor="white" />
      <View style={styles.imgContainer}>
        <Image source={require("../Assets/Home.png")} resizeMode="contain" />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.wulloyeTxt}>ዉሎየ</Text>
      </View>
    </SafeAreaView>
  );
}

export default Onboard;

const styles = StyleSheet.create({
  startterOneContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  nameContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 20,
  },
  wulloyeTxt: {
    color: "#ff751a", 
    fontSize: 55,
    fontWeight: "700"
  }
});
