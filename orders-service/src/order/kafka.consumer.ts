import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';

@Injectable()
export class KafkaConsumer implements OnModuleInit {
  private consumer: Consumer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'order-service',
      brokers: ['localhost:9092'],
    });
    this.consumer = kafka.consumer({ groupId: 'order-group' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topics: ['user-data', 'product-data'] });
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const data = JSON.parse(message.value.toString());
        console.log(`Recieved ${topic} data:`, data);
      },
    });
  }
}
