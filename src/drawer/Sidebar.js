import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  AsyncStorage,
  Alert,
  TouchableHighlight
} from "react-native";

import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";

export default class Sidebar extends Component {
  toHome = () => {
    Actions.Home();
  };
  toWishList = () => {
    Actions.Wishlist();
  };

  _logout = () => {
    Alert.alert(
      "Logout",
      "Do you really want to Logout from App?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Confirm", onPress: () => this.exitFromApp() }
      ],
      { cancelable: false }
    );
  };
  exitFromApp = () => {
    this.removeItemValue("userId");
    this._storeData();
    // this.removeItemValue(UserId);
    Actions.login();
  };
  _storeData = async () => {
    console.log("calling store");
    try {
      await AsyncStorage.setItem("isLogin", "false");
    } catch (error) {
      // Error saving data
    }
  };

  removeItemValue = async key => {
    try {
      await AsyncStorage.removeItem(key);
      console.log("removed", "000");
      return true;
    } catch (exception) {
      return false;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 60
            }}
          >
            <Icon name="home" size={25} color="#cccccc" />

            <Text
              style={{ margin: 10, color: "#cccccc", fontSize: 25 }}
              onPress={this.toHome}
            >
              Home
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 60
            }}
          >
            <Icon name="heart" size={25} color="#cccccc" />

            <Text
              style={{ margin: 10, color: "#cccccc", fontSize: 25 }}
              onPress={this.toWishList}
            >
              WishList
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 60
            }}
          >
            <Icon name="sign-out" size={25} color="#cccccc" />

            <Text
              style={{ color: "#cccccc", fontSize: 25 }}
              onPress={this._logout}
            >
              Logout
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#111111"
  },
  textInput: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
