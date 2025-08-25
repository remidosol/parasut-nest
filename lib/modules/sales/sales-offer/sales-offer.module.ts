import { Module } from "@nestjs/common";
import { ParasutCoreModule } from "../../../parasut-core.module";
import { ParasutSalesOfferService } from "./sales-offer.service";

@Module({
  imports: [ParasutCoreModule],
  providers: [ParasutSalesOfferService],
  exports: [ParasutSalesOfferService],
})
export class ParasutSalesOfferModule {}
