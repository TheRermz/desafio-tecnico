import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderRepository } from '../repositories/order.repository';
import { Items } from '../entities/items.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
    @InjectRepository(Items)
    private itemsRepository: Repository<Items>,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    let value = 0;

    const items: Items[] = [];

    for (const itemDto of createOrderDto.items) {
      const product = await this.productRepository.findById(itemDto.productId);

      if (!product)
        throw new NotFoundException(
          `Produto ${itemDto.productId} não encontrado!`,
        );

      const price = Number(product.price) * itemDto.quantity;
      value += price;

      const item = this.itemsRepository.create({
        productId: itemDto.productId,
        quantity: itemDto.quantity,
        price,
      });
      items.push(item);
    }

    const order = this.orderRepository.create({ value, items });
    return this.orderRepository.save(order);
  }

  async findAll() {
    return this.orderRepository.findAll();
  }

  async findAllActive() {
    return this.orderRepository.findAllActive();
  }

  async findOne(orderId: string) {
    return this.orderRepository.findById(orderId);
  }

  async update(orderId: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findById(orderId);

    if (!order)
      throw new NotFoundException(`Pedido ${orderId} não encontrado!`);

    let value = 0;

    const items: Items[] = [];

    for (const itemDto of updateOrderDto.items) {
      const product = await this.productRepository.findById(itemDto.productId);
      if (!product)
        throw new NotFoundException(
          `Produto ${itemDto.productId} não encontrado!`,
        );

      const price = Number(product.price) * itemDto.quantity;

      value += price;

      const item = this.itemsRepository.create({
        orderId,
        productId: itemDto.productId,
        quantity: itemDto.quantity,
        price,
      });
      items.push(item);
    }

    await this.itemsRepository.delete({ orderId });

    order.value = value;
    order.items = items;

    return this.orderRepository.save(order);
  }

  async remove(orderId: string) {
    const order = await this.orderRepository.findById(orderId);
    if (!order)
      throw new NotFoundException(`Pedido ${orderId} não encontrado!`);

    return this.orderRepository.deleteOrder(orderId);
  }
}
