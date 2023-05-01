import { createContext, useContext, useReducer } from "react";
import orderReducer from "./reducers";

const OrderContext = createContext(null);

const OrderDispatchContext = createContext(null);

const orderInitialState = {
  totalQty: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
  lineItems: [],
};

export function OrderProvider({ children }) {
  const [order, dispatch] = useReducer(orderReducer, orderInitialState);

  return (
    <OrderContext.Provider value={order}>
      <OrderDispatchContext.Provider value={dispatch}>
        {children}
      </OrderDispatchContext.Provider>
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}

export function useOrderDispatch() {
  return useContext(OrderDispatchContext);
}