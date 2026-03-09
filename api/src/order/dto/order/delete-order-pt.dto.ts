import { IsNotEmpty } from 'class-validator';

export class DeleteOrderDtoPt {
  @IsNotEmpty({ message: 'O campo não pode estar vazio.' })
  estaAtivo: boolean;
}
