import { Injectable } from "@nestjs/common";
import { ParasutLoggerService } from "../../common/parasut.logger";
import { ParasutHttpClient } from "../../parasut.client";
import {
  CreateEArchiveResponse,
  CreateEInvoiceResponse,
  CreateESmmResponse,
  EArchivePdfResponse,
  EInvoicePdfResponse,
  ESmmPdfResponse,
  GetEArchiveResponse,
  GetEInvoiceResponse,
  GetESmmResponse,
  IndexEInvoiceInboxResponse,
} from "./dto/response/response.dto";

@Injectable()
export class ParasutFormalizationService {
  constructor(
    private readonly parasutClient: ParasutHttpClient,
    private readonly logger: ParasutLoggerService
  ) {
    logger.setContext(ParasutFormalizationService.name);
  }

  // --- E-Invoice Inboxes ---

  /**
   * Retrieves a list of e-invoice inboxes.
   * @param queryParams - Optional parameters for filtering and pagination.
   *   - filter: { vkn?: string }
   *   - page: { number?: number, size?: number }
   * @returns A list of e-invoice inboxes.
   */
  async getEInvoiceInboxes(
    queryParams?: any
  ): Promise<IndexEInvoiceInboxResponse> {
    const params: any = {};
    if (queryParams) {
      if (queryParams.filter) {
        if (queryParams.filter.vkn)
          params["filter[vkn]"] = queryParams.filter.vkn;
      }
      if (queryParams.page) {
        if (queryParams.page.number)
          params["page[number]"] = queryParams.page.number;
        if (queryParams.page.size) params["page[size]"] = queryParams.page.size;
      }
    }
    return this.parasutClient.get<IndexEInvoiceInboxResponse, any>(
      "/e_invoice_inboxes",
      params
    );
  }

  // --- E-Archives ---

  /**
   * Creates a new e-archive.
   * @param payload - The e-archive data.
   * @returns The created e-archive.
   */
  async createEArchive(payload: any): Promise<CreateEArchiveResponse> {
    // Note: The 'include' parameter is not specified in the image for create.
    // If it were available, it would be added like other services.
    return this.parasutClient.post<CreateEArchiveResponse, any, any>(
      "/e_archives",
      {},
      payload
    );
  }

  /**
   * Retrieves a specific e-archive by its ID.
   * @param id - The ID of the e-archive.
   * @param include - Comma-separated list of relationships to include (e.g., "sales_invoice").
   * @returns The e-archive.
   */
  async getEArchiveById(
    id: string,
    include?: string
  ): Promise<GetEArchiveResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    return this.parasutClient.get<GetEArchiveResponse, any>(
      `/e_archives/${id}`,
      params
    );
  }

  /**
   * Retrieves the PDF of a specific e-archive by its ID.
   * @param id - The ID of the e-archive.
   * @returns The e-archive PDF data.
   */
  async getEArchivePdf(id: string): Promise<EArchivePdfResponse> {
    return this.parasutClient.get<EArchivePdfResponse, any>(
      `/e_archives/${id}/pdf`,
      {}
    );
  }

  // --- E-Invoices ---

  /**
   * Creates a new e-invoice.
   * @param payload - The e-invoice data.
   * @returns The created e-invoice.
   */
  async createEInvoice(payload: any): Promise<CreateEInvoiceResponse> {
    // Note: The 'include' parameter is not specified in the image for create.
    return this.parasutClient.post<CreateEInvoiceResponse, any, any>(
      "/e_invoices",
      {},
      payload
    );
  }

  /**
   * Retrieves a specific e-invoice by its ID.
   * @param id - The ID of the e-invoice.
   * @param include - Comma-separated list of relationships to include (e.g., "invoice").
   * @returns The e-invoice.
   */
  async getEInvoiceById(
    id: string,
    include?: string
  ): Promise<GetEInvoiceResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    return this.parasutClient.get<GetEInvoiceResponse, any>(
      `/e_invoices/${id}`,
      params
    );
  }

  /**
   * Retrieves the PDF of a specific e-invoice by its ID.
   * @param id - The ID of the e-invoice.
   * @returns The e-invoice PDF data.
   */
  async getEInvoicePdf(id: string): Promise<EInvoicePdfResponse> {
    return this.parasutClient.get<EInvoicePdfResponse, any>(
      `/e_invoices/${id}/pdf`,
      {}
    );
  }

  // --- E-SMMs (Freelance Receipts) ---

  /**
   * Creates a new e-SMM (Freelance Receipt).
   * @param payload - The e-SMM data.
   * @returns The created e-SMM.
   */
  async createESmm(payload: any): Promise<CreateESmmResponse> {
    // Note: The 'include' parameter is not specified in the image for create.
    return this.parasutClient.post<CreateESmmResponse, any, any>(
      "/e_smms",
      {},
      payload
    );
  }

  /**
   * Retrieves a specific e-SMM (Freelance Receipt) by its ID.
   * @param id - The ID of the e-SMM.
   * @param include - Comma-separated list of relationships to include (e.g., "sales_invoice").
   * @returns The e-SMM.
   */
  async getESmmById(id: string, include?: string): Promise<GetESmmResponse> {
    const params: { include?: string } = {};
    if (include) params.include = include;
    return this.parasutClient.get<GetESmmResponse, any>(
      `/e_smms/${id}`,
      params
    );
  }

  /**
   * Retrieves the PDF of a specific e-SMM (Freelance Receipt) by its ID.
   * @param id - The ID of the e-SMM.
   * @returns The e-SMM PDF data.
   */
  async getESmmPdf(id: string): Promise<ESmmPdfResponse> {
    return this.parasutClient.get<ESmmPdfResponse, any>(
      `/e_smms/${id}/pdf`,
      {}
    );
  }
}
