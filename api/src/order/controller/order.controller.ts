import { HttpCode, UseGuards } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body, Controller, Header } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderDTO } from '../schema/create-order.dto';
import { Order } from '../schema/order.schema';
import { OrderService } from '../service/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createOrderDto: CreateOrderDTO): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }
}
