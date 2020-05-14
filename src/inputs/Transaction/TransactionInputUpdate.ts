import { Field, InputType } from 'type-graphql';
import { Transaction } from '../../models/Transaction';
import { Min } from 'class-validator';

@InputType()
export class TransactionInputUpdate implements Partial<Transaction> {
  @Min(3)
  @Field({ nullable: true })
  text?: string;

  @Min(0)
  @Field({ nullable: true })
  amount?: number;
}
