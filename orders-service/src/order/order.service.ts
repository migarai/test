import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private OrderRepository: Repository<Order>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.OrderRepository.find();
  }

  create(Order: Order): Promise<Order> {
    return this.OrderRepository.save(Order);
  }
}
