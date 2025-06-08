import { Module } from "@nestjs/common";
import { ParasutTagService } from "./tag.service";

@Module({
  providers: [ParasutTagService],
  exports: [ParasutTagService],
})
export class ParasutTagModule {}
