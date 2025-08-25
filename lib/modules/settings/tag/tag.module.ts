import { Module } from "@nestjs/common";
import { ParasutCoreModule } from "../../../parasut-core.module";
import { ParasutTagService } from "./tag.service";

@Module({
  imports: [ParasutCoreModule],
  providers: [ParasutTagService],
  exports: [ParasutTagService],
})
export class ParasutTagModule {}
