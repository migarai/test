import { Controller } from '@nestjs/common';
import { CreateService } from './create.service';
import { Post, Body, Get } from '@nestjs/common';
import { Product } from './entities/products.entity';

@Controller('create')
export class CreateController {
  constructor(private readonly createService: CreateService) {}

  @Post()
  async create(@Body() productData: Product): Promise<Product> {
    return this.createService.addProduct(productData);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.createService.findAll();
  }

  @Get(':id')
  async findOne(id: string): Promise<Product> {
    return this.createService.findOne(id);
  }
}
