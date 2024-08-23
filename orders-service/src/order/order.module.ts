import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { Kafka } from 'kafkajs';
import { KafkaConsumer } from './kafka.consumer';
import { KafkaProducerService } from './kafka-producer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderService, KafkaConsumer, KafkaProducerService],
  controllers: [OrderController],
})
export class OrderModule {}
