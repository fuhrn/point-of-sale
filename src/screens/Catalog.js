import React, { useEffect, useState } from "react";
import { RefreshControl, StyleSheet } from "react-native";
import {
  Text,
  // Container,
  // Content,
  // Button,
  // List,
  // ListItem,
  // Thumbnail,
  // Left,
  // Right,
  // Body,
} from "native-base";
import { DataStore } from "@aws-amplify/datastore";
// import { Product } from "../../models";
import { addLineItem } from "../context/actions";
import { useOrder, useOrderDispatch } from "../context/orderContext";

function Catalog(props) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const order = useOrder();
  const dispatch = useOrderDispatch();

  // useEffect(() => {
  //     fetchProducts();
  // }, []);

  // async function fetchProducts() {
  //     const data = await DataStore.query(Product);
  //     setProducts(data);
  // };

  // function checkoutBtnHandler() {
  //     return props.navigation.push('Checkout');
  // }

  // function addProductHandler(product) {
  //     dispatch(addLineItem(product));
  // }

  // const productList = products.map(product => (
  //     <ListItem thumbnail key={product.id}>
  //         <Left>
  //             <Thumbnail square source={{ uri: product.image }} />
  //         </Left>
  //         <Body>
  //             <Text>{product.name}</Text>
  //             <Text note numberOfLines={1}>${product.price}</Text>
  //         </Body>
  //         <Right>
  //             <Button onPress={() => addProductHandler(product)}>
  //                 <Text>Add</Text>
  //             </Button>
  //         </Right>
  //     </ListItem>
  // ));

  return (
    <Text>Catalog</Text>
    // <Container>
    //     <Content refreshControl={
    //         <RefreshControl
    //             onRefresh={fetchProducts}
    //             refreshing={loading}
    //         />
    //     }>
    //         <Button block info style={styles.checkoutBtn} onPress={checkoutBtnHandler}>
    //             <Text style={styles.quantityText}>{order.totalQty}</Text>
    //             <Text style={styles.subtotalTxt}>Subtotal ${order.subtotal.toFixed(2)}</Text>
    //         </Button>
    //         <List>
    //             {productList}
    //         </List>
    //     </Content>
    // </Container>
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
