import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDtoPt } from '../dto/product/create-product-pt.dto';
import { UpdateProductDtoPt } from '../dto/product/update-product-pt.dto';
import { ProductMapperService } from './productMapper.service';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private productMapper: ProductMapperService,
  ) { }

  async create(createProductDtoPt: CreateProductDtoPt) {
    const mapped = this.productMapper.ptToEn(createProductDtoPt);
    const product = this.productRepository.create(mapped);
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

  async update(productId: string, updateProductDtoPt: UpdateProductDtoPt) {
    const mapped = this.productMapper.ptToEn(updateProductDtoPt);
    const product = await this.productRepository.findById(productId);

    if (!product)
      throw new NotFoundException(`Produto ${productId} não encontrado!`);

    Object.assign(product, mapped);
    return this.productRepository.save(product);
  }

  async remove(productId: string) {
    const product = await this.productRepository.findById(productId);

    if (!product)
      throw new NotFoundException(`Produto ${productId} não encontrado!`);

    return this.productRepository.deleteProduct(productId);
  }
}
