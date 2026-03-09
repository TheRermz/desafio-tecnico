import { Injectable } from '@nestjs/common';
import { OrderInputEn, OrderInputPt } from '../Interfaces/orderInput.interface';

@Injectable()
export class OrderMapperService {
  ptToEn(orderPt: OrderInputPt): OrderInputEn {
    return {
      orderId: orderPt.numeroPedido,
      value: orderPt.valorTotal,
      createdAt: orderPt.dataCriacao,
      isActive: orderPt.estaAtivo,
      items: orderPt.items.map((item) => ({
        productId: item.idItem,
        quantity: item.quantidadeItem,
        price: item.valorItem,
      })),
    };
  }
}
