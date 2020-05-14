import { Field, InputType } from 'type-graphql';
import { MaxLength, IsEmail } from 'class-validator';
import { User } from '../../models/User';

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field({ nullable: true })
  @MaxLength(30)
  name: string;

  @Field({ nullable: true })
  @IsEmail()
  email: string;
}
