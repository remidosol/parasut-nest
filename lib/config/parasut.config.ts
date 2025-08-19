import { plainToInstance } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from "class-validator";
import { ParasutEnvironment } from "../parasut.enum";

export class ParasutConfig {
  parasutBaseUrl: string = "https://api.parasut.com/v4/";

  @IsNotEmpty({ message: "Merchant ID is required" })
  @IsString()
  parasutClientId!: string;

  @IsNotEmpty({ message: "Private Key is required" })
  @IsString()
  parasutSecret!: string;

  @IsNotEmpty({ message: "Redirect URI is required" })
  @IsString()
  redirectUri!: string;

  @IsNotEmpty({ message: "Company id is required" })
  @IsString()
  parasutCompanyId!: string;

  @IsNotEmpty({ message: "Email is required" })
  @IsEmail()
  parasutEmail!: string;

  @IsNotEmpty({ message: "Password is required" })
  @IsString()
  parasutPassword!: string;

  @IsString()
  @IsEnum(ParasutEnvironment)
  parasutEnv!: ParasutEnvironment;

  @IsNumber()
  @IsOptional()
  timeout?: number;

  constructor(envs: {
    parasutClientId: string;
    parasutSecret: string;
    redirectUri: string;
    parasutCompanyId: string;
    parasutEmail: string;
    parasutPassword: string;
    parasutEnv: ParasutEnvironment;
    timeout?: number;
  }) {
    validateEnvs(envs);

    this.parasutClientId = envs.parasutClientId;
    this.parasutSecret = envs.parasutSecret;
    this.redirectUri = envs.redirectUri;
    this.parasutCompanyId = envs.parasutCompanyId;
    this.parasutEmail = envs.parasutEmail;
    this.parasutPassword = envs.parasutPassword;
    this.parasutEnv = envs.parasutEnv;
    this.timeout = envs.timeout;
  }
}

export function validateEnvs(envs: Record<string, unknown>) {
  const validatedConfig = plainToInstance(ParasutConfig, envs, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: true,
    skipUndefinedProperties: true,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
