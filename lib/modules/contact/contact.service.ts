import { BadRequestException, Injectable } from "@nestjs/common";
import { validate } from "class-validator";
import { ParasutLoggerService } from "../../common/parasut.logger";
import { ParasutHttpClient } from "../../parasut.client";
import { RequestIncludeByType } from "../../types";
import {
  ContactFilterParams,
  ContactFilterParamsType,
  ContactPaginationParams,
  ContactPaginationParamsType,
  CreateContactRequest,
  CreateTransactionRequest,
  UpdateContactRequest,
} from "./dto/request";
import {
  ContactIndexResponse,
  CreateContactResponse,
  CreateTransactionResponse,
  GetContactResponse,
  UpdateContactResponse,
} from "./dto/response";

@Injectable()
export class ParasutContactService {
  constructor(
    private readonly parasutClient: ParasutHttpClient,
    private readonly logger: ParasutLoggerService
  ) {
    logger.setContext(ParasutContactService.name);
  }

  /**
   * Retrieves a list of contacts with optional filtering and pagination.
   * @param filter - Optional filter parameters for contacts.
   * @param pagination - Optional pagination parameters.
   * @returns A promise that resolves to the contact response.
   * @throws BadRequestException if filter or pagination validation fails.
   */
  async getContacts(
    filter?: ContactFilterParamsType,
    pagination?: ContactPaginationParamsType
  ): Promise<ContactIndexResponse> {
    let filterParams = new ContactFilterParams(filter);
    let paginationParams = new ContactPaginationParams(pagination);

    if (filter) {
      const filterErrors = await validate(filterParams);

      if (filterErrors.length > 0) {
        this.logger.error("Filter validation failed", filterErrors);
        throw new BadRequestException("Filter validation failed");
      }
    }

    if (pagination) {
      const paginationErrors = await validate(paginationParams);

      if (paginationErrors.length > 0) {
        this.logger.error("Pagination validation failed", paginationErrors);
        throw new BadRequestException("Pagination validation failed");
      }
    }

    const response = await this.parasutClient.get<
      ContactIndexResponse,
      ContactFilterParamsType & ContactPaginationParamsType
    >("/contacts", {
      ...filterParams.toJson(),
      ...paginationParams.toJson(),
    });

    return response;
  }

  /**
   * Creates a new contact.
   * @param payload - The contact data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,contact_portal,contact_people").
   * @returns The created contact.
   */
  async createContact(
    payload: CreateContactRequest,
    include?: RequestIncludeByType<"contacts">
  ): Promise<CreateContactResponse> {
    const params: { include?: string } = {};

    if (include) {
      params.include = include.join(",");
    }

    const response = await this.parasutClient.post<
      CreateContactResponse,
      CreateContactRequest,
      { include?: string }
    >("/contacts", params, payload);

    return response;
  }

  /**
   * Retrieves a specific contact by its ID.
   * @param id - The ID of the contact.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,contact_portal,contact_people").
   * @returns The contact.
   */
  async getContactById(
    id: number,
    include?: RequestIncludeByType<"contacts">
  ): Promise<GetContactResponse> {
    const params: { include?: string } = {};

    if (include) {
      params.include = include.join(",");
    }

    const response = await this.parasutClient.get<
      GetContactResponse,
      { include?: string }
    >(`/contacts/${id}`, params);

    return response;
  }

  /**
   * Updates an existing contact.
   * @param id - The ID of the contact to update.
   * @param payload - The updated contact data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "category,contact_portal,contact_people").
   * @returns The updated contact.
   */
  async updateContact(
    id: number,
    payload: UpdateContactRequest,
    include?: RequestIncludeByType<"contacts">
  ): Promise<UpdateContactResponse> {
    const params: { include?: string } = {};

    if (include) {
      params.include = include.join(",");
    }

    const response = await this.parasutClient.put<
      UpdateContactResponse,
      UpdateContactRequest,
      { include?: string }
    >(`/contacts/${id}`, params, payload);

    return response;
  }

  /**
   * Deletes a contact by its ID.
   * @param id - The ID of the contact to delete.
   * @returns A promise that resolves when the contact is deleted.
   */
  async deleteContact(id: number): Promise<boolean> {
    return this.parasutClient.delete(`/contacts/${id}`);
  }

  /**
   * Creates a collection transaction (Tahsilat) for a contact.
   * @param id - The ID of the contact.
   * @param payload - The collection transaction data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "debit_account,credit_account,payments").
   * @returns The created collection transaction.
   */
  async createContactCollection(
    id: number,
    payload: CreateTransactionRequest,
    include?: RequestIncludeByType<"transactions">
  ): Promise<CreateTransactionResponse> {
    const params: { include?: string } = {};

    if (include) {
      params.include = include.join(",");
    }

    const response = await this.parasutClient.post<
      CreateTransactionResponse,
      CreateTransactionRequest,
      { include?: string }
    >(`/contacts/${id}/contact_debit_transactions`, params, payload);

    return response;
  }

  /**
   * Creates a payment transaction (Ödeme) for a contact.
   * @param id - The ID of the contact.
   * @param payload - The payment transaction data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "debit_account,credit_account,payments").
   * @returns The created payment transaction.
   */
  async createContactPayment(
    id: number,
    payload: CreateTransactionRequest,
    include?: RequestIncludeByType<"transactions">
  ): Promise<CreateTransactionResponse> {
    const params: { include?: string } = {};

    if (include) {
      params.include = include.join(",");
    }

    const response = await this.parasutClient.post<
      CreateTransactionResponse,
      CreateTransactionRequest,
      { include?: string }
    >(`/contacts/${id}/contact_credit_transactions`, params, payload);

    return response;
  }
}
