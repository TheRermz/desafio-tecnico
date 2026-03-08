import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { Items } from './items.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('order')
export class Order {
  @PrimaryColumn()
  orderId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Items, (item) => item.orderId)
  items: Items[];

  @BeforeInsert()
  generateOrderId() {
    const uuid = uuidv4().replace(/-/g, '').substring(0, 8);
    this.orderId = `v${uuid}-vdb-01`;
  }
}
