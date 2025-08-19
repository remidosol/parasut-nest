import {
  CollectionResponse,
  SingleResponse,
} from "../../../../../dto/response";
import { TagResponseIncluded, TagResponseResource } from "../tag.attr";

export type TagResponse = SingleResponse<
  TagResponseResource,
  TagResponseIncluded[]
>;

export type TagArrayResponse = CollectionResponse<
  TagResponseResource,
  TagResponseIncluded[]
>;
