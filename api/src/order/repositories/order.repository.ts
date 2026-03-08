import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async findAllActive(): Promise<Order[]> {
    return this.find({
      where: { isActive: true },
      relations: ['items'],
    });
  }

  async findById(orderId: string): Promise<Order | null> {
    return this.findOne({
      where: { orderId },
      relations: ['items'],
    });
  }

  async deleteOrder(orderId: string): Promise<void> {
    await this.update(orderId, { isActive: false });
  }
}
