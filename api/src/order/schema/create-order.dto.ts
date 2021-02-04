export interface CreateOrderDTO {
  managerID: string;
  executorID: string;
  status?: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  ARCHIVE = 'archive',
}
