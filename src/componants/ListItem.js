import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
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
const ListItem = props => {
  var id = props.id;
  console.log("id is op", id);
  console.log("status is op", props.status);

  let icons = null;

  if (props.status == "true") {
    icons = (
      <Icon name="heart" size={25} onPress={props.onitemAdd} color="#8B0000" />
    );
  } else {
    icons = (
      <Icon name="heart" size={25} onPress={props.onitemAdd} color="#C0C0C0" />
    );
  }

  return (
    <View
      style={{
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10,
        borderColor: "#fff"
      }}
    >
      <View style={{ flexDirection: "column", flex: 1 }}>
        <View
          style={{ alignItems: "flex-end", width: "100%", paddingRight: 10 }}
        >
          {icons}
        </View>
        <View
          style={{
            justifyContent: "center",
            flex: 1,
            width: "100%",
            height: 180,
            alignItems: "center"
          }}
        >
          <Image
            source={{ uri: props.image }}
            style={{ width: "100%", height: "100%", margin: 8 }}
            resizeMode="contain"
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          margin: 5
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 16,
            fontWeight: "bold",
            fontSize: 16
          }}
        >
          {props.productName}
        </Text>
        <Text
          style={{
            color: "#696969",
            fontSize: 14,
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 14
          }}
        >
          {props.price}/-
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: "#eee"
  }
});

export default ListItem;
