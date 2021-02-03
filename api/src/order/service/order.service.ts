import { HttpStatus } from '@nestjs/common';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDTO } from '../schema/create-order.dto';
import { Order, OrderDocument } from '../schema/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}
  async listOrdersByUser(userId: string) {
    const orders = await this.orderModel.find({ owner: userId });

    if (!orders) {
      throw new HttpException('No Orders Found', HttpStatus.NO_CONTENT);
    }
    return orders;
  }

  async createOrder(orderDTO: CreateOrderDTO) {
    const createOrder = {
      managerID: orderDTO.managerID,
      executorID: orderDTO.executorID,
      status: orderDTO.status,
    };
    const { _id } = await this.orderModel.create(createOrder);

    const order = await this.orderModel
      .findById(_id)
      .populate('managerID', '__id manager name')
      .populate('executorID', '__id manager name');

    return order;
  }
}
