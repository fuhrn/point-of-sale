import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Box,
  // Content,
  View,
  Text,
  useToast,
  Button,
} from "native-base";
import { DataStore } from "@aws-amplify/datastore";
import loadProducts from "../scripts/loadProducts";

const Settings = () => {
  const toast = useToast();
  async function createProducts() {
    try {
      await loadProducts();
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              Products loaded, pull to refresh
            </Box>
          );
        },
      });

      // props.navigation.navigate('Checkout');
    } catch (error) {
      () =>
        toast.show({
          text: error,
          buttonText: "Ok",
          duration: 3000,
        });
    }
  }

  async function clearDataStore() {
    await DataStore.clear();
    toast.show({
      render: () => {
        return (
          <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
            Storage cleared, pull to refresh
          </Box>
        );
      },
    });
    // props.navigation.navigate('Checkout');
  }

  return (
    <Container>
      <View>
        <Button block info style={styles.settingsBtn} onPress={createProducts}>
          <Text>Create dummy products</Text>
        </Button>
        {/* <Button block info style={styles.settingsBtn} onPress={clearDataStore}> */}
        <Button block info style={styles.settingsBtn} onPress={clearDataStore}>
          <Text>Clear local storage</Text>
        </Button>
      </View>
    </Container>
  );
};

export default Settings;

const styles = StyleSheet.create({
  settingsBtn: {
    margin: 5,
    marginTop: 10,
    marginBottom: 10,
    height: 60,
    backgroundColor: "tomato",
  },
});
