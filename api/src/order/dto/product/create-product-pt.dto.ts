import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductDtoPt {
  @IsString({ message: 'O Nome do produto deve ser uma string' })
  @IsNotEmpty({ message: 'O nome do produto deve ser preenchido.' })
  nomeProduto: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O preço deve ser um número com duas casas decimais' },
  )
  @IsPositive({ message: 'O valor do produto deve ser posivito.' })
  @IsNotEmpty({ message: 'O valor deve ser preenchido' })
  valorItem: number;
}
