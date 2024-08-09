import React, { useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Pressable,
  Alert,
} from "react-native";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const ContactDevelopers = ({ navigation }) => {
  const handleEmail = () => {
    Linking.openURL("mailto:mullerhihi@gmail.com");
  };

  const handleTelegram = () => {
    Linking.openURL("https://t.me/@Timetocodewithme");
  };

  const handleGitHub = () => {
    Linking.openURL("https://github.com/MulugetaNigus");
  };

  const handleLinkedIn = () => {
    Linking.openURL("https://linkedin.com/in/MulugetaNigus");
  };

  const handleFacebook = () => {
    Linking.openURL("https://facebook.com/MullerKing");
  };

  // navigate to the profile page
  const [modal, setmodal] = useState(false);
  const handleViewProfile = () => {
    Alert.alert("profile !", "under development");
    // setmodal(true);
  };

  // handle to back to home page
  const handleBackToHomePage = () => {
    navigation.goBack();
  };

  // handle to navigate in the login page
  const UserAuth = () => {
    // navigation.navigate("Login");
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        // Navigate to the login page or any other appropriate page
        navigation.navigate("forSomethingNeed");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        Alert.alert("Error", "Failed to sign out. Please try again.");
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <ScrollView>
        <SafeAreaView>
          {/* Navigation component invoked here */}
          {modal ? (
            <CustomeModal showmodal={setmodal} modal={modal} />
          ) : (
            <View style={styles.header}>
              <View>
                {/* <Text style={styles.LogoName}>ዉሎየ</Text> */}
                <Pressable
                  onPress={() => handleBackToHomePage()}
                  android_ripple={{ color: "grey" }}
                  style={styles.backtohome}
                >
                  <MaterialIcons name="arrow-back-ios-new" size={22} />
                </Pressable>
              </View>
              {/* profile picture */}
              <Pressable
                onPress={() => handleViewProfile()}
                android_ripple={{ color: "lightgrey" }}
              >
                <View style={styles.Circleprofile}>
                  <MaterialIcons name="logout" size={25} color="#ff751a" />
                </View>
              </Pressable>
            </View>
          )}
          {/* Contact Developers Page */}
          <View style={styles.content}>
            <View style={styles.topTitleForDevelopersPage}>
              <Text style={styles.pageTitle}>Contact Us</Text>
              <Text style={styles.subtitle}>We'd love to hear from you!</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.infoTitle}>Email</Text>
              <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.contactText}>mullerhihi@gmail.com</Text>
                <Ionicons name="mail-outline" size={25} color={"#ff751a"} />
              </TouchableOpacity>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.infoTitle}>Follow Us</Text>
              <View style={styles.socialContainer}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={handleTelegram}
                >
                  <FontAwesome6 name="telegram" size={20} color={"#fff"} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={handleGitHub}
                >
                  <FontAwesome6 name="github" size={20} color={"#fff"} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={handleFacebook}
                >
                  <FontAwesome6 name="facebook" size={20} color={"#fff"} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={handleLinkedIn}
                >
                  <FontAwesome6 name="linkedin" size={20} color={"#fff"} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.infoTitle}>Feedback</Text>
              <Text style={styles.infoText}>
                We are constantly looking to improve. Please provide us with any
                feedback or suggestions you might have.
              </Text>
              <TouchableOpacity
                onPress={() => handleEmail()}
                style={styles.feedbackButton}
              >
                <Text style={styles.feedbackButtonText}>EMAIL US !</Text>
              </TouchableOpacity>
            </View>

            {/* action btn here */}
            <TouchableOpacity
              onPress={() => UserAuth()}
              style={styles.ActioinBtn}
              android_ripple={{ color: "#ff751a" }}
            >
              <Text style={styles.ActionBtnTxt}>LogOut</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  content: {
    padding: 20,
  },
  backtohome: {
    borderWidth: 0.4,
    borderColor: "#ff751a",
    padding: 8,
    borderRadius: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 38,
  },
  Circleprofile: {
    borderWidth: 0,
    borderColor: "#ff751a",
    padding: 4,
    borderRadius: 50,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff751a",
    marginBottom: 10,
    textAlign: "center",
  },
  topTitleForDevelopersPage: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  contactInfo: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff751a",
    marginBottom: 10,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  contactText: {
    color: "grey",
    fontSize: 18,
    marginRight: 10,
  },
  socialContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  socialButton: {
    backgroundColor: "#ff751a",
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  feedbackButton: {
    backgroundColor: "#ff751a",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 15,
  },
  feedbackButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  ActioinBtn: {
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 15,
  },
  ActionBtnTxt: {
    color: "grey",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ContactDevelopers;
