import { Module } from "@nestjs/common";
import { ParasutCategoryService } from "./category.service";

@Module({
  providers: [ParasutCategoryService],
  exports: [ParasutCategoryService],
})
export class ParasutCategoryModule {}
