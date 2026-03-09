import { Items } from '../entities/items.entity';

export interface OrderInputPt {
  numeroPedido: string;
  valorTotal: number;
  dataCriacao: Date;
  estaAtivo: boolean;
  items: Array<{
    idItem: string;
    quantidadeItem: number;
    valorItem: number;
  }>;
}

export interface OrderInputEn {
  orderId: string;
  value: number;
  createdAt: Date;
  isActive: boolean;
  items: Array<Items>;
}
