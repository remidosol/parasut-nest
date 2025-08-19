import { Meta, ResponseResource } from "../../types";

export interface SingleResponse<
  R extends ResponseResource<any, any, any>,
  Inc = never,
> {
  data: R;
  included?: Inc;
  meta?: Meta;
}

export interface CollectionResponse<
  R extends ResponseResource<any, any, any>,
  Inc = never,
> {
  data: R[];
  included?: Inc;
  meta?: Meta;
}

// export type BaseResponse<
//   Attrs,
//   Type extends EntityType,
//   isArray extends boolean = false,
//   EndpointType extends "index" | "show" | "detail" = "index",
// > = isArray extends true
//   ? {
//       data?: BaseResponseData<Attrs, Type>;
//       included?: ResponseIncludeByType<Type, EndpointType>;
//       meta?: Meta;
//     }[]
//   : {
//       data?: BaseResponseData<Attrs, Type>;
//       included?: ResponseIncludeByType<Type, EndpointType>;
//       meta?: Meta;
//     };
