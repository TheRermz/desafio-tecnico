import { CreateItemsDto } from './create-items.dto';

export class CreateOrderDto {
  items: CreateItemsDto[];
}
