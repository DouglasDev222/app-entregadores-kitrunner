import { faker } from '@faker-js/faker/locale/pt_BR';
import { DeliveryRoute, Order, OrderItem, Customer, Address } from '../types/delivery';

const generateMockAddress = (): Address => ({
  street: faker.location.streetAddress(),
  number: faker.number.int({ min: 1, max: 9999 }).toString(),
  neighborhood: faker.location.county(),
  city: faker.location.city(),
  zipCode: faker.location.zipCode('########'),
  complement: faker.datatype.boolean() ? faker.location.secondaryAddress() : undefined,
  coordinates: {
    lat: faker.location.latitude({ min: -23.7, max: -23.4 }),
    lng: faker.location.longitude({ min: -46.8, max: -46.3 })
  }
});

const generateMockCustomer = (): Customer => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  phone: faker.phone.number('(##) #####-####')
});

const generateMockOrderItems = (): OrderItem[] => {
  const itemCount = faker.number.int({ min: 1, max: 5 });
  return Array.from({ length: itemCount }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    quantity: faker.number.int({ min: 1, max: 3 }),
    price: parseFloat(faker.commerce.price({ min: 10, max: 150, dec: 2 }))
  }));
};

const generateMockOrder = (orderNumber: number): Order => {
  const items = generateMockOrderItems();
  const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return {
    id: faker.string.uuid(),
    customer: generateMockCustomer(),
    address: generateMockAddress(),
    items,
    totalValue,
    status: 'pending',
    estimatedTime: faker.date.future({ years: 0.1 }).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    orderNumber: `#${orderNumber.toString().padStart(4, '0')}`
  };
};

export const generateMockRoute = (): DeliveryRoute => {
  const orderCount = faker.number.int({ min: 5, max: 12 });
  const orders = Array.from({ length: orderCount }, (_, index) => 
    generateMockOrder(1001 + index)
  );

  return {
    id: faker.string.uuid(),
    driverId: faker.string.uuid(),
    driverName: faker.person.fullName(),
    orders,
    status: 'not_started',
    currentOrderIndex: 0
  };
};
