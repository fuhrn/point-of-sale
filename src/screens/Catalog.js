import React, { useEffect, useState } from "react";
import { RefreshControl, StyleSheet } from "react-native";
import {
  Text,
  Container,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  VStack,
  // Content,
  Button,
  FlatList,
  // ListItem,
  Image,
  // Left,
  // Right,
  // Body,
} from "native-base";
import "@azure/core-asynciterator-polyfill";
import { DataStore } from "@aws-amplify/datastore";
import { Product } from "../models";
import { addLineItem } from "../context/actions";
import { useOrder, useOrderDispatch } from "../context/orderContext";

function Catalog({navigation}) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const order = useOrder();
  const dispatch = useOrderDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  let dataStoreProducts = [];

  async function fetchProducts() {
    try {
      dataStoreProducts = await DataStore.query(Product);
      setProducts(dataStoreProducts);
      console.log(
        "Products retrieved successfully!"
        // JSON.stringify(dataStoreProducts, null, 2)
      );
    } catch (error) {
      console.log("Error retrieving products", error);
    }
  }

  function checkoutBtnHandler() {
      return navigation.navigate('Checkout');
  }

  function addProductHandler(product) {
    dispatch(addLineItem(product));
  }

  const ProductItem = ({ item }) => (
    <Box>
      <HStack
        space={[4, 2]}
        justifyContent="space-between"
        alignItems="center"
        width="95%"
      >
        <Image source={{ uri: item.image }} alt="Alternate Text" size="sm" />
        <VStack style={{ flex: 1 }}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text>$ {item.price}</Text>
        </VStack>

        <Button success onPress={() => addProductHandler(item)}>
          <Text>Add</Text>
        </Button>
      </HStack>
      <Divider
        my="2"
        _light={{
          bg: "muted.300",
        }}
        _dark={{
          bg: "muted.50",
        }}
      />
    </Box>
  );

  return (
    <Container alignSelf="center">
      <Box>
        <Button
          // block
          // info
          style={styles.checkoutBtn}
          onPress={checkoutBtnHandler}
        >
          <HStack space={6} >
            <Text style={styles.quantityText}>Items: {order.totalQty}</Text>
            <Text style={styles.subtotalTxt}>
              Subtotal ${order.subtotal.toFixed(2)}
            </Text>
          </HStack>
        </Button>

        <FlatList
          data={products}
          renderItem={({ item }) => <ProductItem item={item} />}
        />
      </Box>
    </Container>
  );
}

export default Catalog;

const styles = StyleSheet.create({
  checkoutBtn: {
    margin: 5,
    marginTop: 10,
    marginBottom: 10,
    height: 60,
    backgroundColor: "tomato",
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 12,
  },
  quantityText: {
    // width: "30%",
    // textAlign: "center",
    // paddingLeft: 10,
    fontSize: 18,
    // marginRight:30,
  },
  subtotalTxt: {
    fontSize: 18,
    // width: "70%",
  },
});
