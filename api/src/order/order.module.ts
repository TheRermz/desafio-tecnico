import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Items } from './entities/items.entity';
import { Product } from './entities/product.entity';
import { OrderRepository } from './repositories/order.repository';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { OrderMapperService } from './services/orderMapper.service';
import { ProductMapperService } from './services/productMapper.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Items, Product])],
  controllers: [OrderController, ProductController],
  providers: [
    OrderService,
    ProductService,
    OrderMapperService,
    ProductMapperService,
    OrderRepository,
    ProductRepository,
  ],
})
export class OrderModule { }
