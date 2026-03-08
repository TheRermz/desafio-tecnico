import {
  Entity,
  Column,
  OneToMany,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { Items } from './items.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('product')
export class Product {
  @PrimaryColumn()
  productId: string;

  @Column()
  productName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Items, (item) => item.product)
  items: Items[];

  @BeforeInsert()
  generateProductId() {
    const uuid = uuidv4().replace(/-/g, '').substring(0, 8);
    this.productId = `p${uuid}vdb`;
  }
}
