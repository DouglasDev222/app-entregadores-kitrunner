import { motion } from 'framer-motion';
import { DeliveryRoute } from '../types/delivery';
import { Clock, MapPin, Package, Play } from 'lucide-react';

interface RouteOverviewProps {
  route: DeliveryRoute;
  onStartRoute: () => void;
  completedCount: number;
  pendingCount: number;
}

export const RouteOverview = ({ route, onStartRoute, completedCount, pendingCount }: RouteOverviewProps) => {
  const totalValue = route.orders.reduce((sum, order) => sum + order.totalValue, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">Olá, {route.driverName}!</h1>
        <p className="text-blue-100">Sua rota está pronta para começar</p>
      </div>

      {/* Stats Cards */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Package className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total de Pedidos</p>
                <p className="text-2xl font-bold text-gray-800">{route.orders.length}</p>
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
              <div className="bg-green-100 p-2 rounded-lg">
                <span className="text-green-600 font-bold text-xl">R$</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Valor Total</p>
                <p className="text-2xl font-bold text-gray-800">
                  {totalValue.toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  })}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Progresso da Rota</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Entregues</span>
              <span className="font-semibold text-green-600">{completedCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pendentes</span>
              <span className="font-semibold text-orange-600">{pendingCount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / route.orders.length) * 100}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Orders List Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Próximas Entregas</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {route.orders.slice(0, 5).map((order, index) => (
              <div key={order.id} className="p-4 border-b border-gray-50 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                    order.status === 'failed' ? 'bg-red-100 text-red-600' :
                    index === 0 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{order.customer.name}</p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin size={12} className="mr-1" />
                      {order.address.neighborhood}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      {order.totalValue.toLocaleString('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                      })}
                    </p>
                    {order.estimatedTime && (
                      <p className="text-sm text-gray-500 flex items-center">
                        <Clock size={12} className="mr-1" />
                        {order.estimatedTime}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Start Route Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartRoute}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg"
        >
          <Play size={24} />
          <span>Iniciar Rota</span>
        </motion.button>
      </div>
    </div>
  );
};
