import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';

@Injectable()
export class CreateService {
  constructor(
    @InjectRepository(Product)
    private userRepository: Repository<Product>,
  ) {}

  addProduct(product: Product): Promise<Product> {
    return this.userRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<Product> {
    return this.userRepository.findOne({ where: { id: Number(id) } });
  }

  updateProduct(id: string, product: Product): Promise<Product> {
    return this.userRepository.save(product);
  }
}
