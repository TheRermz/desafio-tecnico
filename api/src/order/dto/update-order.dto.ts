import { CreateItemsDto } from './create-items.dto';

export class UpdateOrderDto {
  items: CreateItemsDto[];
}
