import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) { }

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll() {
    return this.productRepository.findAll();
  }

  async findAllActive() {
    return this.productRepository.findAllActive();
  }

  async findOne(productId: string) {
    return this.productRepository.findById(productId);
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findById(productId);

    if (!product)
      throw new NotFoundException(`Produto ${productId} não encontrado!`);

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(productId: string) {
    const product = await this.productRepository.findById(productId);

    if (!product)
      throw new NotFoundException(`Produto ${productId} não encontrado!`);

    return this.productRepository.deleteProduct(productId);
  }
}
