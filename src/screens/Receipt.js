import React from "react";
import _ from "lodash";
import moment from "moment";
import { StyleSheet } from 'react-native';
import {
  Container,
  Box,
  Divider,
  Content,
  Text,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Button,
  HStack,
  VStack
} from "native-base";

const Receipt = ({ route }) => {
  const { order } = route.params;
  const lineItemList = order.lineItems.map((lineItem) => (
    <HStack icon key={lineItem.id}>
      <Left>
        <Text>{lineItem.qty}</Text>
      </Left>
      <Body>
        <Text>{lineItem.description}</Text>
      </Body>
      <Right>
        <Text>${lineItem.total.toFixed(2)}</Text>
      </Right>
    </HStack>
  ));

  return (
    <Container>
      <Box>

          <VStack>
            <Text>Order Number</Text>
            <Text note>{order.id}</Text>
          </VStack>
          <Divider
            my="2"
            _light={{
              bg: "muted.300",
            }}
            _dark={{
              bg: "muted.50",
            }}
          />
          <VStack>
            <Text>Date</Text>
            <Text note>
              {moment(order.createdAt).format("YYYY-MM-DD hh:mm A")}
            </Text>
          </VStack>
          <Divider
            my="2"
            _light={{
              bg: "muted.300",
            }}
            _dark={{
              bg: "muted.50",
            }}
          />
          {lineItemList}

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

      </Box>
    </Container>
  );
};

export default Receipt;



const styles = StyleSheet.create({
    totalTxt: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 15,
        marginBottom: 5,
    },
    totalQty: {
        alignSelf: 'center',
        fontSize: 30,
        marginBottom: 15,
    },
    subtotalsTxt: {
        fontWeight: 'bold',
        alignSelf: 'flex-end',
    },
});
