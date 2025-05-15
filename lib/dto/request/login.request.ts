import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateIf,
} from "class-validator";
import { GrantType } from "../../parasut.enum";

export class ParasutAuthDto {
  @IsNotEmpty()
  @IsEnum(GrantType)
  @ApiProperty({ example: GrantType.PASSWORD })
  grant_type!: GrantType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "your-client-id" })
  client_id!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "your-client-secret" })
  client_secret!: string;

  @ValidateIf((o: ParasutAuthDto) => o.grant_type === GrantType.PASSWORD)
  @IsEmail()
  @ApiProperty({ example: "john@doe.com" })
  username?: string;

  @ValidateIf((o: ParasutAuthDto) => o.grant_type === GrantType.PASSWORD)
  @IsString()
  @ApiProperty({ example: "p4ssw0rd" })
  password?: string;

  @ValidateIf((o: ParasutAuthDto) => o.grant_type === GrantType.REFRESH_TOKEN)
  @IsString()
  @ApiProperty({ example: "asdasdadddsaas" })
  refresh_token?: string;

  @ValidateIf(
    (o: ParasutAuthDto) =>
      o.grant_type === GrantType.AUTHORIZATION_CODE ||
      o.grant_type === GrantType.PASSWORD
  )
  @IsUrl({ require_tld: false })
  @ApiProperty({ example: "urn:ietf:wg:oauth:2.0:oob" })
  redirect_uri?: string;

  constructor(dto?: ParasutAuthDto) {
    if (dto) {
      this.grant_type = dto.grant_type;
      this.client_id = dto.client_id;
      this.client_secret = dto.client_secret;
      this.username = dto.username;
      this.password = dto.password;
      this.refresh_token = dto.refresh_token;
      this.redirect_uri = dto.redirect_uri;
    }
  }
}
