import {
  CollectionResponse,
  SingleResponse,
} from "../../../../../dto/response";
import { TagResponseIncluded, TagResponseResource } from "../tag.attrs";

export type TagResponse = SingleResponse<
  TagResponseResource,
  TagResponseIncluded[]
>;

export type TagArrayResponse = CollectionResponse<
  TagResponseResource,
  TagResponseIncluded[]
>;
