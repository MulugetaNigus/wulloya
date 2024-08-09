import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import Navigation from "../Navigation/Navigation";
import { FontAwesome6, MaterialIcons, Ionicons } from "@expo/vector-icons";
// import axios
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const tag = [
  "Happy",
  "Sad",
  "Excited",
  "Grateful",
  "Stressed",
  "Work",
  "Travel",
  "Exercise",
  "Study",
  "Relax",
  "Social",
  "Birthday",
  "Meeting",
  "Vacation",
  "Celebration",
  "Achievement",
  "Home",
  "Office",
  "Park",
  "Cafe",
  "Gym",
  "Beach",
  "Family",
  "Friends",
  "Colleagues",
  "Productive",
  "Learning",
  "Creative",
  "Peaceful",
  "Challenging",
  "Hobbies",
  "Food",
  "Music",
  "Sports",
];

function Post({ navigation }) {
  const [MainPost, setpost] = useState("");
  const [tags, setSelectedTags] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // navigate to the profile page
  const [modal, setmodal] = useState(false);
  const handleViewProfile = () => {
    navigation.navigate("forSomethingNeed")
    // setmodal(true);
  };

  // handle to back to home page
  const handleBackToHomePage = () => {
    navigation.goBack();
  };

  // handle to post the wullos
  const handlePost = async () => {
    try {
      // organize the data to be send as a obj
      const username = JSON.parse(await AsyncStorage.getItem("xuser"))
      const postWulloyen = {
        username,
        MainPost,
        tags,
      };
      // try to make post req to save the data
      if (!MainPost) {
        Alert.alert(
          "Message",
          "That is invalied post, Inorder to post you have write atleast 30 characters !"
        );
      } else {
        // to simulate the internal process for the user we just add the extra 3 sec wait
        setLoadingState(true);
        setTimeout(async () => {
          await axios
            .post(
              "http://192.168.43.137:8000/wulloye/api/v1/shareWulloyen",
              postWulloyen
            )
            .then((result) => {
              // make the loading state false
              setLoadingState(false);
              // console.log(result.data.message);
              Alert.alert("Thanks !", "Thanks for sharing your day.");
              setSelectedTags([]);
              setpost("");
              navigation.goBack();
            })
            .catch((err) => {
              Alert.alert("Error !", err.message);
            });
        }, 3000);
      }
    } catch (error) {
      Alert.alert("Error Occured !", error.message);
    }
  };

  return (
    <>
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
            {/* nav end */}
            {/* Post form here */}
            <View style={styles.formContainer}>
              <Text style={styles.shareDayTxt}>Share wullo</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Share your day as you like..."
                placeholderTextColor="#888"
                multiline={true}
                numberOfLines={4}
                onChangeText={(e) => setpost(e)}
                value={MainPost}
              />
              <Text style={styles.tagsTxt}>Category</Text>
              <View style={styles.tagsContainer}>
                {tag.map((tag, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.tag,
                      tags.includes(tag) && styles.selectedTag,
                    ]}
                    onPress={() => toggleTag(tag)}
                  >
                    <Text style={styles.tagText}>{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 5,
                  color: "red",
                  opacity: 0.6,
                }}
              >
                Try to make your post educational for others !
              </Text>
              {loadingState ? (
                <ActivityIndicator size={40} />
              ) : (
                <TouchableOpacity
                  onPress={() => handlePost()}
                  style={styles.submitButton}
                >
                  <Text style={styles.submitButtonText}>Share</Text>
                </TouchableOpacity>
              )}
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // styles for the navigation

  navigationWrapper: {
    flex: 1,
    marginHorizontal: 15,
    // marginTop: -20
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
    marginTop: 18,
  },
  LogoName: {
    fontSize: 32,
    fontWeight: "900",
    color: "#ff751a",
    fontFamily: "serif",
  },
  Circleprofile: {
    borderWidth: 0,
    borderColor: "#ff751a",
    padding: 4,
    borderRadius: 50,
  },
  // styles for the navigation

  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    marginTop: 22,
  },
  shareDayTxt: {
    fontSize: 33,
    fontWeight: "800",
    marginBottom: 8,
    color: "grey",
  },
  formContainer: {
    padding: 20,
  },
  textArea: {
    height: 250,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    textAlignVertical: "top", // For Android to align text at the top
  },
  tagsTxt: {
    fontSize: 19,
    color: "black",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  tag: {
    backgroundColor: "#d9d9d9",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
  },
  selectedTag: {
    backgroundColor: "black",
    color: "yellow",
  },
  tagText: {
    color: "grey",
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: "#ff751a",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default Post;
