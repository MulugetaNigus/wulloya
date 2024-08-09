import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import * as Linking from "expo-linking";

function PasswordReset({ navigation }) {
  // return to the home page
  const ReturnToLoginPage = () => {
    navigation.navigate("Login");
  };

  // handle to reset the users password
  // const handleResetPassword = () => {
  //   Alert.alert(
  //     "Confirmation !",
  //     "password reset link is sent to your email address, check your email !",
  //     [{ text: "Okay", onPress: () => navigation.navigate("Login") }]
  //   );
  // };

  const [email, setEmail] = useState("");
  const [loadinState, setloadinState] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address!");
      return;
    }

    setloadinState(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setloadinState(false);
      Alert.alert(
        "Password Resetting...",
        "Password reset email sent to your email address, please check your email !",
        [{ text: "Letter" }, { text: "Open", onPress: () => OpenGmailApp() }]
      );
      
      // redirec to the gmail website, inorder to get the reset link send from us !
      const OpenGmailApp = () => {
        Linking.openURL("https:www.gmail.com").catch((err) => {
          console.error("Failed to open URL:", err);
          Alert.alert("Error", "Failed to open URL.");
        });
      };
    } catch (error) {
      setloadinState(false);
      let errorMessage = "";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address!";
          break;
        case "auth/user-not-found":
          errorMessage = "No user found with this email!";
          break;
        case "auth/network-request-failed":
          errorMessage =
            "Network error! Please check your internet connection.";
          break;
        default:
          errorMessage = "Something went wrong. Please try again!";
          break;
      }
      Alert.alert("Error", errorMessage);
      console.log(error.code, error.message);
    }
  };

  return (
    <ScrollView style={styles.LogInContainer}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <SafeAreaView>
          <StatusBar />
          {/* start */}
          {/* some texet here */}
          <View style={styles.LoginTxtWrapper}>
            <Text style={styles.LoginMainTxt}>
              Enter your email address and we will send a password reset code.
            </Text>
          </View>
          {/* ------------------------------ */}
          {/* ------------------------------ */}
          {/* form */}
          {/* email inputer */}
          <TextInput
            style={styles.emailInput}
            placeholder="* Email address"
            onChangeText={(e) => setEmail(e)}
            value={email}
          />
          {/* login in btn */}
          <View
            style={{
              marginHorizontal: 15,
            }}
          >
            {
              loadinState ? (
                <Pressable
                  // onPress={() => handleResetPassword()}
                  style={styles.logInBtn}
                  android_ripple={{ color: "white" }}
                >
                  <Text style={styles.loginTxt}>
                    <ActivityIndicator size={20} color={"white"} />
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => handleResetPassword()}
                  style={styles.logInBtn}
                  android_ripple={{ color: "white" }}
                >
                  <Text style={styles.loginTxt}>Reset Password</Text>
                </Pressable>
              )
              // {/* return to home link */}
              // <Pressable onPress={() => ReturnToLoginPage()}>
              //   <View style={styles.retrunLoginPage}>
              //     <Text style={styles.retrunLoginPageTxt}>Return to Login</Text>
              //   </View>
              // </Pressable>
            }
          </View>
          {/* CHANGE MY MIND */}
          {/* end */}
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}

export default PasswordReset;

const styles = StyleSheet.create({
  LogInContainer: {
    flex: 1,
    // I COMMENT THIS BECUASE THOSE VALUES IS NOT APPLIED FOR SCROLLVIEW COMPONENT I THINK
    // -----------------------------------------------------
    // alignItems: "center",
    // justifyContent: "start",
    // -----------------------------------------------------
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
  },
  LoginTxtWrapper: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  LoginMainTxt: {
    fontSize: 18,
    color: "#ff751a",
    fontWeight: "500",
  },
  emailInput: {
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#b3b3b3",
    fontSize: 18,
    width: 300,
  },
  logInBtn: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#ff751a",
    backgroundColor: "#ff751a",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
  },
  loginTxt: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  retrunLoginPage: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    width: 100,
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#e6e6e6",
  },
  retrunLoginPageTxt: {
    color: "#ff751a",
    fontWeight: "light",
  },
});
