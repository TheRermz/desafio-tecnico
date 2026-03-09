import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/order/create-order.dto';
import { OrderService } from '../services/order.service';
import { UpdateOrderDto } from '../dto/order/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
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
  update(@Param('id') orderId: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(orderId, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') orderId: string) {
    return this.orderService.remove(orderId);
  }
}
