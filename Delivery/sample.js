import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Sample() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="white" />
      {/* navigations */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>
          <Text style={styles.name}>ጉርሻ</Text> Delivery
        </Text>
        <Text style={styles.text}>Profile</Text>
      </View>
      {/* home slogan */}
      <View style={styles.banner}>
        <Text style={styles.bannerTxt}>
          We care about your diet every day, you deserve a better meal
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "start",
    justifyContent: "start",
    margin: 10,
    marginTop: 45,
  },
  name: {
    fontSize: 28,
    color: "tomato",
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    color: "tomato",
    fontWeight: "bold",
  },
  banner: {
    backgroundColor: "tomato",
    height: 150,
    width: "auto",
    borderRadius: 10,
    marginTop: 20,
    // justifyContent: "center",
    // alignItems: "center",
  },
  bannerTxt: {
    flex: 1,
    padding: 20,
    justifyContent: "start",
    alignItems: "start",
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});
