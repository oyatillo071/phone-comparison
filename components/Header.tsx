import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  Platform,
} from "react-native";

const Header = () => {
  return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.searchBox}>
          <Ionicons
              name="search"
              size={22}
              color="#B0B8C1"
              style={{ marginRight: 8 }}
          />
          <TextInput
              placeholder="Поиск товаров"
              placeholderTextColor="#B0B8C1"
              style={styles.searchInput}
          />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    margin: 16,
    borderWidth: 1,
    borderColor: "#E3E6ED",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#232A36",
  },
});

export default Header;
