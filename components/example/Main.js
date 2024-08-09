import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import CustomeBtn from "../button/CustomeBtn";

// async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// tack init
const Main = ({ navigation }) => {
  // navigation to screen one
  const GotoScreenOne = () => {
    navigation.navigate("Screen One Page", {
      messg: "from main screen through  button 1",
    });
  };

  // navigation to screen two
  const GotoScreenTwo = () => {
    navigation.navigate("Screen Two Page", {
      messg: "from main screen through  button 2",
    });
  };

  // items state
  const [usernames, setUsernames] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setmodal] = useState(false);
  const [emodal, setemodal] = useState(false);

  const [items, setItems] = useState([
    { id: 1, item: "mango" },
    { id: 2, item: "banana" },
    { id: 3, item: "avocado" },
    { id: 4, item: "carrot" },
    { id: 5, item: "lemon" },
  ]);

  const [refreshController, setrefreshController] = useState(false);
  const handleToAddItems = () => {
    setrefreshController(true);
    setTimeout(() => {
      // const idGenerator = Math.floor(Math.random() * 12);
      // setItems([
      //   ...items,
      //   {
      //     id: ((idGenerator * 100) / 7).toFixed(0),
      //     item: ((idGenerator * 100) / 7).toFixed(0),
      //   },
      // ]);
      Alert.alert("Hey !", "we are process your data please wait some time !", [
        { text: "ok" },
      ]);
    }, 0);
    setrefreshController(false);
  };

  // btn handler
  const handleBtn = async () => {
    if (!usernames || !password) {
      setemodal(true);
      return;
    }
    // setmodal(true);
    // we make her an async strage to store the data in our device
    try {
      const user = {
        usernames,
        password,
      };
      await AsyncStorage.setItem("appUser", JSON.stringify(user));
      navigation.navigate("Screen One Page", {
        messg: "from main screen through  button 1",
      });
    } catch (error) {
      Alert.alert("Error", error, [{ text: "try again !" }]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="white" />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={handleToAddItems}
            colors={["red"]}
          />
        }
      >
        <Modal
          visible={emodal}
          onRequestClose={() => setemodal(false)}
          transparent
          animationType="slide"
          hardwareAccelerated
        >
          <View style={styles.modalView}>
            <View style={styles.Innermodal}>
              <Text style={{ fontSize: 30 }}>
                hello muller this is the modal examples
              </Text>
              <Image
                resizeMode="stretch"
                source={require("../../assets/error.png")}
              />
              <Pressable
                onPress={() => setemodal(false)}
                android_ripple={{ color: "white" }}
                hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
              >
                <Text style={styles.flat}>close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          visible={modal}
          onRequestClose={() => setmodal(false)}
          transparent
          animationType="slide"
          hardwareAccelerated
        >
          <View style={styles.modalView}>
            <View style={styles.Innermodal}>
              <Text style={{ fontSize: 30 }}>
                hello muller this is the modal examples
              </Text>
              <Image
                resizeMode="stretch"
                source={require("../../assets/done.png")}
              />
              <Pressable>
                <Text style={styles.flat} onPress={() => setmodal(false)}>
                  close
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Text style={styles.head}>ScrollView and Refresh Controller</Text>
        {items.map((itm) => {
          return (
            <>
              <View style={styles.items} key={itm.id}>
                <Text style={styles.innerItem}>{itm.item}</Text>
              </View>
            </>
          );
        })}
        <Text style={styles.flat}>FlatList Example</Text>
        <FlatList
          // refresh controller
          refreshControl={
            <RefreshControl
              color={["white"]}
              refreshing={refreshController}
              onRefresh={handleToAddItems}
            />
          }
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={items}
          renderItem={({ item }) => (
            <View style={styles.items} key={item.id}>
              <Text style={styles.innerItem}>{item.item}</Text>
            </View>
          )}
        />
        <Text style={styles.usernameLable}>username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          keyboardType="default"
          onChangeText={(e) => setUsernames(e)}
        />
        <Text style={styles.usernameLable}>password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter Your Password"
          keyboardType="default"
          onChangeText={(e) => setPassword(e)}
        />
        {/* custome btn here */}
        <CustomeBtn
          handleBtn={handleBtn}
          BtnTxt="LogIn"
          TFontSize={20}
          TColor="white"
          TFontWeight="bold"
        />
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 25, color: "grey" }}>
            Navigation Examples
          </Text>
        </View>
        <CustomeBtn
          handleBtn={GotoScreenOne}
          BtnTxt="Go to Screen 1"
          TFontSize={20}
          TColor="white"
          TFontWeight="bold"
        />
        <CustomeBtn
          handleBtn={GotoScreenTwo}
          BtnTxt="Go to Screen 2"
          TFontSize={20}
          TColor="white"
          TFontWeight="bold"
        />
      </ScrollView>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whiterr",
    // alignItems: "center",
    // justifyContent: "center",
    marginTop: 0,
  },
  topthree: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "start",
  },
  tone: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 80,
    backgroundColor: "red",
    color: "white",
  },
  ttwo: {
    flex: 2,
    width: 100,
    height: 80,
    backgroundColor: "green",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  tthree: {
    flex: 3,
    width: 100,
    height: 80,
    backgroundColor: "blue",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  toptwo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
  },
  t2: {
    width: "auto",
    height: 80,
    backgroundColor: "tomato",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  t22: {
    height: 80,
    width: "auto",
    backgroundColor: "black",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  final: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "start",
  },
  ft2: {
    flex: 1,
    height: 280,
    backgroundColor: "red",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  ft22: {
    flex: 1,
    height: 280,
    backgroundColor: "aqua",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  items: {
    flex: 1,
    backgroundColor: "tomato",
    margin: 5,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  innerItem: {
    flex: 1,
    color: "white",
    padding: 10,
    fontSize: 20,
  },
  head: {
    marginHorizontal: 10,
    marginBottom: 10,
    fontSize: 30,
    color: "tomato",
    fontWeight: "bold",
  },
  flat: {
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
    fontSize: 30,
    color: "tomato",
    fontWeight: "bold",
  },
  usernameLable: {
    color: "black",
    fontSize: 20,
    marginLeft: 12,
  },
  input: {
    height: 50,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: "tomato",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    color: "black",
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000099",
  },
  Innermodal: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});
