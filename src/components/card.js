import { View, Text, Image, StyleSheet } from "react-native";
import Boton from "./boton";

export default function Card({ title, date, url, isMain, onPress }) {
  if (isMain) {
    return (
      <View style={styles.cardMain}>
        <Text style={styles.title}>{title}</Text>
        <Image
          source={typeof url === "string" ? { uri: url } : url}
          style={styles.imageMain}
        />
        <Text style={styles.date}>{date}</Text>
        <Boton onPress={onPress} />
      </View>
    );
  }

  return (
    <View style={styles.cardSecondary}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        <Boton onPress={onPress} />
      </View>
      <Image
        source={typeof url === "string" ? { uri: url } : url}
        style={styles.imageSecondary}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  cardSecondary: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#b14c52",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#071a5f",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    color: "white",
    fontSize: 12,
    marginBottom: 5,
    marginTop: 5,
  },
  imageSecondary: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});