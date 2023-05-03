import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Amplify } from "aws-amplify";
import awsExports from "./src/aws-exports";
import { DataStore } from "aws-amplify";
import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter";
import { OrderProvider } from "./src/context/orderContext";
DataStore.configure({
  storageAdapter: ExpoSQLiteAdapter,
});

import Catalog from "./src/screens/Catalog";
import Checkout from "./src/screens/Checkout";
import Orders from "./src/screens/Orders";
import Receipt from "./src/screens/Receipt";
import Settings from "./src/screens/Settings";

Amplify.configure(awsExports);

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <OrderProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
              tabBarIcon: ({ color, size }) => {
                if (route.name === "Checkout") {
                  return <Ionicons name="ios-cart" size={size} color={color} />;
                } else if (route.name === "Orders") {
                  return (
                    <Ionicons name="ios-archive" size={size} color={color} />
                  );
                } else if (route.name === "Settings") {
                  return (
                    <Ionicons name="ios-settings" size={size} color={color} />
                  );
                }
              },
            })}
          >
            <Tab.Screen name="Checkout" component={Checkout} />
            <Tab.Screen name="Orders" component={Orders} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </OrderProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
