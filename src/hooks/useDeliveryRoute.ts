import { useState, useEffect } from 'react';
import { DeliveryRoute, Order, DeliveryInfo } from '../types/delivery';
import { generateMockRoute } from '../utils/mockData';

export const useDeliveryRoute = () => {
  const [route, setRoute] = useState<DeliveryRoute | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento da rota
    setTimeout(() => {
      setRoute(generateMockRoute());
      setLoading(false);
    }, 1000);
  }, []);

  const startRoute = () => {
    if (!route) return;
    
    setRoute({
      ...route,
      status: 'in_progress',
      startTime: new Date()
    });
  };

  const completeOrder = (orderId: string, deliveryInfo: DeliveryInfo) => {
    if (!route) return;

    const updatedOrders = route.orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'delivered' as const, deliveryInfo }
        : order
    );

    const nextOrderIndex = route.currentOrderIndex + 1;
    const isRouteCompleted = nextOrderIndex >= route.orders.length;

    setRoute({
      ...route,
      orders: updatedOrders,
      currentOrderIndex: isRouteCompleted ? route.currentOrderIndex : nextOrderIndex,
      status: isRouteCompleted ? 'completed' : 'in_progress',
      endTime: isRouteCompleted ? new Date() : undefined
    });
  };

  const failOrder = (orderId: string, notes: string) => {
    if (!route) return;

    const updatedOrders = route.orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'failed' as const, deliveryInfo: { deliveredToRecipient: false, notes } }
        : order
    );

    const nextOrderIndex = route.currentOrderIndex + 1;
    const isRouteCompleted = nextOrderIndex >= route.orders.length;

    setRoute({
      ...route,
      orders: updatedOrders,
      currentOrderIndex: isRouteCompleted ? route.currentOrderIndex : nextOrderIndex,
      status: isRouteCompleted ? 'completed' : 'in_progress',
      endTime: isRouteCompleted ? new Date() : undefined
    });
  };

  const getCurrentOrder = (): Order | null => {
    if (!route || route.currentOrderIndex >= route.orders.length) return null;
    return route.orders[route.currentOrderIndex];
  };

  const getCompletedOrdersCount = (): number => {
    if (!route) return 0;
    return route.orders.filter(order => order.status === 'delivered').length;
  };

  const getPendingOrdersCount = (): number => {
    if (!route) return 0;
    return route.orders.filter(order => order.status === 'pending').length;
  };

  return {
    route,
    loading,
    startRoute,
    completeOrder,
    failOrder,
    getCurrentOrder,
    getCompletedOrdersCount,
    getPendingOrdersCount
  };
};
