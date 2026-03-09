import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Items } from './entities/items.entity';
import { Product } from './entities/product.entity';
import { OrderRepository } from './repositories/order.repository';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './services/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Items, Product])],
  controllers: [OrderController],
  providers: [OrderService, ProductService, OrderRepository, ProductRepository],
})
export class OrderModule { }
