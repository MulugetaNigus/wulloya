import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  Alert,
  RefreshControl,
} from "react-native";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function Favorite({ navigation }) {
  // navigate to the profile page
  const [modal, setmodal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [favoritePosts, setfavoritePosts] = useState([]);

  const handleViewProfile = () => {
    navigation.navigate("forSomethingNeed")
    // setmodal(true);
  };

  // handle to back to home page
  const handleBackToHomePage = () => {
    navigation.goBack();
  };

  // go to the read more page from favorite page
  const handleToReadMore = (id) => {
    navigation.navigate("readMore", { PostID: id });
    // Alert.alert("ID" , id);
  };

  useEffect(() => {
    getID();
  }, []);

  // get the all fav id
  const getID = async () => {
    await AsyncStorage.getItem("tasks")
      .then((result) => {
        // console.log(JSON.parse(result));
        setfavoritePosts(JSON.parse(result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // refresh the page to see the fav post
  const handleRefreshPage = () => {
    setRefresh(true);
    getID();
    setRefresh(false);
  };

  const handleToRemove = async (id) => {
    try {
      const Innerpost = await AsyncStorage.getItem("tasks");
      const savedTasks = JSON.parse(Innerpost) || [];
      const updatedTasks = savedTasks.filter((i) => i._id !== id);
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
      Alert.alert("Done!", "Removed!");
      getID();
    } catch (error) {
      Alert.alert("Error", "Something went wrong, please try again!");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => handleRefreshPage()}
          />
        }
      >
        <SafeAreaView>
          {/* Navigation component invoked here */}
          {modal ? (
            <CustomeModal showmodal={setmodal} modal={modal} />
          ) : (
            <View style={styles.headers}>
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
          {/* Favorite posts list */}
          <View style={styles.content}>
            <View style={styles.PageTitleContainer}>
              <Text style={styles.pageTitle}>My Favorites</Text>
            </View>
            {favoritePosts?.length > 0 ? (
              favoritePosts.map((post) => (
                <View key={post._id} style={styles.card}>
                  <View style={styles.header} key={post._id}>
                    <Text style={styles.username}>
                      <FontAwesome6 name="user" size={23} color={"#ff751a"} />{" "}
                      {/* {post.username} */}
                      Muller King
                    </Text>
                    <Text style={styles.date}>
                      <FontAwesome6 name="clock" size={18} color={"#ff751a"} />
                      {"  "}
                      {formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })}
                      {/* 86876876 */}
                    </Text>
                  </View>
                  <View style={styles.body}>
                    <Text style={styles.bodyText}>
                      {post.MainPost?.slice(0, 100).concat("...") ||
                        "No post content available"}
                    </Text>
                  </View>
                  <View style={styles.tagsSection}>
                    <Text style={styles.tagsTitle}>Tags</Text>
                    <View style={styles.tagsContainer}>
                      {post.tags.map((tag, index) => (
                        <TouchableOpacity key={index} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  <View style={{ marginVertical: 5 }}>
                    <TouchableOpacity
                      onPress={() => handleToReadMore(post._id)}
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
                  <View style={{ marginVertical: 5 }}>
                    <TouchableOpacity
                      onPress={() => handleToRemove(post._id)}
                      style={styles.removeBtn}
                    >
                      <Text style={styles.removeTxt}>
                        Remove from favorite{" "}
                        <FontAwesome6 name="trash" color={"white"} size={20} />
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.NoMoreFav}>
                <Text style={styles.innerNoMoreFavTxt}>
                  There Is No Saved Favorite Post Yet !
                </Text>
              </View>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  content: {
    padding: 20,
  },
  PageTitleContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ff751a",
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
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
  removeBtn: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    backgroundColor: "#660000",
    alignItems: "center",
    paddingVertical: 12,
  },
  removeTxt: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  readMoreText: {
    color: "grey",
    fontSize: 18,
    fontWeight: "600",
  },
  headers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 35,
  },
  backtohome: {
    borderWidth: 0.4,
    borderColor: "#ff751a",
    padding: 8,
    borderRadius: 50,
  },
  Circleprofile: {
    borderWidth: 0,
    borderColor: "#ff751a",
    padding: 4,
    borderRadius: 50,
  },
  NoMoreFav: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderWidth: 0.4,
    borderColor: "#ffcccc",
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#ffcccc",
  },
  innerNoMoreFavTxt: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0000ff",
  },
});

export default Favorite;
