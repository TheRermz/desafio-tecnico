import { ReadItemsDtoPt } from '../items/read-items-pt.dto';

export class ReadOrderDtoPt {
  numeroPedido: string;
  valorTotal: number;
  dataCriacao: Date;
  items: ReadItemsDtoPt[];
}
