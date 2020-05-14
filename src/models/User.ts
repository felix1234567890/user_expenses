import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from 'type-graphql';
import { Transaction } from './Transaction';

@Entity({ name: 'users' })
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => [Transaction], { nullable: true })
  @OneToMany((type) => Transaction, (transaction) => transaction.user, {
    cascade: true,
    eager: true,
  })
  transactions?: Transaction[];

  @Field((type) => Int)
  totalTransactions: number;
}
