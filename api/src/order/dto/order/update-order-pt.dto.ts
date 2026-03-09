import { IsNotEmpty } from 'class-validator';
import { CreateItemsDtoPt } from '../items/create-items-pt.dto';

export class UpdateOrderDtoPt {
  @IsNotEmpty({ message: 'Os items do pedido não podem estar vazio.' })
  items: CreateItemsDtoPt[];
}
