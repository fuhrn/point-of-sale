import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
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

const CheckoutStack = createStackNavigator();
const CheckoutScreen = () => {
  return (
    <CheckoutStack.Navigator>
      <CheckoutStack.Screen
        name="Catalog"
        component={Catalog}
        options={{ title: "Point of Sale" }}
      />
      <CheckoutStack.Screen name="Checkout" component={Checkout} />
    </CheckoutStack.Navigator>
  );
};

const OrdersStack = createStackNavigator();
const OrdersScreen = () => {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen name="Orders" component={Orders} />
      <OrdersStack.Screen name="Receipt" component={Receipt} />
    </OrdersStack.Navigator>
  );
};

const SettingsStack = createStackNavigator();
const SettingsScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={Settings} />
    </SettingsStack.Navigator>
  );
};

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <OrderProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarActiveTintColor: "tomato",
              headerShown: false,
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
            <Tab.Screen name="Checkout" component={CheckoutScreen} />
            <Tab.Screen name="Orders" component={OrdersScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
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
