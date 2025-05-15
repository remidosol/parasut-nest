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
// import { ParasutApiConfigurationException } from "../common/exceptions";

export class ParasutConfig {
  PARASUT_BASE_URL: string = "https://api.parasut.com/v4/";

  @IsNotEmpty({ message: "Merchant ID is required" })
  @IsString()
  PARASUT_CLIENT_ID!: string;

  @IsNotEmpty({ message: "Private Key is required" })
  @IsString()
  PARASUT_SECRET!: string;

  @IsNotEmpty({ message: "Company id is required" })
  @IsString()
  PARASUT_COMPANY_ID!: string;

  @IsNotEmpty({ message: "Email is required" })
  @IsEmail()
  PARASUT_EMAIL!: string;

  @IsNotEmpty({ message: "Password is required" })
  @IsString()
  PARASUT_PASSWORD!: string;

  @IsString()
  @IsEnum(ParasutEnvironment)
  PARASUT_ENV!: ParasutEnvironment;

  @IsNumber()
  @IsOptional()
  timeout?: number;

  constructor(envs: {
    PARASUT_CLIENT_ID: string;
    PARASUT_SECRET: string;
    PARASUT_COMPANY_ID: string;
    PARASUT_EMAIL: string;
    PARASUT_PASSWORD: string;
    PARASUT_ENV: ParasutEnvironment;
    timeout?: number;
  }) {
    validateEnvs(envs);

    this.PARASUT_CLIENT_ID = envs.PARASUT_CLIENT_ID;
    this.PARASUT_SECRET = envs.PARASUT_SECRET;
    this.PARASUT_COMPANY_ID = envs.PARASUT_COMPANY_ID;
    this.PARASUT_EMAIL = envs.PARASUT_EMAIL;
    this.PARASUT_PASSWORD = envs.PARASUT_PASSWORD;
    this.PARASUT_ENV = envs.PARASUT_ENV;
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
