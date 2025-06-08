import { Injectable } from "@nestjs/common";
import { ParasutLoggerService } from "../../../common/parasut.logger";
import { ParasutHttpClient } from "../../../parasut.client";

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
   *   - filter: { archived?: boolean, query?: string, invoice_status?: string, status?: string }
   *   - sort: string (e.g., "id", "issue_date", "-net_total")
   *   - page: { number?: number, size?: number }
   *   - include: string (e.g., "contact,sales_invoice")
   * @returns A list of sales offers.
   */
  async getSalesOffers(queryParams?: any): Promise<any> {
    const params: any = {};
    if (queryParams) {
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
      if (queryParams.sort) params.sort = queryParams.sort;
      if (queryParams.page) {
        if (queryParams.page.number)
          params["page[number]"] = queryParams.page.number;
        if (queryParams.page.size) params["page[size]"] = queryParams.page.size;
      }
      if (queryParams.include) params.include = queryParams.include;
    }
    return this.parasutClient.get<any, any>("/sales_offers", params);
  }

  /**
   * Creates a new sales offer.
   * @param payload - The sales offer data (typically an object with type, attributes, and relationships).
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The created sales offer.
   */
  async createSalesOffer(payload: any, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    return this.parasutClient.post<any, any, any>(
      "/sales_offers",
      params,
      payload
    );
  }

  /**
   * Retrieves a specific sales offer by its ID.
   * @param id - The ID of the sales offer.
   * @param include - Comma-separated list of relationships to include in the response.
   * @returns The sales offer.
   */
  async getSalesOfferById(id: number, include?: string): Promise<any> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    return this.parasutClient.get<any, any>(`/sales_offers/${id}`, params);
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
    payload: any,
    include?: string
  ): Promise<any> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    return this.parasutClient.put<any, any, any>(
      `/sales_offers/${id}`,
      params,
      payload
    );
  }

  /**
   * Deletes a sales offer by its ID.
   * @param id - The ID of the sales offer to delete.
   * @returns A promise that resolves when the sales offer is deleted.
   */
  async deleteSalesOffer(id: number): Promise<any> {
    return this.parasutClient.delete<any>(`/sales_offers/${id}`);
  }

  /**
   * Requests the PDF generation for a sales offer.
   * The response will contain information about the trackable job.
   * @param id - The ID of the sales offer.
   * @returns Information about the PDF generation job.
   */
  async getSalesOfferPdf(id: number): Promise<any> {
    // The API endpoint is POST for PDF generation, possibly to start an async job.
    // No request body is shown in the image for this specific POST.
    return this.parasutClient.post<any, any, any>(
      `/sales_offers/${id}/pdf`,
      {},
      {} // Assuming empty body if not specified
    );
  }

  /**
   * Archives a sales offer by its ID.
   * @param id - The ID of the sales offer to archive.
   * @returns The archived sales offer.
   */
  async archiveSalesOffer(id: number): Promise<any> {
    // No request body or query params shown in the image for archive.
    return this.parasutClient.patch<any, any>(
      `/sales_offers/${id}/archive`,
      {}
    );
  }

  /**
   * Unarchives a sales offer by its ID.
   * @param id - The ID of the sales offer to unarchive.
   * @returns The unarchived sales offer.
   */
  async unarchiveSalesOffer(id: number): Promise<any> {
    // No request body or query params shown in the image for unarchive.
    return this.parasutClient.patch<any, any>(
      `/sales_offers/${id}/unarchive`,
      {}
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
  async getSalesOfferDetails(id: number, queryParams?: any): Promise<any> {
    const params: any = {};
    if (queryParams) {
      if (queryParams.page && queryParams.page.size) {
        params["page[size]"] = queryParams.page.size;
      }
      if (queryParams.include) {
        params.include = queryParams.include;
      }
    }
    return this.parasutClient.get<any, any>(
      `/sales_offers/${id}/details`,
      params
    );
  }

  /**
   * Updates the status of a sales offer.
   * @param id - The ID of the sales offer.
   * @param attributesPayload - The attributes to update for the sales offer status.
   * @param include - Comma-separated list of relationships to include in the response (part of the request body).
   * @returns The updated sales offer.
   */
  async updateSalesOfferStatus(
    id: number,
    attributesPayload: any,
    include?: string
  ): Promise<any> {
    const body: any = {
      data: {
        id: id.toString(),
        type: "sales_offers",
        attributes: attributesPayload,
      },
    };
    if (include) {
      body.include = include;
    }
    return this.parasutClient.patch<any, any, any>(
      `/sales_offers/${id}/update_status`,
      {}, // No query parameters
      body
    );
  }

  /**
   * Shares a sales offer via email using the generic sharings endpoint.
   * @param sharingPayload - The payload for the sharing request, type "sharing_forms".
   *                         This payload should contain email details and potentially link to the sales offer.
   * @param include - Comma-separated list of relationships to include (e.g., "collaborator,contact,portal_accounts").
   * @returns The response from the sharing operation.
   */
  async shareSalesOfferByEmail(
    sharingPayload: any,
    include?: string
  ): Promise<any> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    // This uses the generic /sharings endpoint.
    // The sharingPayload should be structured as { data: { type: "sharing_forms", attributes: {...}, relationships: {...} } }
    return this.parasutClient.post<any, any, any>(
      "/sharings",
      params,
      sharingPayload
    );
  }
}
