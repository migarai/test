import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './create/entities/products.entity';
import { CreateModule } from './create/create.module';

@Module({
  imports: [
    CreateModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'users.sqlite',
      entities: [Product],
      synchronize: true,
    }),
    CreateModule,
  ],
})
export class AppModule {}
