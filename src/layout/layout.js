import React from "react";
import { SafeAreaView, View, StyleSheet, Platform } from "react-native";

export default function Layout({ children }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[
          styles.container,
          { marginTop: Platform.OS === "android" ? 25 : 0, backgroundColor: "#071a5f" },
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
