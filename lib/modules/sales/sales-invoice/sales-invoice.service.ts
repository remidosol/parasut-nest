import { Injectable } from "@nestjs/common";
import { ParasutLoggerService } from "../../../common/parasut.logger";
import { ParasutHttpClient } from "../../../parasut.client";
import { RequestIncludeByType } from "../../../types";
import {
  CreateSalesInvoiceRequest,
  UpdateSalesInvoiceRequest,
} from "./dto/request";
import { PaySalesInvoiceResponse } from "./dto/response/payment-response.dto";
import {
  CreateSalesInvoiceResponse,
  GetSalesInvoiceResponse,
  IndexSalesInvoiceResponse,
  UpdateSalesInvoiceResponse,
} from "./dto/response/response.dto";

@Injectable()
export class ParasutSalesInvoiceService {
  constructor(
    private readonly parasutClient: ParasutHttpClient,
    private readonly logger: ParasutLoggerService
  ) {
    logger.setContext(ParasutSalesInvoiceService.name);
  }

  /**
   * Retrieves a list of sales invoices.
   * @param queryParams - Optional parameters for filtering, sorting, pagination, and inclusion.
   *   - filter: { issue_date?: string, due_date?: string, contact_id?: number, invoice_id?: string, invoice_series?: string, item_type?: string, print_status?: string, payment_status?: string }
   *   - sort: string (e.g., "issue_date", "-net_total")
   *   - page: { number?: number, size?: number }
   *   - include: string (e.g., "category,contact,details,details.product,details.warehouse,payments,payments.transaction,tags,sharings,recurrence_plan,active_e_document")
   * @returns A list of sales invoices.
   */
  async getSalesInvoices(
    queryParams?: any
  ): Promise<IndexSalesInvoiceResponse> {
    const params: any = {};
    if (queryParams) {
      if (queryParams.filter) {
        if (queryParams.filter.issue_date)
          params["filter[issue_date]"] = queryParams.filter.issue_date;
        if (queryParams.filter.due_date)
          params["filter[due_date]"] = queryParams.filter.due_date;
        if (queryParams.filter.contact_id)
          params["filter[contact_id]"] = queryParams.filter.contact_id;
        if (queryParams.filter.invoice_id)
          params["filter[invoice_id]"] = queryParams.filter.invoice_id;
        if (queryParams.filter.invoice_series)
          params["filter[invoice_series]"] = queryParams.filter.invoice_series;
        if (queryParams.filter.item_type)
          params["filter[item_type]"] = queryParams.filter.item_type;
        if (queryParams.filter.print_status)
          params["filter[print_status]"] = queryParams.filter.print_status;
        if (queryParams.filter.payment_status)
          params["filter[payment_status]"] = queryParams.filter.payment_status;
      }
      if (queryParams.sort) params.sort = queryParams.sort;
      if (queryParams.page) {
        if (queryParams.page.number)
          params["page[number]"] = queryParams.page.number;
        if (queryParams.page.size) params["page[size]"] = queryParams.page.size;
      }
      if (queryParams.include) params.include = queryParams.include;
    }
    return this.parasutClient.get<IndexSalesInvoiceResponse, any>(
      "/sales_invoices",
      params
    );
  }

  /**
   * Creates a new sales invoice.
   * @param payload - The sales invoice data.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The created sales invoice.
   */
  async createSalesInvoice(
    payload: CreateSalesInvoiceRequest,
    include?: RequestIncludeByType<"sales_invoices">
  ): Promise<CreateSalesInvoiceResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.post<
      CreateSalesInvoiceResponse,
      CreateSalesInvoiceRequest,
      { include?: string }
    >("/sales_invoices", params, payload);
  }

  /**
   * Retrieves a specific sales invoice by its ID.
   * @param id - The ID of the sales invoice.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The sales invoice.
   */
  async getSalesInvoiceById(
    id: number,
    include?: RequestIncludeByType<"sales_invoices">
  ): Promise<GetSalesInvoiceResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.get<
      GetSalesInvoiceResponse,
      { include?: string }
    >(`/sales_invoices/${id}`, params);
  }

  /**
   * Updates an existing sales invoice.
   * @param id - The ID of the sales invoice to update.
   * @param payload - The updated sales invoice data.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The updated sales invoice.
   */
  async updateSalesInvoice(
    id: number,
    payload: UpdateSalesInvoiceRequest,
    include?: RequestIncludeByType<"sales_invoices">
  ): Promise<UpdateSalesInvoiceResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.put<
      UpdateSalesInvoiceResponse,
      UpdateSalesInvoiceRequest,
      { include?: string }
    >(`/sales_invoices/${id}`, params, payload);
  }

  /**
   * Deletes a sales invoice by its ID.
   * @param id - The ID of the sales invoice to delete.
   * @returns A promise that resolves when the sales invoice is deleted.
   */
  async deleteSalesInvoice(id: number): Promise<boolean> {
    return this.parasutClient.delete(`/sales_invoices/${id}`);
  }

  /**
   * Records a payment for a sales invoice.
   * @param id - The ID of the sales invoice.
   * @param payload - The payment data.
   * @param include - Comma-separated list of relationships to include in the response (e.g., "payable,transaction").
   * @returns The payment transaction.
   */
  async paySalesInvoice(
    id: number,
    payload: any,
    include?: RequestIncludeByType<"sales_invoices">
  ): Promise<PaySalesInvoiceResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.post<
      PaySalesInvoiceResponse,
      any,
      { include?: string }
    >(`/sales_invoices/${id}/payments`, params, payload);
  }

  /**
   * Cancels a sales invoice.
   * @param id - The ID of the sales invoice to cancel.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The response from the cancel operation.
   */
  async cancelSalesInvoice(
    id: number,
    include?: RequestIncludeByType<"sales_invoices">
  ): Promise<boolean> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.delete(`/sales_invoices/${id}/cancel`, params);
  }

  /**
   * Recovers a cancelled/archived sales invoice.
   * @param id - The ID of the sales invoice to recover.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The recovered sales invoice.
   */
  async recoverSalesInvoice(
    id: number,
    include?: RequestIncludeByType<"sales_invoices">
  ): Promise<GetSalesInvoiceResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.patch<
      GetSalesInvoiceResponse,
      undefined,
      { include?: string }
    >(`/sales_invoices/${id}/recover`, params);
  }

  /**
   * Archives a sales invoice.
   * @param id - The ID of the sales invoice to archive.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The archived sales invoice.
   */
  async archiveSalesInvoice(
    id: number,
    include?: RequestIncludeByType<"sales_invoices">
  ): Promise<GetSalesInvoiceResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.patch<
      GetSalesInvoiceResponse,
      undefined,
      { include?: string }
    >(`/sales_invoices/${id}/archive`, params);
  }

  /**
   * Unarchives a sales invoice.
   * @param id - The ID of the sales invoice to unarchive.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The unarchived sales invoice.
   */
  async unarchiveSalesInvoice(
    id: number,
    include?: RequestIncludeByType<"sales_invoices">
  ): Promise<GetSalesInvoiceResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.patch<
      GetSalesInvoiceResponse,
      undefined,
      { include?: string }
    >(`/sales_invoices/${id}/unarchive`, params);
  }

  /**
   * Converts an estimate to an invoice.
   * This typically applies when the sales_invoice ID is actually an estimate ID.
   * @param id - The ID of the estimate (which is a type of sales_invoice) to convert.
   * @param payload - The payload required for conversion, usually minimal or specific to define invoice attributes.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The newly created invoice.
   */
  async convertEstimateToInvoice(
    id: number,
    payload: any,
    include?: RequestIncludeByType<"sales_invoices">
  ): Promise<GetSalesInvoiceResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");
    return this.parasutClient.patch<
      GetSalesInvoiceResponse,
      any,
      { include?: string }
    >(`/sales_invoices/${id}/convert_to_invoice`, params, payload);
  }
}
