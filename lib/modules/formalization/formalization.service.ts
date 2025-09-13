import { Injectable } from "@nestjs/common";
import { ParasutLoggerService } from "../../common/parasut.logger";
import { ParasutHttpClient } from "../../parasut.client";
import {
  CreateEArchiveRequest,
  CreateEInvoiceRequest,
  CreateESmmRequest,
  EInvoiceInboxQueryParams,
} from "./dto/request";
import {
  CreateEArchiveResponse,
  CreateEInvoiceResponse,
  CreateESmmResponse,
  EDocumentPdfResponse,
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
   * @param queryParams - Optional parameters for filtering, sorting, and pagination.
   * @returns A list of e-invoice inboxes.
   */
  async getEInvoiceInboxes(
    queryParams?: EInvoiceInboxQueryParams
  ): Promise<IndexEInvoiceInboxResponse> {
    const params: any = {};

    if (queryParams) {
      // Filter parameters
      if (queryParams.filter) {
        if (queryParams.filter.vkn)
          params["filter[vkn]"] = queryParams.filter.vkn;
      }

      // Pagination
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
  async createEArchive(
    payload: CreateEArchiveRequest
  ): Promise<CreateEArchiveResponse> {
    return this.parasutClient.post<
      CreateEArchiveResponse,
      CreateEArchiveRequest,
      any
    >("/e_archives", {}, payload);
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
  async getEArchivePdf(id: string): Promise<EDocumentPdfResponse> {
    return this.parasutClient.get<EDocumentPdfResponse, any>(
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
  async createEInvoice(
    payload: CreateEInvoiceRequest
  ): Promise<CreateEInvoiceResponse> {
    return this.parasutClient.post<
      CreateEInvoiceResponse,
      CreateEInvoiceRequest,
      any
    >("/e_invoices", {}, payload);
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
  async getEInvoicePdf(id: string): Promise<EDocumentPdfResponse> {
    return this.parasutClient.get<EDocumentPdfResponse, any>(
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
  async createESmm(payload: CreateESmmRequest): Promise<CreateESmmResponse> {
    return this.parasutClient.post<CreateESmmResponse, CreateESmmRequest, any>(
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
  async getESmmPdf(id: string): Promise<EDocumentPdfResponse> {
    return this.parasutClient.get<EDocumentPdfResponse, any>(
      `/e_smms/${id}/pdf`,
      {}
    );
  }
}
