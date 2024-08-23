import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { CreateService } from './create.service';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private consumer: Consumer;

  constructor(private productService: CreateService) {
    const kafka = new Kafka({
      clientId: 'product-service',
      brokers: ['localhost:9092'],
    });
    this.consumer = kafka.consumer({ groupId: 'product-group' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'product-data-request' });
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const data = JSON.parse(message.value.toString());
        await this.productService.handleDataRequest(data);
      },
    });
  }
}
