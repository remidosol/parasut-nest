import { ContactResponseResource } from "../../modules/contact/dto/contact.attr";
import { TransactionResponseResource } from "../../modules/contact/dto/transaction.attr";
import { CategoryResponseResource } from "../../modules/settings/category/dto/category.attr";
import { EntityType } from "../common.types";
import {
  ResponseResource,
  ResponseResourceIdentifier,
} from "./base-response.types";

export type ResponseResourceRegistryType = {
  [key in EntityType]: ResponseResource<key, any, any>;
};

export interface ResponseResourceRegistry extends ResponseResourceRegistryType {
  contacts: ContactResponseResource;
  item_categories: CategoryResponseResource;
  contact_people: ResponseResource<"contact_people", any, any>;
  contact_portals: ResponseResource<"contact_portals", any, any>;
  transactions: TransactionResponseResource;
  debit_account: ResponseResource<"accounts", any, any>;
  credit_account: ResponseResource<"accounts", any, any>;
  payments: ResponseResource<"payments", any, any>;
}

export type GetResource<T extends EntityType> = ResponseResourceRegistry[T];

export type PromoteResponseIdentifiers<U> = U extends (infer V)[]
  ? PromoteResponseIdentifiers<V>
  : U extends ResponseResourceIdentifier<infer T>
    ? GetResource<T>
    : never;
