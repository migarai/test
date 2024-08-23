import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { MessagePattern } from '@nestjs/microservices';
import { KafkaProducer } from './kafka-producer.service';

@Injectable()
export class CreateService {
  constructor(
    @InjectRepository(Product)
    private userRepository: Repository<Product>,
    private kafkaProducer: KafkaProducer,
  ) {}

  addProduct(product: Product): Promise<Product> {
    return this.userRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<Product> {
    return this.userRepository.findOne({ where: { productId: Number(id) } });
  }

  updateProduct(id: string, product: Product): Promise<Product> {
    return this.userRepository.save(product);
  }

  @MessagePattern('product-data-request')
  async handleDataRequest(data: { productId: number }) {
    const result = await this.userRepository.findOne({
      where: { productId: data.productId },
    });

    await this.kafkaProducer.sendMessage('product-data', result);
  }
}
