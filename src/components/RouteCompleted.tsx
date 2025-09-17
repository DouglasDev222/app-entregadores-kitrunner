import { motion } from 'framer-motion';
import { DeliveryRoute } from '../types/delivery';
import { CheckCircle, Clock, Package, DollarSign, XCircle } from 'lucide-react';

interface RouteCompletedProps {
  route: DeliveryRoute;
  onNewRoute: () => void;
}

export const RouteCompleted = ({ route, onNewRoute }: RouteCompletedProps) => {
  const completedOrders = route.orders.filter(order => order.status === 'delivered');
  const failedOrders = route.orders.filter(order => order.status === 'failed');
  const totalValue = completedOrders.reduce((sum, order) => sum + order.totalValue, 0);
  
  const duration = route.startTime && route.endTime 
    ? Math.round((route.endTime.getTime() - route.startTime.getTime()) / 60000)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <CheckCircle size={64} className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Rota Concluída!</h1>
          <p className="text-green-100">Parabéns, você finalizou todas as entregas</p>
        </motion.div>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Entregas Realizadas</p>
                <p className="text-2xl font-bold text-gray-800">{completedOrders.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <XCircle className="text-red-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Falhas</p>
                <p className="text-2xl font-bold text-gray-800">{failedOrders.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <DollarSign className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Valor Entregue</p>
                <p className="text-xl font-bold text-gray-800">
                  {totalValue.toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  })}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Clock className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Tempo Total</p>
                <p className="text-xl font-bold text-gray-800">{duration}min</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Order Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Resumo dos Pedidos</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {route.orders.map((order, index) => (
              <div key={order.id} className="p-4 border-b border-gray-50 last:border-b-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {order.status === 'delivered' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{order.customer.name}</p>
                      <p className="text-sm text-gray-600">{order.orderNumber}</p>
                      {order.deliveryNotes && (
                        <p className="text-xs text-gray-500 mt-1">{order.deliveryNotes}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      {order.totalValue.toLocaleString('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                      })}
                    </p>
                    <p className={`text-sm font-medium ${
                      order.status === 'delivered' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {order.status === 'delivered' ? 'Entregue' : 'Falha'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* New Route Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewRoute}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg"
        >
          <Package size={24} />
          <span>Nova Rota</span>
        </motion.button>
      </div>
    </div>
  );
};
