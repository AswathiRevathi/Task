import React, { Component } from "react";
import { Text, View, FlatList, Image, AsyncStorage } from "react-native";
import WishListitem from "../componants/WishListitem";
import { openDatabase } from "react-native-sqlite-storage";
var db = openDatabase({ name: "Taskdatabase.db" });

export default class WishList extends Component {
  constructor(props) {
    super();
    this.state = {
      userId: "",
      wishListArray: []
    };
  }

  componentWillMount() {
    this.displaydata();
  }
  displaydata = async () => {
    try {
      await AsyncStorage.getItem("userId", (error, result) => {
        if (result == null) {
          console.log("userId", JSON.parse(result));
        } else {
          this.setState(
            {
              userId: JSON.parse(result)
            },
            function() {
              this._getWishList();
            }
          );

          console.log("userId", JSON.parse(result));
        }
      });
    } catch (error) {}
  };
  componentDidMount() {}

  _deleteItemFromWishList = (userId, id, index) => {
    console.log("item to delete", userId + "----" + id);

    db.transaction(tx => {
      tx.executeSql(
        "DELETE FROM  table_wishlist where user_id=? AND item_id=?",
        [this.state.userId, id],
        (tx, results) => {
          console.log("userId", this.state.userId + "---" + id);

          console.log("Results after deletion", results.rowsAffected);
          if (results.rowsAffected > 0) {
            tx.executeSql(
              "SELECT * FROM table_wishlist where user_id=? ",
              [this.state.userId],
              (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                  temp.push(results.rows.item(i));
                }

                this.setState(
                  {
                    wishListArray: temp
                  },
                  function() {
                    tx.executeSql(
                      "UPDATE table_products set item_status=? where user_id=? AND id=?",
                      ["false", this.state.userId, id],
                      (tx, results) => {
                        console.log("Results", results.rowsAffected);
                        if (results.rowsAffected > 0) {
                          consol.log("updated", "---" + 8);
                        } else {
                          consol.log("not  updated", "---" + 8);
                        }
                      }
                    );
                  }
                );

                console.log("  after deletion wishlistS", temp);
              }
            );
          } else {
            alert("Please insert a valid User Id");
          }
        }
      );
    });
  };
  FlatListItemSeparator = () => {
    return (
      <View style={{ height: 1, width: "100%", backgroundColor: "#C8C8C8" }} />
    );
  };
  _getWishList = () => {
    console.log("inside get wishlist", this.state.userId);
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM table_wishlist where user_id=? ",
        [this.state.userId],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          this.setState({
            wishListArray: temp
          });

          console.log("bww wishhh array", this.state.wishListArray);
        }
      );
    });
  };
  render() {
    let flatListModal = null;
    if (this.state.wishListArray.length == 0) {
      flatListModal = (
        <View
          style={{
            marginRight: 20,
            marginLeft: 20,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 10,
            paddingBottom: 10,
            marginBottom: 10,
            backgroundColor: "white",
            borderRadius: 10,
            borderWidth: 3,
            height: "100%",
            width: "100%",
            borderColor: "#fff"
          }}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../assets/nodata.png")}
          />
          <Text>NO ITEMS IN </Text>
        </View>
      );
    } else {
      flatListModal = (
        <FlatList
          data={this.state.wishListArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={info => (
            <WishListitem
              id={info.item.item_id}
              productName={info.item.item_name}
              price={info.item.item_amount}
              image={info.item.item_image}
              status={info.item.item_status}
              onItemDelete={() =>
                this._deleteItemFromWishList(
                  this.state.userId,
                  info.item.item_id,
                  info.index
                )
              }
            />
          )}
        />
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {flatListModal}
      </View>
    );
  }
}
