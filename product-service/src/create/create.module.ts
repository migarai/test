import { Module } from '@nestjs/common';
import { CreateService } from './create.service';
import { CreateController } from './create.controller';
import { Product } from './entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaProducer } from './kafka-producer.service';
import { KafkaConsumerService } from './kafka-consumer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [CreateService, KafkaProducer, KafkaConsumerService],
  controllers: [CreateController],
})
export class CreateModule {}
