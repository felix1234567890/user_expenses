import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from 'type-graphql';
import { User } from '../models/User';
import { CreateUserInput } from '../inputs/user/CreateUserInput';
import { UpdateUserInput } from '../inputs/user/UpdateUserInput';

@Resolver((of) => User)
export class UserResolver {
  @Query(() => [User])
  async users() {
    return await User.find();
  }
  @Query(() => User)
  user(@Arg('userId') id: number) {
    return User.findOne({ where: { id } });
  }
  @Mutation(() => User)
  async createUser(@Arg('userData') data: CreateUserInput) {
    const user = User.create<User>(data);
    await user.save();

    return user;
  }
  @Mutation(() => User)
  async updateUser(
    @Arg('userId') id: number,
    @Arg('UserData') data: UpdateUserInput
  ) {
    let user = await User.findOne({ where: { id } });
    if (!user) throw new Error("User doesn't exist");

    Object.assign(user, data);
    await user.save();
    return user;
  }
  @Mutation(() => Boolean)
  async deleteUser(@Arg('userId') id: number) {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error("Transaction doesn't exist");

    await user.remove();
    return true;
  }
  @FieldResolver()
  totalTransactions(@Root() user: User) {
    const { transactions } = user;
    return transactions?.length ? transactions.length : 0;
  }
}
