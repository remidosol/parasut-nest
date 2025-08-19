import {
  CollectionResponse,
  SingleResponse,
} from "../../../../../dto/response";
import {
  CategoryResponseIncluded,
  CategoryResponseResource,
} from "../category.attr";

export type CategoryResponse = SingleResponse<
  CategoryResponseResource,
  CategoryResponseIncluded[]
>;

export type CategoryArrayResponse = CollectionResponse<
  CategoryResponseResource,
  CategoryResponseIncluded[]
>;

// export type CategoryResponse<isArray extends boolean = false> = BaseResponse<
//   CategoryAttributes,
//   "item_categories",
//   isArray
// >;
