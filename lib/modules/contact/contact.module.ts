import { Module } from "@nestjs/common";
import { ParasutContactService } from "./contact.service";

@Module({
  providers: [ParasutContactService],
  exports: [ParasutContactService],
})
export class ParasutContactModule {}
