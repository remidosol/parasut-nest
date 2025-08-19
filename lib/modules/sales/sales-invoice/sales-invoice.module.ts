import { Module } from "@nestjs/common";
import { ParasutSalesInvoiceService } from "./sales-invoice.service";

@Module({
  providers: [ParasutSalesInvoiceService],
  exports: [ParasutSalesInvoiceService],
})
export class ParasutSalesInvoiceModule {}
