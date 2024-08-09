import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";

function CustomeModal({ showmodal, modal }) {
  return (
    <View>
      <Modal
        visible={modal}
        onRequestClose={() => showmodal(false)}
        transparent={true}
        animationType="slide"
        hardwareAccelerated
      >
        <View style={styles.modalView}>
          <View style={styles.Innermodal}>
            <Text style={{ fontSize: 30 }}>
              <ActivityIndicator size={50} color={"tomato"} />
            </Text>
            <Pressable
              onPress={() => showmodal(false)}
              android_ripple={{ color: "white" }}
              hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
            >
              {/* <Text style={styles.flat}>close</Text> */}
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CustomeModal;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000099",
  },
  Innermodal: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "",
    // width: 100,
    // height: 100,
    // borderRadius: 10,
  },
});
