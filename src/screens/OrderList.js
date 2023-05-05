import React from "react";
import { StyleSheet } from "react-native";
import _ from "lodash";
import moment from "moment";
import { Text, HStack, VStack, Divider, Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons"; 

const OrderList = ({ orders, onSelectOrder }) => {

  function onPress(orderId) {
    if (onSelectOrder) {
      onSelectOrder(orderId);
    }
  }

  const ordersByDay = _.groupBy(orders, (order) =>
    moment(order.createdAt).format("YYYY-MM-DD")
  );

  const days = _.keys(ordersByDay);

  const ordersByDayList = days.map((day) => {
    const sorted = ordersByDay[day].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    const orderList = sorted.map((order) => (
      <Pressable  key={order.id} onPress={() => onPress(order.id)}>
        <HStack>
          <VStack style={{ flow: 1 }}>
            <Text style={styles.orderTitle}>
              {moment(order.createdAt).format("hh:mm A")}
            </Text>
            <Text note>{order.id}</Text>
          </VStack>
          <VStack>
            <Text note>${order.total.toFixed(2)}</Text>
            <Ionicons name="arrow-forward" size={24} color="black" />
          </VStack>
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
      </Pressable>
    ));

    const sectionTitle = (
      <HStack>
        <Text>{moment(day).format("MMM Do, YYYY")}</Text>
      </HStack>
    );

    return [sectionTitle, ...orderList];
  });

  return <VStack>{ordersByDayList}</VStack>;
};

export default OrderList;

const styles = StyleSheet.create({
  orderTitle: {
    fontSize: 20,
  },
  orderListItem: {
    padding: 15,
  },
});
