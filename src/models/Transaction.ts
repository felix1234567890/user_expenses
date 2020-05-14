import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID, Float, registerEnumType } from 'type-graphql';
import { User } from './User';

export enum ExpenseScale {
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
}
registerEnumType(ExpenseScale, {
  name: 'ExpenseScale',
  description: 'Scale of an expense',
});
@Entity({ name: 'transactions' })
@ObjectType()
export class Transaction extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field(() => String)
  @Column()
  text: string;

  @Field(() => Float)
  @Column('float')
  amount: number;

  @Field(() => User, { nullable: true })
  @ManyToOne((type) => User, (user) => user.transactions)
  user: User;

  @Field()
  @Column({ type: 'datetime', default: () => 'NOW()' })
  transactionDate: Date;

  @Field((type) => ExpenseScale)
  expenseScale: ExpenseScale;
}
