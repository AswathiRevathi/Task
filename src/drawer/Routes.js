import React from "react";
import {
  ToastAndroid,
  Linking,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { Router, Scene } from "react-native-router-flux";
import { Actions, ActionConst } from "react-native-router-flux";
import SideBar from "../drawer/Sidebar";
import Login from "../screens/Login";
import Splash from "../screens/SplashScreen";
import Wishlist from "../screens/WishList";

import Signup from "../screens/Signup";
import Home from "../screens/Home";
import Icon from "react-native-vector-icons/FontAwesome";

const MenuIcon = () => {
  return (
    <View style={{ paddingLeft: 5 }}>
      <Icon type="font-awesome" name="bars" color="#fff" size={27} />
    </View>
  );
};
const wishIcon = () => {
  return (
    <View style={{ paddingRight: 15 }}>
      <TouchableOpacity onPress={() => Actions.Wishlist()}>
        <Icon type="font-awesome" name="heart" color="#fff" size={25} />
      </TouchableOpacity>
    </View>
  );
};

const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene key="splash" component={Splash} hideNavBar={true} initial />

      <Scene key="login" component={Login} hideNavBar={true} />
      <Scene key="signup" component={Signup} hideNavBar={true} />

      <Scene
        key="drawer1"
        drawer
        contentComponent={SideBar}
        drawerIcon={MenuIcon}
        drawerWidth={300}
        hideNavBar
        color
      >
        <Scene key="drawerroot">
          <Scene
            key="Home"
            navigationBarStyle={{ backgroundColor: "#ef5350" }}
            component={Home}
            title="Trendzz"
            titleStyle={{ color: "#fff" }}
            renderRightButton={wishIcon}
          />
          <Scene
            key="Wishlist"
            navigationBarStyle={{ backgroundColor: "#ef5350" }}
            titleStyle={{ color: "#fff" }}
            component={Wishlist}
            title="WishList"
          />

          {/* <Scene key = "Service" component         = {Service}   title         = "Doctors" renderRightButton={CallIcon} />
 <Scene key = "AddressDetails" component = {AddressDetails} title ="AddressDetails" renderRightButton={CallIcon} /> */}
        </Scene>
      </Scene>
    </Scene>
  </Router>
);

export default Routes;
