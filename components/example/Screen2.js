import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomeBtn from "../button/CustomeBtn";

const Screen2 = ({ navigation , route}) => {
  
  const GotoScreenTwo = () => {
    navigation.navigate("Home Page");
  };

  const { messg } = route?.params;

  return (
    <SafeAreaView>
      <View>
        <Text>Hello, this is screen 2</Text>
        <Text>{messg}</Text>
        <CustomeBtn
          handleBtn={GotoScreenTwo}
          BtnTxt="Go to Main Page"
          TFontSize={20}
          TColor="white"
          TFontWeight="bold"
        />
      </View>
    </SafeAreaView>
  );
};

export default Screen2;
