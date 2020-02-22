export interface Invoice{
  discount: number;
  total: number;
  id: string;
  customerId?: string;
  createdById?: string;
  createdAt?: string;
  updatedAt?: string;
}