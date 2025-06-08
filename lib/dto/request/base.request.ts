import { RequestResource } from "../../types";

export interface SingleRequest<R extends RequestResource<any, any, any>> {
  data: R;
}

export interface CollectionRequest<R extends RequestResource<any, any, any>> {
  data: R[];
}
