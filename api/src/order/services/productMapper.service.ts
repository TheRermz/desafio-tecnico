import { Injectable } from '@nestjs/common';
import {
  ProductInputEn,
  ProductInputPt,
} from '../Interfaces/productInput.interface';

@Injectable()
export class ProductMapperService {
  ptToEn(productPt: ProductInputPt): ProductInputEn {
    return {
      productName: productPt.nomeProduto,
      price: productPt.valorItem,
    };
  }
}
