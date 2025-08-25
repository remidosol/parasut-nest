import { Module } from "@nestjs/common";
import { ParasutCoreModule } from "../../../parasut-core.module";
import { ParasutSalesInvoiceService } from "./sales-invoice.service";

@Module({
  imports: [ParasutCoreModule],
  providers: [ParasutSalesInvoiceService],
  exports: [ParasutSalesInvoiceService],
})
export class ParasutSalesInvoiceModule {}
