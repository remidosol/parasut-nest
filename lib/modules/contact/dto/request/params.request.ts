import {
  BasePaginationParams,
  BasePaginationParamsType,
} from "../../../../dto/request";

export type ContactPaginationParamsType = BasePaginationParamsType<
  "id" | "balance" | "name" | "email",
  "contacts"
>;

export class ContactPaginationParams extends BasePaginationParams<
  "id" | "balance" | "name" | "email",
  "contacts"
> {
  constructor(dto?: ContactPaginationParamsType) {
    super(dto);
  }
}
