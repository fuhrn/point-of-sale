import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import { Amplify } from "aws-amplify";
import awsExports from "./src/aws-exports";
import { DataStore } from "aws-amplify";
import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter";
import { OrderProvider } from "./src/context/orderContext";
DataStore.configure({
  storageAdapter: ExpoSQLiteAdapter,
});

import Catalog from "./src/screens/Catalog";
import Settings from "./src/screens/Settings";

Amplify.configure(awsExports);

export default function App() {
  return (
    <OrderProvider>
      <NativeBaseProvider>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
          <Catalog />
          <Settings />
        </View>
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
