import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../models/User';
import { faker } from '@faker-js/faker';
import { dataSource } from '../../data-source';

export class SeedUsers1589440963993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let fakeUsers = [];
    for (let i = 0; i < 20; i++) {
      const user = {
        name: faker.person.firstName(),
        email: faker.internet.email(),
      };
      fakeUsers.push(user);
    }
    await dataSource.getRepository(User).save(fakeUsers);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
