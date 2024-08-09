import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

function Navigation() {
  
  // give a greeting for the user !
  const handleViewProfile = () => {
    // navigation.navigate("forSomethingNeed");
    Alert.alert("Hey !", "Hello There, Welcome to ዉሎየ !");
  };

  return (
    <ScrollView>
      <View style={styles.navigationWrapper}>
        <SafeAreaView>
          <StatusBar />
          <View style={styles.header}>
            <View>
              <Text style={styles.LogoName}>ዉሎየ</Text>
            </View>
            {/* profile picture */}
            <Pressable
              onPress={() => handleViewProfile()}
              android_ripple={{ color: "lightgrey" }}
            >
              <View style={styles.Circleprofile}>
                <MaterialIcons name="handshake" size={30} color="#ff751a" />
              </View>
            </Pressable>
          </View>
          {/* // )} */}
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}

export default Navigation;

const styles = StyleSheet.create({
  navigationWrapper: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: -30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  LogoName: {
    fontSize: 38,
    fontWeight: "900",
    color: "#ff751a",
    fontFamily: "serif",
    marginBottom: 10,
    marginTop: -10,
  },
  Circleprofile: {
    marginTop: -20,
    borderWidth: 0,
    borderColor: "gold",
    padding: 5,
    borderRadius: 50,
  },
});
