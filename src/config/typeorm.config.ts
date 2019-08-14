import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres', //
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '0077',
  database: 'taskmanagement',
  entities: [__dirname + '../**/*.entity.ts'], //  ../anyFolder/AnyFileEndingWith .entity.ts
  synchronize: true,
}
