import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateItemsDto {
  @IsString({ message: 'O id do produto deve ser uma string' })
  @IsNotEmpty({ message: 'O id do produto não deve ser nulo' })
  productId: string;

  @IsNumber({}, { message: 'A quantidade deve ser um número' })
  @IsPositive({ message: 'A quantidade deve ser positiva' })
  @IsNotEmpty({ message: 'A quantidade não pode ser nula' })
  quantity: number;
}
