import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  Pressable,
  ActivityIndicator,
} from "react-native";
import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Detail = ({ route, navigation }) => {
  const [post, setPost] = useState([]);
  const [
    LocalStorageFavoritePostContainer,
    setLocalStorageFavoritePostContainer,
  ] = useState([]);

  const { PostID } = route?.params;
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
          .get(`http://192.168.43.137:8000/wulloye/api/v1/getWullos/${PostID}`)
          .then((result) => {
            // make the loading state false
            // setLoadingState(false);
            // console.log(result.data);
            setPost(result.data.fetchPost);
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

  const handleToggleFavorite = async (post) => {
    // await AsyncStorage.clear();
    const Innerpost = await AsyncStorage.getItem("tasks");
    const savedTasks = JSON.parse(Innerpost) || [];
    const findExistance = savedTasks.filter((i) => i._id === post._id);
    if (findExistance?.length > 0) {
      return Alert.alert(
        "Hey You !",
        "This post already saved in your favorite page !"
      );
    } else {
      savedTasks.push(post);
      await AsyncStorage.setItem("tasks", JSON.stringify(savedTasks));
      Alert.alert("Success" , "Added to Favorites");
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Pressable
              onPress={() => handleBack()}
              android_ripple={{ color: "grey" }}
              style={styles.backtohome}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <MaterialIcons name="arrow-back-ios-new" size={22} />
            </Pressable>
            <Text style={styles.title}>Post Details</Text>
          </View>

          {post?.length == [] ? (
            <ActivityIndicator
              color={"#ff751a"}
              size={30}
              style={{ marginTop: 100 }}
            />
          ) : (
            <View style={styles.content}>
              <View key={post._id} style={styles.FavContainer}>
                <Text style={styles.username}>
                  <FontAwesome6 name="user" size={23} color={"#ff751a"} />{" "}
                  Muller King
                </Text>
                <Text style={styles.date}>
                  <FontAwesome6 name="clock" size={18} color={"#ff751a"} />
                  {"  "}
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </Text>
                <Text style={styles.bodyText}>{post.MainPost}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.addFavoriteButton}
                    onPress={(e) => handleToggleFavorite(post)}
                  >
                    <MaterialCommunityIcons
                      name={"heart"}
                      size={20}
                      color={"#fff"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
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
  scrollView: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    // backgroundColor: "lightgrey",
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // elevation: 5,
    marginTop: 25,
  },
  headerButton: {
    padding: 10,
  },
  backtohome: {
    borderWidth: 0.4,
    borderColor: "#ff751a",
    padding: 8,
    borderRadius: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "grey",
    flex: 1,
    textAlign: "center",
    marginLeft: -55,
  },
  content: {
    // padding: 20,
    marginTop: 15,
  },
  FavContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
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
  bodyText: {
    fontSize: 18,
    color: "#333",
    marginTop: 15,
    lineHeight: 24,
  },
  actions: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shareButton: {
    backgroundColor: "#ff751a",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  shareText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addFavoriteButton: {
    backgroundColor: "#333",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  addFavoriteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Detail;
