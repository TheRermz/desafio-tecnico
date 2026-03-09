import { ReadItemsDto } from '../items/read-items.dto';

export class ReadOrderDto {
  orderId: string;
  value: number;
  createdAt: Date;
  items: ReadItemsDto[];
}
