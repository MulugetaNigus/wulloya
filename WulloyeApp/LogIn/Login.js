// 4657 9261 7819

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
import { signInWithEmailAndPassword } from "firebase/auth";
// import axios from "axios";

function Login({ navigation }) {
  // user container
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadinState, setloadinState] = useState(false);

  // navigating to the register page
  const handleToRegister = () => {
    navigation.navigate("Register");
  };

  // go to fotget password page
  const handleForgetPassword = () => {
    navigation.navigate("Forget Password");
  };

  const handleToLogIn = async () => {
    setloadinState(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setloadinState(false);
      console.log(userCredential);
      setEmail("");
      setPassword("");
      navigation.navigate("HomePage");
    } catch (error) {
      setloadinState(false);
      let errorMessage = "";

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address!";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalied Login Credientials !";
          break;
        case "auth/user-disabled":
          errorMessage = "This user has been disabled!";
          break;
        case "auth/user-not-found":
          errorMessage = "No user found with this email!";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password!";
          break;
        case "auth/too-many-requests":
          errorMessage =
            "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";
          break;
        case "auth/network-request-failed":
          errorMessage =
            "Network error! Please check your internet connection.";
          break;
        default:
          errorMessage = "Something went wrong. Please try again!";
          break;
      }

      Alert.alert("Error!", errorMessage);
      console.log(error.code, error.message);
    }
  };

  return (
    <ScrollView style={styles.LogInContainer}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <SafeAreaView>
          <StatusBar />
          {/* start */}
          {/* logo */}
          <View style={styles.imgContainer}>
            <Image
              source={require("../assets/logo-no-background.png")}
              resizeMode="contain"
            />
          </View>
          {/* some texet here */}
          <View style={styles.LoginTxtWrapper}>
            <Text style={styles.LoginMainTxt}>
              Welcome back you've been missed!
            </Text>
          </View>
          {/* ------------------------------ */}
          <View style={styles.SignInTxt}>
            <Text style={styles.SignInMainTxt}>Log In</Text>
          </View>
          {/* ------------------------------ */}
          {/* form */}
          {/* email inputer */}
          <TextInput
            style={styles.emailInput}
            placeholder="Enter Your Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          {/* password inputer */}
          <TextInput
            secureTextEntry={true}
            style={styles.passwordInput}
            placeholder="Enter Your Password"
            onChangeText={(e) => setPassword(e)}
            value={password}
          />
          {/* FORGET PASSWORD LINK */}
          <Pressable onPress={() => handleForgetPassword()}>
            <Text style={styles.forgotpassword}>forgot password?</Text>
          </Pressable>
          {/* login in btn */}
          <View>
            {loadinState ? (
              <Pressable
                style={styles.logInBtn}
                android_ripple={{ color: "white" }}
              >
                <Text style={styles.loginTxt}>
                  <ActivityIndicator size={25} color={"white"} />
                </Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => handleToLogIn()}
                style={styles.logInBtn}
                android_ripple={{ color: "white" }}
              >
                <Text style={styles.loginTxt}>LogIn</Text>
              </Pressable>
            )}
          </View>
          {/* <View style={styles.orMethod}>
            <Text style={styles.orTxt}>OR</Text>
          </View>
          <View>
            <Pressable
              style={styles.SignInWithGoogle}
              android_ripple={{ color: "#ff751a" }}
            >
              <Text style={styles.SignInWithGoogleTxt}>SignIn With Google</Text>
            </Pressable>
          </View> */}

          {/* NOT A MEMBER REGISTER HERE */}
          <Pressable
            style={{ marginTop: 30 }}
            onPress={() => handleToRegister()}
            android_ripple={{ color: "lightgrey" }}
          >
            <Text style={styles.notamembertxt}>
              <Text style={{ color: "black" }}>Not a member? </Text> {""}{" "}
              Register now
            </Text>
          </Pressable>
          {/* end */}
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}

export default Login;

const styles = StyleSheet.create({
  LogInContainer: {
    // I COMMENT THIS BECUASE THOSE VALUES IS NOT APPLIED FOR SCROLLVIEW COMPONENT I THINK
    // -----------------------------------------------------
    // alignItems: "center",
    // justifyContent: "start",
    // -----------------------------------------------------
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
  },
  imgContainer: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  LoginTxtWrapper: {
    marginVertical: 20,
  },
  SignInMainTxt: {
    fontSize: 35,
    marginBottom: 10,
    fontWeight: "900",
    color: "#ff751a",
  },
  LoginMainTxt: {
    fontSize: 18,
    color: "#ff751a",
    fontWeight: "500",
  },
  emailInput: {
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#b3b3b3",
    fontSize: 18,
    width: 300,
  },
  passwordInput: {
    marginVertical: 12,
    padding: 12,
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
    letterSpacing: 1,
  },
  orMethod: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  orTxt: {
    fontSize: 20,
    color: "#262626",
  },
  forgotpassword: {
    color: "#0000ff",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  SignInWithGoogle: {
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    backgroundColor: "#e6e6e6",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 10,
  },
  SignInWithGoogleTxt: {
    fontSize: 14,
    color: "#262626",
    fontWeight: "600",
    letterSpacing: 1,
  },
  notamembertxt: {
    color: "#0000ff",
    textDecorationLine: "underline",
    fontSize: 15,
    marginBottom: 10,
  },
});
