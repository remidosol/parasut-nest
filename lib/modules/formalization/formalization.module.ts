import { Module } from "@nestjs/common";
import { ParasutFormalizationService } from "./formalization.service";

@Module({
  providers: [ParasutFormalizationService],
  exports: [ParasutFormalizationService],
})
export class ParasutFormalizationModule {}
