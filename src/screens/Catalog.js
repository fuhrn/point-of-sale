import React, { useEffect, useState } from "react";
import { RefreshControl, StyleSheet } from "react-native";
import {
  Text,
  Container,
  Box,
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

function Catalog(props) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const order = useOrder();
  const dispatch = useOrderDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  let dataStoreProducts = ["prueba"];

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
      // return props.navigation.push('Checkout');
  }

  function addProductHandler(product) {
    dispatch(addLineItem(product));
  }

  const ProductItem = ({ item }) => (
    <HStack space={[2, 2]} justifyContent="space-between">
      <Image source={{ uri: item.image }} alt="Alternate Text" size="sm" />
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>

      <Button success onPress={() => addProductHandler(item)}>
        <Text>Add</Text>
      </Button>
    </HStack>

    // <VStack justifyContent="space-between" key={product.id}>
    //   <Text>
    //     <Image square source={{ uri: product.image }} />
    //   </Text>
    //     <Text>{product.name}</Text>
    //     <Text note numberOfLines={1}>
    //       ${product.price}
    //     </Text>
    //   <Text>
    //     <Button success onPress={() => addProductHandler(product)}>
    //       <Text>Add</Text>
    //     </Button>
    //   </Text>
    // </VStack>
  );

  return (
    <Container>
      <Box>
        <Button
          block
          info
          style={styles.checkoutBtn}
          onPress={checkoutBtnHandler}
        >
          <Text style={styles.quantityText}>{order.totalQty}</Text>
          <Text style={styles.subtotalTxt}>
             ${order.subtotal.toFixed(2)}
          </Text>
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
  subtotalTxt: {
    fontSize: 20,
    width: "70%",
  },
  quantityText: {
    width: "30%",
    textAlign: "center",
    paddingLeft: 10,
    fontSize: 20,
  },
});
