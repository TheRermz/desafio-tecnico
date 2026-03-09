import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateItemsDtoPt } from '../items/update-items-pt.dto';

export class UpdateOrderDtoPt {
  @IsNotEmpty({ message: 'Os items do pedido não podem estar vazio.' })
  @ValidateNested({ each: true })
  @Type(() => UpdateItemsDtoPt)
  items: UpdateItemsDtoPt[];
}
