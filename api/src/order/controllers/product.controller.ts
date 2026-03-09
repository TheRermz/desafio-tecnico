import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDtoPt } from '../dto/product/create-product-pt.dto';
import { UpdateProductDtoPt } from '../dto/product/update-product-pt.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDtoPt) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('/active')
  findAllActive() {
    return this.productService.findAllActive();
  }

  @Get(':id')
  findOne(@Param('id') productId: string) {
    return this.productService.findOne(productId);
  }

  @Patch(':id')
  update(
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDtoPt,
  ) {
    return this.productService.update(productId, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') productId: string) {
    return this.productService.remove(productId);
  }
}
