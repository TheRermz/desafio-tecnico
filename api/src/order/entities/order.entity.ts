import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { Item } from './item.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('order')
export class Order {
  @PrimaryColumn()
  orderId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @CreateDateColumn()
  creationDate: Date;

  @OneToMany(() => Item, (item) => item.order)
  items: Item[];

  @BeforeInsert()
  generateOrderId() {
    const uuid = uuidv4().replace(/-/g, '').substring(0, 8);
    this.orderId = `v${uuid}-vdb-01`;
  }
}
