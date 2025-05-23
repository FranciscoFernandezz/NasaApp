//Imagen, titulo, fecha y boton ->
import { StyleSheet, View, Image,Pressable } from "react-native";
import TextWhite from "./textWhite";

//recibir y mostrar la fecha
//
export default function Visor({ titulo, url, fecha, onPress }) {
  return (
    <View style={styles.container}>
      <TextWhite texto={titulo} fontSize={24} />
      <Image source={{ uri: url }} style={styles.img} />
      <TextWhite texto={fecha} fontSize={14} />
      <Pressable onPress={onPress} style={styles.button}>
        <TextWhite texto="Detalles" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    padding: 10,
    borderColor: "#b14c52",
    borderWidth: 2,
    borderRadius: 10,
  },
  img: {
    alignSelf: "center",
    width: 300,
    height: 200,
    borderRadius: 10,
    padding: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#091c5b",
    padding: 0,
    borderRadius: 8,
    alignItems: "left",
  },
});