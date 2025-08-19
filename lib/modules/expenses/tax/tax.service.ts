import { Injectable } from "@nestjs/common";
import { ParasutLoggerService } from "../../../common/parasut.logger";
import { ParasutHttpClient } from "../../../parasut.client";
import {
  CreateTaxRequest,
  PayTaxRequest,
  UpdateTaxRequest,
} from "./dto/request";
import { PayTaxResponse } from "./dto/response/payment-response.dto";
import {
  CreateTaxResponse,
  GetTaxResponse,
  IndexTaxResponse,
  UpdateTaxResponse,
} from "./dto/response/response.dto";

@Injectable()
export class ParasutTaxService {
  constructor(
    private readonly parasutClient: ParasutHttpClient,
    private readonly logger: ParasutLoggerService
  ) {
    logger.setContext(ParasutTaxService.name);
  }

  /**
   * Retrieves a list of taxes.
   * @param queryParams - Optional parameters for filtering, sorting, pagination, and inclusion.
   *   - filter: { due_date?: string, issue_date?: string, currency?: string, remaining?: number }
   *   - sort: string (e.g., "issue_date", "-net_total")
   *   - page: { number?: number, size?: number }
   *   - include: string (e.g., "category,tags")
   * @returns A list of taxes.
   */
  async getTaxes(queryParams?: any): Promise<IndexTaxResponse> {
    const params: any = {};
    if (queryParams) {
      if (queryParams.filter) {
        if (queryParams.filter.due_date)
          params["filter[due_date]"] = queryParams.filter.due_date;
        if (queryParams.filter.issue_date)
          params["filter[issue_date]"] = queryParams.filter.issue_date;
        if (queryParams.filter.currency)
          params["filter[currency]"] = queryParams.filter.currency;
        if (queryParams.filter.remaining !== undefined)
          params["filter[remaining]"] = queryParams.filter.remaining;
      }
      if (queryParams.sort) params.sort = queryParams.sort;
      if (queryParams.page) {
        if (queryParams.page.number)
          params["page[number]"] = queryParams.page.number;
        if (queryParams.page.size) params["page[size]"] = queryParams.page.size;
      }
      if (queryParams.include) params.include = queryParams.include;
    }

    return this.parasutClient.get<IndexTaxResponse, any>("/taxes", params);
  }

  /**
   * Creates a new tax.
   * @param payload - The tax data.
   * @returns The created tax.
   */
  async createTax(payload: CreateTaxRequest): Promise<CreateTaxResponse> {
    return this.parasutClient.post<CreateTaxResponse, CreateTaxRequest>(
      "/taxes",
      payload
    );
  }

  /**
   * Retrieves a specific tax by its ID.
   * @param id - The ID of the tax.
   * @returns The tax.
   */
  async getTaxById(id: number): Promise<GetTaxResponse> {
    return this.parasutClient.get<GetTaxResponse>(`/taxes/${id}`);
  }

  /**
   * Updates an existing tax.
   * @param id - The ID of the tax to update.
   * @param payload - The updated tax data.
   * @returns The updated tax.
   */
  async updateTax(
    id: number,
    payload: UpdateTaxRequest
  ): Promise<UpdateTaxResponse> {
    return this.parasutClient.put<UpdateTaxResponse, UpdateTaxRequest>(
      `/taxes/${id}`,
      payload
    );
  }

  /**
   * Deletes a tax by its ID.
   * @param id - The ID of the tax to delete.
   * @returns A promise that resolves when the tax is deleted.
   */
  async deleteTax(id: number): Promise<boolean> {
    return this.parasutClient.delete(`/taxes/${id}`);
  }

  /**
   * Archives a tax by its ID.
   * @param id - The ID of the tax to archive.
   * @returns The archived tax.
   */
  async archiveTax(id: number): Promise<GetTaxResponse> {
    return this.parasutClient.patch<GetTaxResponse, undefined>(
      `/taxes/${id}/archive`
    );
  }

  /**
   * Unarchives a tax by its ID.
   * @param id - The ID of the tax to unarchive.
   * @returns The unarchived tax.
   */
  async unarchiveTax(id: number): Promise<GetTaxResponse> {
    return this.parasutClient.patch<GetTaxResponse, undefined>(
      `/taxes/${id}/unarchive`
    );
  }

  /**
   * Pays a tax.
   * @param id - The ID of the tax.
   * @param payload - The payment data.
   * @returns The payment transaction.
   */
  async payTax(id: number, payload: PayTaxRequest): Promise<PayTaxResponse> {
    return this.parasutClient.post<PayTaxResponse, PayTaxRequest>(
      `/taxes/${id}/payments`,
      payload
    );
  }
}
