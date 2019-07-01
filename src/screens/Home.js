import React, { Component } from "react";
import {
  Text,
  View,
  AsyncStorage,
  Alert,
  FlatList,
  BackHandler
} from "react-native";
import ListItem from "../componants/ListItem";
import { openDatabase } from "react-native-sqlite-storage";
var db = openDatabase({ name: "Taskdatabase.db" });

export default class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      userId: "",
      productArray: [],
      item_id: 1,
      item_name: "",
      item_image: "",
      item_amount: 0
    };
  }
  exit = () => {
    Alert.alert(
      "Logout",
      "Do you really want to exit from App?",
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
    // this.removeItemValue(UserId);
    BackHandler.exitApp();
  };
  componentDidMount() {
    this.displaydata();

    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.exit();

      // works best when the goBack is async
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  _getProducts = () => {
    console.log("ID IN HOME", this.state.userId);
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM table_products where user_id=? ",
        [this.state.userId],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          console.log("added product array", temp);
          this.setState({
            productArray: temp
          });
        }
      );
    });
  };
  componentWillMount() {
    console.log("inside home", "88");

    this.displaydata();
  }
  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{ height: 1, width: "100%", backgroundColor: "#C8C8C8" }} />
    );
  };
  displaydata = async () => {
    try {
      await AsyncStorage.getItem("userId", (error, result) => {
        if (result == null) {
          console.log("userId", JSON.parse(result));
        } else {
          this.setState(
            {
              userId: JSON.parse(result)

              // userId:responseJson.UserId.toString()
            },
            function() {
              this._getProducts();
            }
          );

          console.log("userId", JSON.parse(result));
        }
      });

      // ToastAndroid.show(u, ToastAndroid.SHORT);
    } catch (error) {}
  };

  _add = (value, status) => {
    console.log("getting  id on add", status);

    if (status == "false") {
      console.log("inside false", 9);
      db.transaction(tx => {
        tx.executeSql(
          "UPDATE table_products set item_status=? where user_id=? AND id=?",
          ["true", this.state.userId, value],
          (tx, results) => {
            console.log("Results", results.rowsAffected);
            if (results.rowsAffected > 0) {
              db.transaction(tx => {
                tx.executeSql(
                  "SELECT * FROM table_products where user_id=? ",
                  [this.state.userId],
                  (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                      temp.push(results.rows.item(i));
                    }

                    console.log("  INSIDE NEW ARRAY", temp);

                    this.setState(
                      {
                        productArray: temp
                      },
                      function() {
                        console.log("Updation arry", this.state.productArray);
                      }
                    );

                    console.log("INSIDE STATE UPDATE", this.state.productArray);
                  }
                );
              });
              tx.executeSql(
                "SELECT * FROM table_products where user_id=? AND id=? ",
                [this.state.userId, value],
                (tx, results) => {
                  var len = results.rows.item(0).item_name;

                  console.log("  itemNme", len);

                  tx.executeSql(
                    "INSERT INTO table_wishlist (user_id,item_id,item_name,item_image,item_amount ) VALUES (?,?,?,?,?)",
                    [
                      this.state.userId,
                      value,
                      results.rows.item(0).item_name,
                      results.rows.item(0).item_image,
                      results.rows.item(0).item_amount
                    ],
                    (tx, results) => {
                      console.log("Results", results.rowsAffected);
                      if (results.rowsAffected > 0) {
                        console.log(
                          "adding to wish listtt",
                          results.rowsAffected.length
                        );

                        tx.executeSql(
                          "SELECT * FROM table_wishlist where user_id=? ",
                          [this.state.userId],
                          (tx, results) => {
                            var temp = [];
                            for (let i = 0; i < results.rows.length; ++i) {
                              temp.push(results.rows.item(i));
                            }

                            console.log("  INSIDE WISHLIST ITEMS", temp);
                          }
                        );
                      } else {
                        console.log("not inserting");
                      }
                    }
                  );

                  console.log("INSIDE STATE UPDATE", this.state.productArray);
                }
              );
            } else {
              console.log("Updation Failed");
            }
          }
        );
      });
    } else {
      console.log("inside true", 9);

      db.transaction(tx => {
        tx.executeSql(
          "UPDATE table_products set item_status=? where user_id=? AND id=?",
          ["false", this.state.userId, value],
          (tx, results) => {
            console.log("Results", results.rowsAffected);
            if (results.rowsAffected > 0) {
              db.transaction(tx => {
                tx.executeSql(
                  "SELECT * FROM table_products where user_id=? ",
                  [this.state.userId],
                  (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                      temp.push(results.rows.item(i));
                    }

                    console.log("  INSIDE NEW ARRAY", temp);

                    this.setState(
                      {
                        productArray: temp
                      },
                      function() {
                        console.log("Updation arry", this.state.productArray);
                      }
                    );

                    console.log("INSIDE STATE UPDATE", this.state.productArray);
                  }
                );
              });
              tx.executeSql(
                "SELECT * FROM table_products where user_id=? AND id=? ",
                [this.state.userId, value],
                (tx, results) => {
                  var len = results.rows.item(0).item_name;

                  console.log("  itemNme", len);

                  tx.executeSql(
                    "DELETE FROM  table_wishlist where user_id=? AND item_id=?",
                    [this.state.userId, value],
                    (tx, results) => {
                      console.log("userId", results.rows);

                      console.log(
                        "Results after deletion",
                        results.rowsAffected
                      );
                      if (results.rowsAffected > 0) {
                        tx.executeSql(
                          "SELECT * FROM table_wishlist where user_id=? ",
                          [this.state.userId],
                          (tx, results) => {
                            var temp = [];
                            for (let i = 0; i < results.rows.length; ++i) {
                              temp.push(results.rows.item(i));
                            }

                            console.log("  after deletion wishlistS", temp);
                          }
                        );
                      } else {
                        alert("Please insert a valid User Id");
                      }
                    }
                  );

                  console.log("INSIDE STATE UPDATE", this.state.productArray);
                }
              );
            } else {
              console.log("Updation Failed");
            }
          }
        );
      });
    }
  };
  
  render() {
    return (
      <View>
        <FlatList
          data={this.state.productArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={info => (
            <ListItem
              id={info.item.id}
              productName={info.item.item_name}
              price={info.item.item_amount}
              image={info.item.item_image}
              status={info.item.item_status}
              onitemAdd={() => this._add(info.item.id, info.item.item_status)}
            />
          )}
        />
      </View>
    );
  }
}
