export interface Address {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  complement?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
}

export interface DeliveryInfo {
  deliveredToRecipient: boolean;
  recipientName?: string;
  recipientCpf?: string;
  notes?: string;
}

export interface Order {
  id: string;
  customer: Customer;
  address: Address;
  items: OrderItem[];
  totalValue: number;
  status: 'pending' | 'in_progress' | 'delivered' | 'failed';
  deliveryInfo?: DeliveryInfo;
  estimatedTime?: string;
  orderNumber: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface DeliveryRoute {
  id: string;
  driverId: string;
  driverName: string;
  orders: Order[];
  status: 'not_started' | 'in_progress' | 'completed';
  startTime?: Date;
  endTime?: Date;
  currentOrderIndex: number;
}
