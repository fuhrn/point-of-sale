import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly total?: number | null;
  readonly subtotal?: number | null;
  readonly tax?: number | null;
  readonly createdAt: string;
  readonly lineItems?: (LineItem | null)[] | null;
  readonly updatedAt?: string | null;
}

type LazyOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly total?: number | null;
  readonly subtotal?: number | null;
  readonly tax?: number | null;
  readonly createdAt: string;
  readonly lineItems: AsyncCollection<LineItem>;
  readonly updatedAt?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}

type EagerLineItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LineItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly qty?: number | null;
  readonly order?: Order | null;
  readonly product?: Product | null;
  readonly description?: string | null;
  readonly price?: number | null;
  readonly total?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderLineItemsId?: string | null;
  readonly lineItemProductId?: string | null;
}

type LazyLineItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LineItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly qty?: number | null;
  readonly order: AsyncItem<Order | undefined>;
  readonly product: AsyncItem<Product | undefined>;
  readonly description?: string | null;
  readonly price?: number | null;
  readonly total?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderLineItemsId?: string | null;
  readonly lineItemProductId?: string | null;
}

export declare type LineItem = LazyLoading extends LazyLoadingDisabled ? EagerLineItem : LazyLineItem

export declare const LineItem: (new (init: ModelInit<LineItem>) => LineItem) & {
  copyOf(source: LineItem, mutator: (draft: MutableModel<LineItem>) => MutableModel<LineItem> | void): LineItem;
}

type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sku?: string | null;
  readonly name?: string | null;
  readonly price?: number | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sku?: string | null;
  readonly name?: string | null;
  readonly price?: number | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}