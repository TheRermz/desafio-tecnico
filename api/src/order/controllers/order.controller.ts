import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOrderDtoPt } from '../dto/order/create-order-pt.dto';
import { OrderService } from '../services/order.service';
import { UpdateOrderDtoPt } from '../dto/order/update-order-pt.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Body() createOrderDtoPt: CreateOrderDtoPt) {
    return this.orderService.create(createOrderDtoPt);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('/active')
  findAllActive() {
    return this.orderService.findAllActive();
  }

  @Get(':id')
  findOne(@Param('id') orderId: string) {
    return this.orderService.findOne(orderId);
  }

  @Patch(':id')
  update(
    @Param('id') orderId: string,
    @Body() updateOrderDtoPt: UpdateOrderDtoPt,
  ) {
    return this.orderService.update(orderId, updateOrderDtoPt);
  }

  @Delete(':id')
  remove(@Param('id') orderId: string) {
    return this.orderService.remove(orderId);
  }
}
