import { Field, InputType, ID } from 'type-graphql';
import { Transaction } from '../../models/Transaction';
import { Min } from 'class-validator';

@InputType()
export class TransactionInput implements Partial<Transaction> {
  @Field()
  @Min(3)
  text: string;

  @Field()
  @Min(0)
  amount: number;

  @Field((type) => ID)
  userId: number;
}
