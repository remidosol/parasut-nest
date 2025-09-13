export type SalesOfferPdfResponse = {
  data: {
    id: string;
    type: "trackable_jobs";
    attributes: {
      id: string;
      type: "sales_offers_pdfs";
      attributes: {
        url: string;
        created_at: string; // ISO 8601
        status: string;
        errors: string[];
        result: string;
        statistics: string;
      };
      relationships: null;
    };
    links: {
      self: string;
    };
    meta: {
      current_page: number;
      total_pages: number;
      total_count: number;
    };
  };
};
