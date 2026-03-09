import { IsNotEmpty } from 'class-validator';
import { CreateItemsDto } from './create-items.dto';

export class UpdateOrderDto {
  @IsNotEmpty({ message: 'Os items do pedido não podem estar vazio.' })
  items: CreateItemsDto[];
}
