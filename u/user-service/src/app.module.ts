import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from './registration/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './registration/entities/user.entity';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'user-consumer',
          },
        },
      },
    ]),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'users.sqlite',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    LoginModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
