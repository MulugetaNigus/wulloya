import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import { Pressable, Text  , StyleSheet} from "react-native";

const CustomeBtn = ({handleBtn , BtnTxt , TFontSize , TColor , TFontWeight}) => {
  return (
    <Pressable
      android_ripple={{ color: "white" }}
      style={({ pressed }) => [
        styles.loginBtn,
        pressed ? { backgroundColor: "tomato" } : { backgroundColor: "grey" },
      ]}
      onPress={() => handleBtn()}
    >
      <Text style={{ fontSize: TFontSize, color: TColor, fontWeight:  TFontWeight}}>
        {BtnTxt}
      </Text>
    </Pressable>
  );
};

export default CustomeBtn;

const styles = StyleSheet.create({
    loginBtn: {
        marginTop: 10,
        padding: 16,
        marginHorizontal: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
      },
})
