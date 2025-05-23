import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import details from "../screens/details";

export default function Routes() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#1a1b5e",
            },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Detalles"
          component={details}
          options={{
            title: "Detalles",
            headerStyle: {
              backgroundColor: "#1a1b5e",
            },
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
