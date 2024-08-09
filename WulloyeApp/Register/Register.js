import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Register({ navigation }) {
  // user container
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loadinState, setloadinState] = useState(false);

  // NAVIGATING TO THE LOGIN PAGE IF THE USER ALREADY REGISTERED
  const handleLogin = () => {
    navigation.navigate("forSomethingNeed");
  };

  // register func
  const handleSignUp = async () => {
    setloadinState(true);
    try {
      if (!username) {
        setloadinState(false);
        return Alert.alert("warning !", "missing username !");
      }
      await AsyncStorage.setItem("xuser" , JSON.stringify(username));
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setloadinState(false);
      console.log(userCredential);
      setEmail("");
      setPassword("");
      navigation.navigate("Login");
    } catch (error) {
      setloadinState(false);
      // const ErrorType = error.message;
      let ErrorMessage = "";
      switch (error.code) {
        case "auth/invalid-email":
          ErrorMessage = "invalied email address !";
          break;
        case "auth/weak-password":
          ErrorMessage =
            "try different password combination that was weak password !";
          break;
        case "auth/missing-password":
          ErrorMessage = "missing password field !";
          break;
        case "auth/missing-email":
          ErrorMessage = "missing email field !";
          break;
        case "auth/email-already-in-use":
          ErrorMessage = "this email address is already in use !";
          break;
        default:
          ErrorMessage = "something went wrong, please try again !";
          break;
      }
      Alert.alert("Error !", ErrorMessage);
      console.log(error.message);
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
              source={require("../Assets/Home.png")}
              resizeMode="contain"
            />
          </View>
          {/* some texet here */}
          <View style={styles.LoginTxtWrapper}>
            <Text style={styles.LoginMainTxt}>
              Fill out your detail to register !
            </Text>
          </View>
          {/* ------------------------------ */}
          <View style={styles.SignInTxt}>
            <Text style={styles.SignInMainTxt}>Register</Text>
          </View>
          {/* ------------------------------ */}
          {/* form */}
          {/* username fields */}
          <TextInput
            style={[styles.emailInput, (style = { marginBottom: 12 })]}
            placeholder="Enter Your Username"
            onChangeText={(e) => setUsername(e)}
            value={username}
          />
          {/* email inputer */}
          <TextInput
            style={styles.emailInput}
            placeholder="Enter Your Email"
            onChangeText={(e) => setEmail(e)}
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
                onPress={() => handleSignUp()}
                style={styles.logInBtn}
                android_ripple={{ color: "white" }}
              >
                <Text style={styles.loginTxt}>Register</Text>
              </Pressable>
            )}
          </View>
          <View style={styles.TermAgree}>
            <Text style={styles.conditions}>
              By registering i agree to ዉሎየ Term and Conditions !
            </Text>
          </View>
          {/* <View style={styles.orMethod}>
            <Text style={styles.orTxt}>OR</Text>
          </View>
          <View>
            <Pressable
              style={styles.SignInWithGoogle}
              android_ripple={{ color: "#ff751a" }}
            >
              <Text style={styles.SignInWithGoogleTxt}>SignUp With Google</Text>
            </Pressable>
          </View> */}
          {/* NOT A MEMBER REGISTER HERE */}
          <Pressable
            onPress={() => handleLogin()}
            android_ripple={{ color: "grey" }}
          >
            <Text style={styles.notamembertxt}>
              <Text style={{ color: "black" }}>Already have an account? </Text>{" "}
              {""} Login
            </Text>
          </Pressable>
          {/* end */}
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}

export default Register;

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
  TermAgree: {
    marginTop: 8,
    marginBottom: 30,
  },
  conditions: {
    fontSize: 12,
    color: "#ff4d4d",
  },
});
