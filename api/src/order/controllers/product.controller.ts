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
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
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
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(productId, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') productId: string) {
    return this.productService.remove(productId);
  }
}
