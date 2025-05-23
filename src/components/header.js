import { View, Text, Image, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>APOD</Text>
      <Image
        source={require("../../assets/images/NASA.png")}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
});
