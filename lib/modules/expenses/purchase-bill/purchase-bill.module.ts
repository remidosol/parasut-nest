import { Module } from "@nestjs/common";
import { ParasutCoreModule } from "../../../parasut-core.module";
import { ParasutPurchaseBillService } from "./purchase-bill.service";

@Module({
  imports: [ParasutCoreModule],
  providers: [ParasutPurchaseBillService],
  exports: [ParasutPurchaseBillService],
})
export class ParasutPurchaseBillModule {}
