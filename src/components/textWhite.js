import { View, Text } from "react-native";

//por que si lo usamos en otro archivo, primero lo exportamos
export default TextWhite = ({ texto, fontSize = 20 }) => {
  return (
    <View>
      <Text style={{ color: "white", fontSize: fontSize }}>{texto}</Text>
    </View>
  );
};