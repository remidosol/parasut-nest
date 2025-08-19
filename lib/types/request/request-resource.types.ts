import { EntityType } from "../common.types";
import {
  RequestResource,
  RequestResourceIdentifier,
} from "./base-request.types";

export type ResponseResourceRegistryType = {
  [key in EntityType]: RequestResource<key, any, any>;
};

export interface RequestResourceRegistry extends ResponseResourceRegistryType {}

type GetRequestResource<T extends EntityType> = RequestResourceRegistry[T];

export type PromoteRequestIdentifiers<U> = U extends (infer V)[]
  ? PromoteRequestIdentifiers<V>
  : U extends RequestResourceIdentifier<infer T>
    ? GetRequestResource<T>
    : never;
