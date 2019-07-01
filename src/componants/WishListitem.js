import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const MenuIcon = () => {
  return (
    <Icon
      name="heart"
      size={25}
      color={props.status == "true" ? "#BBBBBF" : "#BBBBBB"}
    />
  );
};
const WishListitem = props => {
  return (
    <View
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#fff",
        margin: 10,
        borderRadius: 5,
        paddingRight: 5,
        paddingLeft: 5,
        borderColor: "#fff"
      }}
    >
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View
          style={{
            justifyContent: "flex-start",
            width: 100,
            height: 100,
            paddingRight: 10,
            paddingLeft: 10
          }}
        >
          <Image
            source={{ uri: props.image }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "60%"
          }}
        >
          <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
            {props.productName}
          </Text>
          <Text style={{ color: "#696969", fontSize: 14, marginTop: 6 }}>
            {props.price}/-
          </Text>
        </View>
        <View style={{ width: "10%", alignItems: "flex-end" }}>
          <Icon
            name="trash"
            size={25}
            onPress={props.onItemDelete}
            color="#DC143C"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#eee"
  }
});

export default WishListitem;
