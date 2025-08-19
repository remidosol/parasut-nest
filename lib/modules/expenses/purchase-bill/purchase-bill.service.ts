import { Injectable } from "@nestjs/common";
import { ParasutLoggerService } from "../../../common/parasut.logger";
import { ParasutHttpClient } from "../../../parasut.client";
import { RequestIncludeByType } from "../../../types";
import {
  CreatePurchaseBillRequest,
  UpdatePurchaseBillRequest,
} from "./dto/request";
import { PayPurchaseBillResponse } from "./dto/response/payment-response.dto";
import {
  CreatePurchaseBillResponse,
  GetPurchaseBillResponse,
  IndexPurchaseBillResponse,
  UpdatePurchaseBillResponse,
} from "./dto/response/response.dto";

@Injectable()
export class ParasutPurchaseBillService {
  constructor(
    private readonly parasutClient: ParasutHttpClient,
    private readonly logger: ParasutLoggerService
  ) {
    logger.setContext(ParasutPurchaseBillService.name);
  }

  /**
   * Retrieves a list of purchase bills.
   * @param queryParams - Optional parameters for filtering, sorting, pagination, and inclusion.
   *   - filter: { issue_date?: string, due_date?: string, supplier_id?: number, item_type?: string, spender_id?: number }
   *   - sort: string (e.g., "issue_date", "-net_total")
   *   - page: { number?: number, size?: number }
   *   - include: string (e.g., "category,spender,details,details.product,details.warehouse,payments")
   * @returns A list of purchase bills.
   */
  async getPurchaseBills(
    queryParams?: any
  ): Promise<IndexPurchaseBillResponse> {
    const params: any = {};
    if (queryParams) {
      if (queryParams.filter) {
        if (queryParams.filter.issue_date)
          params["filter[issue_date]"] = queryParams.filter.issue_date;
        if (queryParams.filter.due_date)
          params["filter[due_date]"] = queryParams.filter.due_date;
        if (queryParams.filter.supplier_id)
          params["filter[supplier_id]"] = queryParams.filter.supplier_id;
        if (queryParams.filter.item_type)
          params["filter[item_type]"] = queryParams.filter.item_type;
        if (queryParams.filter.spender_id)
          params["filter[spender_id]"] = queryParams.filter.spender_id;
      }
      if (queryParams.sort) params.sort = queryParams.sort;
      if (queryParams.page) {
        if (queryParams.page.number)
          params["page[number]"] = queryParams.page.number;
        if (queryParams.page.size) params["page[size]"] = queryParams.page.size;
      }
      if (queryParams.include) params.include = queryParams.include;
    }

    return this.parasutClient.get<IndexPurchaseBillResponse, any>(
      "/purchase_bills",
      params
    );
  }

  /**
   * Creates a new basic purchase bill.
   * The distinction between basic and detailed is determined by the payload.
   * @param payload - The purchase bill data.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The created purchase bill.
   */
  async createBasicPurchaseBill(
    payload: CreatePurchaseBillRequest,
    include?: RequestIncludeByType<"purchase_bills">
  ): Promise<CreatePurchaseBillResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.post<
      CreatePurchaseBillResponse,
      CreatePurchaseBillRequest,
      { include?: string }
    >("/purchase_bills", params, payload);
  }

  /**
   * Creates a new detailed purchase bill.
   * The distinction between basic and detailed is determined by the payload.
   * @param payload - The purchase bill data with detailed line items.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The created purchase bill.
   */
  async createDetailedPurchaseBill(
    payload: CreatePurchaseBillRequest,
    include?: RequestIncludeByType<"purchase_bills">
  ): Promise<CreatePurchaseBillResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.post<
      CreatePurchaseBillResponse,
      CreatePurchaseBillRequest,
      { include?: string }
    >("/purchase_bills", params, payload);
  }

  /**
   * Retrieves a specific purchase bill by its ID.
   * @param id - The ID of the purchase bill.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The purchase bill.
   */
  async getPurchaseBillById(
    id: number,
    include?: RequestIncludeByType<"purchase_bills">
  ): Promise<GetPurchaseBillResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.get<
      GetPurchaseBillResponse,
      { include?: string }
    >(`/purchase_bills/${id}`, params);
  }

  /**
   * Deletes a purchase bill by its ID.
   * @param id - The ID of the purchase bill to delete.
   * @returns A promise that resolves when the purchase bill is deleted.
   */
  async deletePurchaseBill(id: number): Promise<boolean> {
    return this.parasutClient.delete(`/purchase_bills/${id}`);
  }

  /**
   * Edits an existing basic purchase bill.
   * The distinction between basic and detailed is determined by the payload.
   * @param id - The ID of the purchase bill to update.
   * @param payload - The updated purchase bill data.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The updated purchase bill.
   */
  async editBasicPurchaseBill(
    id: number,
    payload: UpdatePurchaseBillRequest,
    include?: RequestIncludeByType<"purchase_bills">
  ): Promise<UpdatePurchaseBillResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.put<
      UpdatePurchaseBillResponse,
      UpdatePurchaseBillRequest,
      { include?: string }
    >(`/purchase_bills/${id}`, params, payload);
  }

  /**
   * Edits an existing detailed purchase bill.
   * The distinction between basic and detailed is determined by the payload.
   * @param id - The ID of the purchase bill to update.
   * @param payload - The updated purchase bill data with detailed line items.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The updated purchase bill.
   */
  async editDetailedPurchaseBill(
    id: number,
    payload: UpdatePurchaseBillRequest,
    include?: RequestIncludeByType<"purchase_bills">
  ): Promise<UpdatePurchaseBillResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.put<
      UpdatePurchaseBillResponse,
      UpdatePurchaseBillRequest,
      { include?: string }
    >(`/purchase_bills/${id}`, params, payload);
  }

  /**
   * Pays a purchase bill.
   * @param id - The ID of the purchase bill.
   * @param payload - The payment data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "payable,transaction").
   * @returns The payment transaction.
   */
  async payPurchaseBill(
    id: number,
    payload: any,
    include?: RequestIncludeByType<"purchase_bills">
  ): Promise<PayPurchaseBillResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.post<
      PayPurchaseBillResponse,
      any,
      { include?: string }
    >(`/purchase_bills/${id}/payments`, params, payload);
  }

  /**
   * Cancels a purchase bill.
   * @param id - The ID of the purchase bill to cancel.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The response from the cancel operation.
   */
  async cancelPurchaseBill(
    id: number,
    include?: RequestIncludeByType<"purchase_bills">
  ): Promise<boolean> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.delete(`/purchase_bills/${id}/cancel`, params);
  }

  /**
   * Recovers an archived/cancelled purchase bill.
   * @param id - The ID of the purchase bill to recover.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The recovered purchase bill.
   */
  async recoverPurchaseBill(
    id: number,
    include?: RequestIncludeByType<"purchase_bills">
  ): Promise<GetPurchaseBillResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.patch<
      GetPurchaseBillResponse,
      undefined,
      { include?: string }
    >(`/purchase_bills/${id}/recover`, params);
  }

  /**
   * Archives a purchase bill.
   * @param id - The ID of the purchase bill to archive.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The archived purchase bill.
   */
  async archivePurchaseBill(
    id: number,
    include?: RequestIncludeByType<"purchase_bills">
  ): Promise<GetPurchaseBillResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.patch<
      GetPurchaseBillResponse,
      undefined,
      { include?: string }
    >(`/purchase_bills/${id}/archive`, params);
  }

  /**
   * Unarchives a purchase bill.
   * @param id - The ID of the purchase bill to unarchive.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The unarchived purchase bill.
   */
  async unarchivePurchaseBill(
    id: number,
    include?: RequestIncludeByType<"purchase_bills">
  ): Promise<GetPurchaseBillResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.patch<
      GetPurchaseBillResponse,
      undefined,
      { include?: string }
    >(`/purchase_bills/${id}/unarchive`, params);
  }
}
