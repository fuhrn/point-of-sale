import { StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useOrder, useOrderDispatch } from "../context/orderContext";
import "@azure/core-asynciterator-polyfill";
import { DataStore } from "@aws-amplify/datastore";
import { Order, LineItem, Product } from "../models";
import { startNewOrder } from "../context/actions";
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

const Checkout = () => {
  const navigation = useNavigation();

  // "order" tiene [lineItems], subtotal, tax, total, totalQty
  const order = useOrder();

  // console.log("Order en context: ", order);
  const dispatch = useOrderDispatch();

  async function submitOrder() {
    const now = new Date().toISOString();
    const newOrder = await DataStore.save(
      new Order({
        total: order.total,
        subtotal: order.subtotal,
        tax: order.tax,
        createdAt: now,
      })
    );

    // console.log("new order: ", newOrder);

    const promises = order.lineItems.map((line) => {
      return DataStore.save(
        new LineItem({
          qty: line.qty,
          description: line.description,
          price: line.price,
          total: line.total,
          order: newOrder, // associate to order
          product: line.product, // associate to product
        })
      );
    });

    await Promise.all(promises);
    // console.log("Order: ", order);
  }

  async function checkoutBtnHandler() {
    await submitOrder();
    // reseteo la orden, la dejo en cero
    dispatch(startNewOrder());
    navigation.goBack();
  }

  const LineDetail = ({ item }) => (
    <Box>
      <HStack
        space={[4, 2]}
        justifyContent="space-between"
        alignItems="center"
        width="95%"
      >
        {/* <Image source={{ uri: item.image }} alt="Alternate Text" size="sm" /> */}

        <Text>{item.qty}</Text>
        <Text>$ {item.description}</Text>
        <Text style={styles.itemTotal}>${item.total.toFixed(2)}</Text>

        {/* <Button success onPress={() => addProductHandler(item)}>
            <Text>Add</Text>
          </Button> */}
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
    <Container alignSelf="center" py={50}>
      <Text style={styles.totalTxt}>TOTAL</Text>
      <Text style={styles.totalQty}>${order.total.toFixed(2)}</Text>
      <FlatList
        data={order.lineItems}
        renderItem={({ item }) => <LineDetail item={item} />}
        style={{ flexGrow: 0 }}
      />
      <Box style={{ alignSelf: "flex-end" }}>
        <HStack>
          <Text>Subtotal</Text>
          <Text style={{ marginLeft: 10, paddingRight: 5 }}>
            ${order.subtotal.toFixed(2)}
          </Text>
        </HStack>
        <HStack>
          <Text style={{ flex: 1 }}>Tax</Text>
          <Text style={{ marginLeft: 10, paddingRight: 5 }}>
            ${order.tax.toFixed(2)}
          </Text>
        </HStack>
        <HStack>
          <Text style={{ flex: 1 }}>Total</Text>
          <Text style={{ marginLeft: 10, paddingRight: 5 }}>
            ${order.total.toFixed(2)}
          </Text>
        </HStack>
      </Box>
      <Button
        block
        info
        style={styles.checkoutBtn}
        onPress={checkoutBtnHandler}
        disabled={order.lineItems.length === 0}
      >
        <Text style={styles.checkoutTxt}>Checkout</Text>
      </Button>
    </Container>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  itemTotal: {
    paddingRight: 5,
  },
  totalTxt: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 15,
    paddingTop: 35,
    marginBottom: 5,
  },
  totalQty: {
    alignSelf: "center",
    fontSize: 30,
    paddingTop: 15,
    marginBottom: 25,
  },
  subtotalsTxt: {
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  checkoutBtn: {
    margin: 5,
    marginTop: 10,
    marginBottom: 10,
    height: 60,
    backgroundColor: "tomato",
    alignSelf: "center",
    // width:"95%"
  },
  checkoutTxt: {
    fontSize: 20,
  },
});
