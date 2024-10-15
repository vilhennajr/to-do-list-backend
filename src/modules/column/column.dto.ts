import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  seq: number;
}

export class UpdateColumnDto {
  @IsOptional()
  @IsString()
  title?: string;
}
