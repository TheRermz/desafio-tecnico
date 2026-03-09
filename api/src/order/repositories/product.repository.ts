import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async findAll(): Promise<Product[]> {
    return this.find();
  }

  async findAllActive(): Promise<Product[]> {
    return this.find({
      where: { isActive: true },
    });
  }

  async findById(productId: string): Promise<Product | null> {
    return this.findOne({
      where: { productId },
    });
  }

  async deleteProduct(productId: string): Promise<void> {
    await this.update(productId, { isActive: false });
  }
}
