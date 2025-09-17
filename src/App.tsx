import React from 'react';
import { useDeliveryRoute } from './hooks/useDeliveryRoute';
import { LoadingScreen } from './components/LoadingScreen';
import { RouteOverview } from './components/RouteOverview';
import { CurrentDelivery } from './components/CurrentDelivery';
import { RouteCompleted } from './components/RouteCompleted';

function App() {
  const {
    route,
    loading,
    startRoute,
    completeOrder,
    failOrder,
    getCurrentOrder,
    getCompletedOrdersCount,
    getPendingOrdersCount
  } = useDeliveryRoute();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!route) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Erro ao carregar a rota</p>
      </div>
    );
  }

  // Se a rota ainda não foi iniciada
  if (route.status === 'not_started') {
    return (
      <RouteOverview
        route={route}
        onStartRoute={startRoute}
        completedCount={getCompletedOrdersCount()}
        pendingCount={getPendingOrdersCount()}
      />
    );
  }

  // Se a rota foi concluída
  if (route.status === 'completed') {
    return (
      <RouteCompleted
        route={route}
        onNewRoute={() => window.location.reload()}
      />
    );
  }

  // Se há uma entrega atual em andamento
  const currentOrder = getCurrentOrder();
  if (currentOrder) {
    return (
      <CurrentDelivery
        order={currentOrder}
        orderIndex={route.currentOrderIndex}
        totalOrders={route.orders.length}
        onComplete={(notes) => completeOrder(currentOrder.id, notes)}
        onFail={(notes) => failOrder(currentOrder.id, notes)}
      />
    );
  }

  // Fallback
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-gray-600">Carregando próxima entrega...</p>
    </div>
  );
}

export default App;
