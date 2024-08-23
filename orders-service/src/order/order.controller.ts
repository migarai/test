import { Controller, Post, Get, Body, Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { KafkaProducerService } from './kafka-producer.service';

@Injectable()
@Controller('order')
export class OrderController {
  @InjectRepository(Order)
  private readonly orderRepository: Repository<Order>;
  private readonly kafkaProducer: KafkaProducerService;
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Post()
  async create(@Body() orderData: { userId: number; productId: number }) {
    const order = await this.orderRepository.save(orderData);

    await this.kafkaProducer.sendMessage('user-data-request', {
      userId: order.userId,
    });
    await this.kafkaProducer.sendMessage('product-data-request', {
      productId: order.productId,
    });

    return order;
  }
}
