import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './registration/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './registration/entities/user.entity';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
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
