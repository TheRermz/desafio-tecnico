import { IsNotEmpty } from 'class-validator';

export class DeleteProductDtoPt {
  @IsNotEmpty({ message: 'O campo não pode estar vazio.' })
  estaAtivo: boolean;
}
