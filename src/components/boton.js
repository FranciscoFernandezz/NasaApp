import { Pressable, StyleSheet } from "react-native";
import TextWhite from "./textWhite";
import { useNavigation } from "@react-navigation/native";


export default function Boton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.boton]}
    >
      <TextWhite texto="Detalles" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: "#091c5b",
    padding: 0,
    borderRadius: 8,
    marginTop: 5,
    alignItems: "left",
  },
});
