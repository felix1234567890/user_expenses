import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from 'type-graphql';
import { Transaction } from '../models/Transaction';
import { TransactionInput } from '../inputs/Transaction/TransactionInput';
import { TransactionInputUpdate } from '../inputs/Transaction/TransactionInputUpdate';
import { User } from '../models/User';
import { ExpenseScale } from '../models/Transaction';

@Resolver(() => Transaction)
export class TransactionResolver {
  @Query(() => [Transaction])
  transactions() {
    return Transaction.find({ relations: ['user'] });
  }
  @Query(() => Transaction)
  transaction(@Arg('transactionId') transactionId: number) {
    return Transaction.findOne({
      where: { id: transactionId },
      relations: ['user'],
    });
  }
  @Mutation(() => Transaction)
  async createTransaction(
    @Arg('transactionData') transactionData: TransactionInput
  ) {
    try {
      const user = await User.findOneOrFail({ id: transactionData.userId });
      if (!user) throw new Error('No user for this Id');

      const transaction = Transaction.create({
        text: transactionData.text,
        amount: transactionData.amount,
        user,
      });

      await transaction.save();
      return transaction;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Mutation(() => Transaction)
  async updateTransaction(
    @Arg('transactionId') id: number,
    @Arg('transactionData') data: TransactionInputUpdate
  ) {
    let transaction = await Transaction.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!transaction) throw new Error("Transaction doesn't exist");
    Object.assign(transaction, data);

    await transaction.save();
    return transaction;
  }
  @Mutation(() => Boolean)
  async deleteTransaction(@Arg('transactionId') id: number) {
    const transaction = await Transaction.findOne({ where: { id } });
    if (!transaction) throw new Error("Transaction doesn't exist");

    await transaction.remove();
    return true;
  }
  @FieldResolver()
  expenseScale(@Root() transaction: Transaction) {
    const { amount } = transaction;

    if (amount < 50) {
      return ExpenseScale.LOW;
    } else if (amount < 500) return ExpenseScale.MODERATE;
    else return ExpenseScale.HIGH;
  }
}
