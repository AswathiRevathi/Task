import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  AsyncStorage,
  BackHandler,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import { Actions, ActionConst } from "react-native-router-flux";
import { openDatabase } from "react-native-sqlite-storage";
import LogoImage from "../../assets/login.png";

var db = openDatabase({ name: "Taskdatabase.db" });
export default class SplashLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      password: "",
      flag: 0,
      data_in: 0,
      dataStatus: "",
      user_id: "",
      data: [
        {
          "id": 1,
          "price": "Rs 3099",
          "product_name": "Red And Black Plaid Shirt ",
          "images": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2-zgSBHvXGFbWoHdzPkC8OPVtbokdTBi_uMPwyOoyi3xJMRDUFg",
          "status": "false"
        },
        {
          "id": 2,
          "price": "Rs 1790",
          "product_name": "Muta Fashions Plain Indian",
          "images": "https://lqp-p-imgs.s3-ap-south-1.amazonaws.com/faceview/ec/j5a/ce/a1f/affimgs/az-large-5249042.jpg",
          "status": "false"
        },
        {
          "id": 3,
          "price": "Rs 1922",
          "product_name": "Vishudh printed A-line Kurta",
          "images": "http://pngimg.com/uploads/dress_shirt/dress_shirt_PNG8111.png",
          "status": "false"
        },
        {
          "id": 4,
          "price": "Rs 1922",
          "product_name": "Vishudh printed A-line Kurta",
          "images": "http://im.rediff.com/fashion/2015/jun/thankar-cream-anarkali-suit.png",
          "status": "false"
        },
        {
          "id": 5,
          "price": "Rs 1922",
          "product_name": "Vishudh printed A-line Kurta",
          "images": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRarwIVVdSgrSAVUc2aFKF7otW3GCIXjTQFMi9-zr_DkdcA9kuL",
          "status": "false"
        },
        {
          "id": 6,
          "price": "Rs 1922",
          "product_name": "V printed A-line Kurta",
          "images": "https://cdn.shopify.com/s/files/1/0015/7772/products/Dresses_by_Lara_Girl_Meets_Dress_11_medium.png?v=1501245755",
          "status": "false"
        },
        {
          "id": 7,
          "price": "Rs 1922",
          "product_name": "Vishudh printed A-line Kurta",
          "images": "https://sepapparel.com/media/catalog/product/cache/2db0c6628ea8a3209d75a74ee76e4484/g/e/georgia-d1009_silo.png",
          "status": "false"
        },
        {
          "id": 8,
          "price": "Rs 1922",
          "product_name": "Vishudh printed A-line Kurta",
          "images": "https://pngimage.net/wp-content/uploads/2018/06/indian-dress-png-3.png",
          "status": "false"
        },
        {
          "id": 9,
          "price": "Rs 1922",
          "product_name": "Vishudh printed A-line Kurta",
          "images": "http://www.pngpix.com/wp-content/uploads/2016/10/PNGPIX-COM-Girl-Dress-PNG-Transparent-Image-500x690.png",
          "status": "false"
        }
      ]
    };
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function(tx, res) {
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_user", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20),password INT(10))",
              []
            );
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_wishlist(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INT(10),item_id INT(10),item_name VARCHAR(30),item_image VARCHAR(200),item_amount INT(30))",
              []
            );
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_products(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INT(10), item_name VARCHAR(30),item_image VARCHAR(200),item_amount INT(30),item_status  VARCHAR(40))",
              []
            );
          }
        }
      );
    });
  }

  _storeData = async () => {
    console.log("calling store");
    try {
      await AsyncStorage.setItem("isLogin", "true");
    } catch (error) {
      // Error saving data
    }
  };
  backAndroid() {
    BackHandler.exitApp();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    ); // Remove listener
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }
  _storeUserId = async id => {
    console.log("calling store", id);
    try {
      await AsyncStorage.setItem("userId", JSON.stringify(id));
    } catch (error) {
      // Error saving data
    }
  };
  displaydata = async () => {
    try {
      await AsyncStorage.getItem("userId", (error, result) => {
        if (result == null) {
          console.log("userId", JSON.parse(result));
        } else {
          this.setState(
            {
              user_id: JSON.parse(result)

              // userId:responseJson.UserId.toString()
            },
            function() {
              console.log("userId from display data", this.state.user_id);
              this._productsAdd(this.state.user_id);

              // this.register_user();
            }
          );

          // console.log("userId",JSON.parse(result))
        }
      });

      // ToastAndroid.show(u, ToastAndroid.SHORT);
    } catch (error) {}
  };
  _dataloaded = async () => {
    console.log("calling store", id);
    try {
      await AsyncStorage.setItem("data", "true");
    } catch (error) {
      // Error saving data
    }
  };

  _productsAdd = id => {
    console.log(" in id _productsAdd ", id);

    var arrayData = this.state.data;
    console.log(" in arrayData ", arrayData);

    db.transaction(function(tx) {
      tx.executeSql(
        "SELECT   * FROM table_products where user_id=? ",
        [id],
        (tx, results) => {
          console.log("count  after query", results.rows.length);

          if (results.rows.length == 0) {
            for (let i = 0; i < arrayData.length; i++) {
              tx.executeSql(
                "INSERT INTO table_products (user_id,item_name,item_image,item_amount,item_status ) VALUES (?,?,?,?,?)",
                [
                  id,
                  arrayData[i].product_name,
                  arrayData[i].images,
                  arrayData[i].price,
                  arrayData[i].status
                ],
                (tx, results) => {
                  console.log("Results", results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    console.log("inserting");
                  } else {
                    console.log("not inserting");
                  }
                }
              );
            }
          } else {
            console.log("data already loaded");
          }
        }
      );
    });
  };

  //     this._dataloaded();

  _signUp = () => {
    Actions.signup();

    this.textInput.clear();
    this.textInput2.clear();
  };
  _login = () => {
    if (this.state.user_name.trim()) {
      if (this.state.password.trim()) {
        db.transaction(tx => {
          tx.executeSql("SELECT * FROM table_user", [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }

            console.log("temo", temp);
            for (let k = 0; k < temp.length; k++) {
              if (temp[k].user_name == this.state.user_name) {
                if (temp[k].password == this.state.password) {
                  this.setState({
                    flag: 1
                  });
                  this._storeUserId(temp[k].user_id);
                  this.displaydata();
                  console.log("userid", temp[k].user_id);
                  // this._getDataStaus();
                }
              }
            }

            if (this.state.flag == 1) {
              ToastAndroid.show("Login Successfull", ToastAndroid.SHORT);

              this._storeData();

              Actions.drawer1();
            } else {
              alert("Try again");

              this.textInput.clear();
              this.textInput2.clear();
            }
          });
        });
      } else {
        alert("Please Enter Password");
      }
    } else {
      alert("Please Enter Username");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={LogoImage} style={{ width: 80, height: 80 }} />

        <TextInput
          ref={input => {
            this.textInput = input;
          }}
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginTop: 10,
            marginBottom: 10,
            width: "60%"
          }}
          placeholder=" Username"
          onChangeText={user_name => this.setState({ user_name })}
        />
        <TextInput
          secureTextEntry={true}
          ref={input2 => {
            this.textInput2 = input2;
          }}
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
            width: "60%"
          }}
          placeholder=" password"
          onChangeText={password => this.setState({ password })}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10
          }}
        >
           <TouchableOpacity
            style={{
              width: 150,
              height: 30,
              borderColor: "gray",
              borderWidth: 2,
              margin: 5,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ef5350"
            }}
            onPress={this._signUp}
          >
            <Text style={{ color: "#fff" }}>SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 150,
              height: 30,
              borderColor: "gray",
              borderWidth: 2,
              borderRadius: 10,
              margin: 5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ef5350"
            }}
            onPress={this._login}
          >
            <Text style={{color:'#fff'}}>LOGIN</Text>
          </TouchableOpacity>

         
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
    backgroundColor: "#fff"
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
