import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderRepository } from '../repositories/order.repository';
import { Items } from '../entities/items.entity';
import { ProductRepository } from '../repositories/product.repository';
import { CreateOrderDtoPt } from '../dto/order/create-order-pt.dto';
import { UpdateOrderDtoPt } from '../dto/order/update-order-pt.dto';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
    @InjectRepository(Items)
    private itemsRepository: Repository<Items>,
  ) { }

  async create(createOrderDtoPt: CreateOrderDtoPt) {
    let value = 0;

    const items: Items[] = [];

    for (const itemDto of createOrderDtoPt.items) {
      const product = await this.productRepository.findById(itemDto.idItem);

      if (!product)
        throw new NotFoundException(
          `Produto ${itemDto.idItem} não encontrado!`,
        );

      const price = Number(product.price) * itemDto.quantidadeItem;
      value += price;

      const item = this.itemsRepository.create({
        productId: itemDto.idItem,
        quantity: itemDto.quantidadeItem,
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

  async update(orderId: string, updateOrderDtoPt: UpdateOrderDtoPt) {
    const order = await this.orderRepository.findById(orderId);

    if (!order)
      throw new NotFoundException(`Pedido ${orderId} não encontrado!`);

    let value = 0;

    const items: Items[] = [];

    for (const itemDto of updateOrderDtoPt.items) {
      const product = await this.productRepository.findById(itemDto.idItem);
      if (!product)
        throw new NotFoundException(
          `Produto ${itemDto.idItem} não encontrado!`,
        );

      const price = Number(product.price) * itemDto.quantidadeItem;

      value += price;

      const item = this.itemsRepository.create({
        orderId,
        productId: itemDto.idItem,
        quantity: itemDto.quantidadeItem,
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
