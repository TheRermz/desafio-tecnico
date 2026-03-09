import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateItemsDtoPt } from '../items/create-items-pt.dto';
import { Type } from 'class-transformer';

export class CreateOrderDtoPt {
  @IsNotEmpty({ message: 'Os items do pedido não podem estar vazio.' })
  @ValidateNested({ each: true })
  @Type(() => CreateItemsDtoPt)
  items: CreateItemsDtoPt[];
}
