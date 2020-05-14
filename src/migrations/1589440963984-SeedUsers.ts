import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import faker from 'faker';
import { User } from '../models/User';

export class SeedUsers1589440963993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let fakeUsers = [];
    for (let i = 0; i < 20; i++) {
      const user = {
        id: faker.random.number(),
        name: faker.name.firstName(),
        email: faker.internet.email(),
      };
      fakeUsers.push(user);
    }
    await getRepository(User).save(fakeUsers);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
