import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  View,
  ToastAndroid,
  AsyncStorage,
  BackHandler,
  Text
} from "react-native";
import { Actions } from "react-native-router-flux";
import LogoImage from "../../assets/trendz.png";

class splashscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }
  backAndroid() {
    BackHandler.exitApp();
  }
  displaydata = async () => {
    try {
      await AsyncStorage.getItem("isLogin", (error, result) => {
        if (result == null) {
          this.setState({ isLogin: false }, function() {});

          console.log("value", result);
        } else {
          console.log("value", result);

          this.setState({ isLogin: result }, function() {});
        }
      });

      // ToastAndroid.show(u, ToastAndroid.SHORT);
    } catch (error) {}
  };

  backAndroid() {
    BackHandler.exitApp();
  }

  handleBackButton() {
    BackHandler.exitApp();
    return true;
  }

  componentDidMount() {
    console.log("componantdidmount", "componant");

    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    ); // Remove listener
  }

  componentWillMount() {
    this.displaydata();

    console.log("componantwillmount", "componant");
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

    setTimeout(() => {
      if (this.state.isLogin == "true") {
        Actions.drawer1();
        // Actions.pop()
      } else {
        Actions.login();
      }
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 150, width: 150 }}>
          <Image
            source={LogoImage}
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    alignItems: "center",
    backgroundColor: "white"
  },
  welcome: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    color: "red"
  }
});

export default splashscreen;
