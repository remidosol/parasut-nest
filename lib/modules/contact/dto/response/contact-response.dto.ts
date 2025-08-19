import { CollectionResponse, SingleResponse } from "../../../../dto/response";
import {
  ContactResponseIncluded,
  ContactResponseResource,
} from "../contact.attr";

export type CreateContactResponse = SingleResponse<
  ContactResponseResource,
  ContactResponseIncluded[]
>;

export type GetContactResponse = SingleResponse<
  ContactResponseResource,
  ContactResponseIncluded[]
>;

export type UpdateContactResponse = SingleResponse<
  ContactResponseResource,
  ContactResponseIncluded[]
>;

export type ContactIndexResponse = CollectionResponse<
  ContactResponseResource,
  ContactResponseIncluded[]
>;
