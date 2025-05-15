import { Module } from "@nestjs/common";
import { ParasutPurchaseBillService } from "./purchase-bill.service";

@Module({
  providers: [ParasutPurchaseBillService],
  exports: [ParasutPurchaseBillService],
})
export class ParasutPurchaseBillModule {}
