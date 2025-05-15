import { BaseResponseData, Included, Meta, ResponseType } from "../../types";

export class BaseResponse<Attrs, Type extends ResponseType> {
  data?: BaseResponseData<Attrs, Type>;
  included?: Included[];
  meta?: Meta;
}
