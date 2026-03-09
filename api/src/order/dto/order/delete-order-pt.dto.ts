import { IsNotEmpty } from 'class-validator';

export class DeleteOrderDto {
  @IsNotEmpty({ message: 'O campo não pode estar vazio.' })
  isActive: boolean;
}
