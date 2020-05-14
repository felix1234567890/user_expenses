import { Field, InputType } from 'type-graphql';
import { MaxLength, IsEmail, MinLength } from 'class-validator';
import { User } from '../../models/User';

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  @MaxLength(30)
  @MinLength(3)
  name: string;

  @Field()
  @IsEmail()
  email: string;
}
