import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import CustomeBtn from "../button/CustomeBtn";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Screen1 = ({ navigation, route }) => {
  const { messg } = route?.params;

  // navigating to the scree two
  const GotoScreenTwo = () => {
    navigation.navigate("Screen Two Page", {
      messg: "this is from the screen 1",
    });
  };

  // we have to fetch the data from the local storage
  useEffect(() => {
    getAppUser();
  }, []);

  // user data states
  const [userData, setUserData] = useState([]);

  // function to fetch the user data
  const getAppUser = async () => {
    try {
      await AsyncStorage.getItem("appUser")
        .then((user) => {
          setUserData(JSON.parse(user));
        })
        .catch((err) => {
          Alert.alert("Error", err, [{ text: "Reload !" }]);
        });
    } catch (error) {}
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Hello, this is screen 1</Text>
        <Text>{messg}</Text>
        <Text>User Data Comes from the local Storage</Text>
        <Text>{userData?.usernames}</Text>
        <Text>{userData?.password}</Text>
        <CustomeBtn
          handleBtn={GotoScreenTwo}
          BtnTxt="Go to Screen 2"
          TFontSize={20}
          TColor="white"
          TFontWeight="bold"
        />
      </View>
    </SafeAreaView>
  );
};

export default Screen1;
