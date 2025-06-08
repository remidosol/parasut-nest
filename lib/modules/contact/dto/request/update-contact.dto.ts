import { SingleRequest } from "../../../../dto/request";
import { ContactRequestResource } from "../contact.attr";

export type UpdateContactRequest = Partial<
  SingleRequest<ContactRequestResource>
>;
