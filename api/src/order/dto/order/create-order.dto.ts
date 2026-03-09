import { IsNotEmpty } from 'class-validator';
import { CreateItemsDto } from '../items/create-items.dto';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'Os items do pedido não podem estar vazio.' })
  items: CreateItemsDto[];
}
