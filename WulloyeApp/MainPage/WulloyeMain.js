import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAwesome6 } from "@expo/vector-icons";
import Navigation from "../Navigation/Navigation";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import AsyncStorage from "@react-native-async-storage/async-storage";

function WulloyeMain({ navigation }) {
  // refresh controller
  const [refresh, setrefresh] = useState(false);
  const [postContainer, setpostContainer] = useState([]);

  // handle to navigate to the detail page
  const handleToReadMore = (id) => {
    navigation.navigate("readMore", { PostID: id });
    // Alert.alert("ID" , id);
  };

  // try to load (fetch) the post as much possible when the page render
  useEffect(() => {
    getPost();
  }, []);

  // FETCH THE POST USING CUSTOME FUNCITION
  const getPost = async () => {
    try {
      // to simulate the internal process for the user we just add the extra 3 sec wait
      // setLoadingState(true);
      setTimeout(async () => {
        await axios
          .get("http://192.168.43.137:8000/wulloye/api/v1/getWullos")
          .then((result) => {
            // make the loading state false
            // setLoadingState(false);
            // console.log(result.data.fetchPost);
            setpostContainer(result.data.fetchPost);
            // settagsContainer(result.data.fetchPost.tags);
          })
          .catch((err) => {
            Alert.alert("Error !", err.message);
          });
      }, 3000);
      // }
    } catch (error) {
      Alert.alert("Error Occured !", error.message);
    }
  };

  const handleSync = () => {
    setrefresh(true);
    getPost();
    setTimeout(() => {
      setrefresh(false);
      ToastAndroid.show("Page Refreshed Complated !", ToastAndroid.SHORT);
    }, 3000);
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => handleSync()}
              colors={["#ff751a"]}
            />
          }
        >
          <StatusBar backgroundColor="#ff751a" />
          <SafeAreaView>
            {/* navigation compenent invoked here */}
            <Navigation />
            {/* header txt */}
            <View style={styles.Wullocontainer}>
              <Text style={styles.WullocontainerTxt}>
                <FontAwesome6 name="globe" size={25} color={"grey"} />{" "}
                Collections Of Wullos
              </Text>
            </View>

            {/* WulloyeMain cards here */}
            {postContainer?.length <= 0 && (
              <View style={styles.NoMorePost}>
                <Text style={styles.NoMorePostText}>
                  There is no wullo yet ! be the first wullo poster !!!
                </Text>
              </View>
            )}
            {postContainer?.length ? (
              postContainer.map((IPost) => (
                <View style={styles.card} key={IPost._id}>
                  <View style={styles.header}>
                    <Text style={styles.username}>
                      <FontAwesome6 name="user" size={23} color={"#ff751a"} />{" "}
                      {IPost.username}
                    </Text>
                    <Text style={styles.date}>
                      <FontAwesome6 name="clock" size={18} color={"#ff751a"} />
                      {"  "}
                      {formatDistanceToNow(new Date(IPost.createdAt), {
                        addSuffix: true,
                      })}
                    </Text>
                  </View>
                  <View style={styles.body}>
                    <Text style={styles.bodyText}>
                      {IPost.MainPost.slice(0, 100).concat("...")}
                    </Text>
                  </View>
                  <View style={styles.tagsSection}>
                    <Text style={styles.tagsTitle}>Tags</Text>
                    <View style={styles.tagsContainer}>
                      {IPost.tags.map((tag, index) => (
                        <TouchableOpacity key={index} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={(e) => handleToReadMore(IPost._id)}
                    style={styles.readMoreButton}
                  >
                    <Text style={styles.readMoreText}>
                      Read More{" "}
                      <Ionicons
                        name="arrow-forward-sharp"
                        size={20}
                        color={"grey"}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={styles.ActivityIndicator}>
                <ActivityIndicator size={30} color={"#ff751a"} />
              </View>
            )}
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default WulloyeMain;

const styles = StyleSheet.create({
  Wullocontainer: {
    marginHorizontal: 15,
    marginTop: 8,
    marginBottom: 5,
  },
  WullocontainerTxt: {
    fontSize: 23,
    fontWeight: "700",
    color: "grey",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    // marginBottom: 20,
  },
  header: {
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff751a",
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  body: {
    marginBottom: 15,
  },
  bodyText: {
    fontSize: 16,
    color: "#333",
  },
  tagsSection: {
    marginBottom: 15,
  },
  tagsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff751a",
    marginBottom: 5,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#ff751a",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  tagText: {
    color: "#fff",
    fontSize: 14,
  },
  readMoreButton: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    backgroundColor: "#cccccc",
    alignItems: "center",
    paddingVertical: 12,
  },
  readMoreText: {
    color: "grey",
    fontSize: 18,
    fontWeight: "600",
  },
  ActivityIndicator: {
    marginTop: 120,
  },
  NoMorePost: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  NoMorePostText: {
    fontSize: 16,
    color: "grey",
    marginHorizontal: 15,
  },
});
