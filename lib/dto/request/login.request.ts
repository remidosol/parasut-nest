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
  grant_type!: GrantType;

  @IsNotEmpty()
  @IsString()
  client_id!: string;

  @IsNotEmpty()
  @IsString()
  client_secret!: string;

  @ValidateIf((o: ParasutAuthDto) => o.grant_type === GrantType.PASSWORD)
  @IsEmail()
  username?: string;

  @ValidateIf((o: ParasutAuthDto) => o.grant_type === GrantType.PASSWORD)
  @IsString()
  password?: string;

  @ValidateIf((o: ParasutAuthDto) => o.grant_type === GrantType.REFRESH_TOKEN)
  @IsString()
  refresh_token?: string;

  @ValidateIf(
    (o: ParasutAuthDto) =>
      o.grant_type === GrantType.AUTHORIZATION_CODE ||
      o.grant_type === GrantType.PASSWORD
  )
  @IsUrl({ require_tld: false })
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
