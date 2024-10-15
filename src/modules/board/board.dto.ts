import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  seq: number;
}

export class UpdateBoardDto {
  @IsOptional()
  @IsString()
  title?: string;
}
