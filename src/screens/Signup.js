import React, { Component } from "react";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity
} from "react-native";
import { Actions, ActionConst } from "react-native-router-flux";

import { openDatabase } from "react-native-sqlite-storage";
var db = openDatabase({ name: "Taskdatabase.db" });

export default class Signup extends Component {
  constructor(props) {
    super();
    this.state = {
      user_name: "",
      flag: 0,
      password: "",
      confirm_password: ""
    };
  }
  _signup = () => {
    this.setState({
      flag: 0
    });
    if (this.state.user_name.trim()) {
      if (this.state.password.trim()) {
        if (this.state.password.length >= 6) {
          if (
            this.state.password.trim() == this.state.confirm_password.trim()
          ) {
            //inserting data
            db.transaction(tx => {
              tx.executeSql("SELECT * FROM table_user", [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                  temp.push(results.rows.item(i));
                }

                console.log("temo", temp);
                for (let k = 0; k < temp.length; k++) {
                  if (temp[k].user_name == this.state.user_name) {
                    this.setState({
                      flag: 1
                    });
                    break;
                  }
                }

                if (this.state.flag == 1) {
                  alert("Try again with another Username");

                  this.textInputUsername.clear();
                  this.textPassword.clear();
                  this.textConfirmPassword.clear();
                  console.log("FLAAG" + this.state.flag);

                  // Actions.drawer1();
                } else {
                  tx.executeSql(
                    "INSERT INTO table_user (user_name, password) VALUES (?,?)",
                    [this.state.user_name, this.state.password],
                    (tx, results) => {
                      console.log("Results", results.rowsAffected);
                      if (results.rowsAffected > 0) {
                        console.log("flaag", this.state.flag);

                        Alert.alert(
                          "Success",
                          "You are Registered Successfully",
                          [
                            {
                              text: "Ok",
                              onPress: () => Actions.login()
                            }
                          ],
                          { cancelable: false }
                        );
                      } else {
                        alert("Registration Failed");
                      }
                    }
                  );
                }
              });
            });
          } else {
            alert("Please enter Confirm Password");
          }
        } else {
          alert("Password requires minimum 6 characters");
        }
      } else {
        alert("Please Enter Password");
      }
    } else {
      alert("Please Enter Username");
    }
  };

  _login = () => {
    this.textInputUsername.clear();
    this.textPassword.clear();
    this.textConfirmPassword.clear();
    Actions.login();
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          ref={input => {
            this.textInputUsername = input;
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
            this.textPassword = input2;
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
        <TextInput
          secureTextEntry={true}
          ref={input3 => {
            this.textConfirmPassword = input3;
          }}
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 20,
            width: "60%"
          }}
          placeholder="Confirm Password"
          onChangeText={confirm_password => this.setState({ confirm_password })}
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
            onPress={this._login}
          >
            <Text style={{ color: "#fff" }}>LOGIN</Text>
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
            onPress={this._signup}
          >
            <Text style={{color:'#fff'}}>SIGN UP</Text>
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
    backgroundColor: "#F5FCFF"
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
