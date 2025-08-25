import { Module } from "@nestjs/common";
import { ParasutCoreModule } from "../../parasut-core.module";
import { ParasutFormalizationService } from "./formalization.service";

@Module({
  imports: [ParasutCoreModule],
  providers: [ParasutFormalizationService],
  exports: [ParasutFormalizationService],
})
export class ParasutFormalizationModule {}
