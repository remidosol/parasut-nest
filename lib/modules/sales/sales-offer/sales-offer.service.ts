import { Injectable } from "@nestjs/common";
import { ParasutLoggerService } from "../../../common/parasut.logger";
import { ParasutHttpClient } from "../../../parasut.client";
import { RequestIncludeByType } from "../../../types";
import {
  CreateSalesOfferRequest,
  SalesOfferQueryParams,
  ShareSalesOfferByEmailRequest,
  UpdateSalesOfferRequest,
  UpdateSalesOfferStatusRequest,
} from "./dto/request";
import {
  CreateSalesOfferResponse,
  GetSalesOfferDetailsResponse,
  GetSalesOfferResponse,
  IndexSalesOfferResponse,
  SalesOfferPdfResponse,
  ShareSalesOfferByEmailResponse,
  UpdateSalesOfferResponse,
  UpdateSalesOfferStatusResponse,
} from "./dto/response/response.dto";

@Injectable()
export class ParasutSalesOfferService {
  constructor(
    private readonly parasutClient: ParasutHttpClient,
    private readonly logger: ParasutLoggerService
  ) {
    logger.setContext(ParasutSalesOfferService.name);
  }

  /**
   * Retrieves a list of sales offers.
   * @param queryParams - Optional parameters for filtering, sorting, pagination, and inclusion.
   * @returns A list of sales offers.
   */
  async getSalesOffers(
    queryParams?: SalesOfferQueryParams
  ): Promise<IndexSalesOfferResponse> {
    const params: any = {};

    if (queryParams) {
      // Filter parameters
      if (queryParams.filter) {
        if (queryParams.filter.archived !== undefined)
          params["filter[archived]"] = queryParams.filter.archived;
        if (queryParams.filter.query)
          params["filter[query]"] = queryParams.filter.query;
        if (queryParams.filter.invoice_status)
          params["filter[invoice_status]"] = queryParams.filter.invoice_status;
        if (queryParams.filter.status)
          params["filter[status]"] = queryParams.filter.status;
      }

      // Sorting (default: "id")
      if (queryParams.sort) {
        params.sort = queryParams.sort;
      }

      // Pagination
      if (queryParams.page?.number) {
        params["page[number]"] = queryParams.page.number;
      }

      // Include relationships
      if (queryParams.include) {
        params.include = queryParams.include.join(",");
      }
    }

    return this.parasutClient.get<IndexSalesOfferResponse, any>(
      "/sales_offers",
      params
    );
  }

  /**
   * Creates a new sales offer.
   * @param payload - The sales offer data (typically an object with type, attributes, and relationships).
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The created sales offer.
   */
  async createSalesOffer(
    payload: CreateSalesOfferRequest,
    include?: RequestIncludeByType<"sales_offers">
  ): Promise<CreateSalesOfferResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");

    return this.parasutClient.post<
      CreateSalesOfferResponse,
      CreateSalesOfferRequest,
      { include?: string }
    >("/sales_offers", params, payload);
  }

  /**
   * Retrieves a specific sales offer by its ID.
   * @param id - The ID of the sales offer.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The sales offer.
   */
  async getSalesOfferById(
    id: number,
    include?: RequestIncludeByType<"sales_offers">
  ): Promise<GetSalesOfferResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");

    return this.parasutClient.get<GetSalesOfferResponse, { include?: string }>(
      `/sales_offers/${id}`,
      params
    );
  }

  /**
   * Updates an existing sales offer.
   * @param id - The ID of the sales offer to update.
   * @param payload - The updated sales offer data.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The updated sales offer.
   */
  async updateSalesOffer(
    id: number,
    payload: UpdateSalesOfferRequest,
    include?: RequestIncludeByType<"sales_offers">
  ): Promise<UpdateSalesOfferResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include.join(",");

    return this.parasutClient.put<
      UpdateSalesOfferResponse,
      UpdateSalesOfferRequest,
      { include?: string }
    >(`/sales_offers/${id}`, params, payload);
  }

  /**
   * Deletes a sales offer by its ID.
   * @param id - The ID of the sales offer to delete.
   * @returns A promise that resolves when the sales offer is deleted.
   */
  async deleteSalesOffer(id: number): Promise<boolean> {
    return this.parasutClient.delete(`/sales_offers/${id}`);
  }

  /**
   * Requests the PDF generation for a sales offer.
   * The response will contain information about the trackable job.
   * @param id - The ID of the sales offer.
   * @returns Information about the PDF generation job including URL, status, and tracking details.
   */
  async getSalesOfferPdf(id: number): Promise<SalesOfferPdfResponse> {
    return this.parasutClient.post<
      SalesOfferPdfResponse,
      any,
      Record<string, never>
    >(`/sales_offers/${id}/pdf`);
  }

  /**
   * Archives a sales offer by its ID.
   * @param id - The ID of the sales offer to archive.
   * @returns The archived sales offer.
   */
  async archiveSalesOffer(id: number): Promise<GetSalesOfferResponse> {
    return this.parasutClient.patch<GetSalesOfferResponse, undefined>(
      `/sales_offers/${id}/archive`
    );
  }

  /**
   * Unarchives a sales offer by its ID.
   * @param id - The ID of the sales offer to unarchive.
   * @returns The unarchived sales offer.
   */
  async unarchiveSalesOffer(id: number): Promise<GetSalesOfferResponse> {
    return this.parasutClient.patch<GetSalesOfferResponse, undefined>(
      `/sales_offers/${id}/unarchive`
    );
  }

  /**
   * Retrieves the details of a sales offer.
   * @param id - The ID of the sales offer.
   * @param queryParams - Optional parameters for pagination and inclusion.
   *   - page: { size?: number }
   *   - include: string (e.g., "product")
   * @returns The details of the sales offer.
   */
  async getSalesOfferDetails(
    id: number,
    queryParams?: SalesOfferQueryParams
  ): Promise<GetSalesOfferDetailsResponse> {
    const params: any = {};

    if (queryParams) {
      if (queryParams.page && queryParams.page.size) {
        params["page[size]"] = queryParams.page.size;
      }
      if (queryParams.include) {
        params.include = queryParams.include.join(",");
      }
    }

    return this.parasutClient.get<
      GetSalesOfferDetailsResponse,
      { include?: string }
    >(`/sales_offers/${id}/details`, params);
  }

  /**
   * Updates the status of a sales offer.
   * @param id - The ID of the sales offer.
   * @param payload - The attributes to update for the sales offer status.
   * @param include - Comma-separated list of relationships to include in the response (part of the request body).
   * @returns The updated sales offer.
   */
  async updateSalesOfferStatus(
    id: number,
    payload: UpdateSalesOfferStatusRequest,
    include?: RequestIncludeByType<"sales_offers">
  ): Promise<UpdateSalesOfferStatusResponse> {
    const params: { include?: string } = {};

    if (include) {
      params.include = include.join(",");
    }

    return this.parasutClient.patch<
      UpdateSalesOfferStatusResponse,
      UpdateSalesOfferStatusRequest,
      { include?: string }
    >(`/sales_offers/${id}/update_status`, params, payload);
  }

  /**
   * Shares a sales offer via email using the generic sharings endpoint.
   * @param sharingPayload - The payload for the sharing request, type "sharing_forms".
   *                         This payload should contain email details and potentially link to the sales offer.
   * @param include - Comma-separated list of relationships to include (e.g., "collaborator,contact,portal_accounts").
   * @returns The response from the sharing operation.
   */
  async shareSalesOfferByEmail(
    payload: ShareSalesOfferByEmailRequest,
    include?: RequestIncludeByType<"sales_offers">
  ): Promise<ShareSalesOfferByEmailResponse> {
    const params: { include?: string } = {};

    if (include) {
      params.include = include.join(",");
    }

    return this.parasutClient.post<
      ShareSalesOfferByEmailResponse,
      ShareSalesOfferByEmailRequest,
      { include?: string }
    >("/sharings", params, payload);
  }
}
