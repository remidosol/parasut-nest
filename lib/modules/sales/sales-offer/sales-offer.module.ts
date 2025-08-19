import { Module } from "@nestjs/common";
import { ParasutSalesOfferService } from "./sales-offer.service";

@Module({
  providers: [ParasutSalesOfferService],
  exports: [ParasutSalesOfferService],
})
export class ParasutSalesOfferModule {}
