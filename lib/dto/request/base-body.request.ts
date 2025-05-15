import { BaseRequestData } from "../../types";

export class BaseRequestBody<T, ReqAttr = any, ReqRel = any> {
  data?: BaseRequestData<T, ReqAttr, ReqRel>;
}
