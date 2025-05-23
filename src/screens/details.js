import { View, Text, Image, StyleSheet } from "react-native";

export default function Details({ route }) {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <Image source={{ uri: data.url }} style={styles.image} />
      <Text style={styles.date}>{data.date}</Text>
      <Text style={styles.explanation}>{data.explanation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071a5f",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  explanation: {
    color: "white",
    fontSize: 14,
  },
});
