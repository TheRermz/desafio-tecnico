import { IsNotEmpty } from 'class-validator';

export class DeleteProductDto {
  @IsNotEmpty({ message: 'O campo não pode estar vazio.' })
  isActive: boolean;
}
