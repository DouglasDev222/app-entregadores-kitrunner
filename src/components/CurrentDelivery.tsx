import { useState } from 'react';
import { motion } from 'framer-motion';
import { Order } from '../types/delivery';
import { 
  MapPin, 
  Phone, 
  Package, 
  Navigation, 
  CheckCircle, 
  XCircle,
  Clock,
  User,
  DollarSign
} from 'lucide-react';
import { openGoogleMaps, formatAddress } from '../utils/navigation';

interface CurrentDeliveryProps {
  order: Order;
  orderIndex: number;
  totalOrders: number;
  onComplete: (notes?: string) => void;
  onFail: (notes: string) => void;
}

export const CurrentDelivery = ({ 
  order, 
  orderIndex, 
  totalOrders, 
  onComplete, 
  onFail 
}: CurrentDeliveryProps) => {
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [notes, setNotes] = useState('');

  const handleNavigate = () => {
    openGoogleMaps(order.address);
  };

  const handleComplete = () => {
    onComplete(notes);
    setShowCompleteModal(false);
    setNotes('');
  };

  const handleFail = () => {
    if (notes.trim()) {
      onFail(notes);
      setShowFailModal(false);
      setNotes('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">Entrega Atual</h1>
          <div className="bg-blue-500 px-3 py-1 rounded-full">
            <span className="text-sm font-medium">
              {orderIndex + 1} de {totalOrders}
            </span>
          </div>
        </div>
        <p className="text-blue-100">{order.orderNumber}</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Customer Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <User className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{order.customer.name}</h3>
              <p className="text-gray-600">Cliente</p>
            </div>
          </div>
          
          <button 
            onClick={() => window.open(`tel:${order.customer.phone}`, '_self')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Phone size={18} />
            <span>{order.customer.phone}</span>
          </button>
        </motion.div>

        {/* Address */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-start space-x-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <MapPin className="text-green-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Endereço de Entrega</h3>
              <p className="text-gray-600 leading-relaxed">
                {formatAddress(order.address)}
              </p>
              <p className="text-gray-500 text-sm mt-1">CEP: {order.address.zipCode}</p>
            </div>
          </div>
          
          <button 
            onClick={handleNavigate}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-green-700 transition-colors"
          >
            <Navigation size={20} />
            <span>Navegar no Google Maps</span>
          </button>
        </motion.div>

        {/* Order Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Package className="text-orange-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Itens do Pedido</h3>
              <p className="text-gray-600">{order.items.length} item(s)</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-800">
                  {(item.price * item.quantity).toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  })}
                </p>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <DollarSign className="text-green-600" size={20} />
              <span className="font-semibold text-gray-800">Total:</span>
            </div>
            <span className="text-xl font-bold text-green-600">
              {order.totalValue.toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              })}
            </span>
          </div>

          {order.estimatedTime && (
            <div className="flex items-center space-x-2 mt-3 text-gray-600">
              <Clock size={16} />
              <span className="text-sm">Horário estimado: {order.estimatedTime}</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFailModal(true)}
            className="flex-1 bg-red-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
          >
            <XCircle size={20} />
            <span>Falha na Entrega</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCompleteModal(true)}
            className="flex-1 bg-green-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
          >
            <CheckCircle size={20} />
            <span>Entrega Realizada</span>
          </motion.button>
        </div>
      </div>

      {/* Complete Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirmar Entrega</h3>
            <p className="text-gray-600 mb-4">
              Tem certeza que deseja marcar esta entrega como realizada?
            </p>
            
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Observações (opcional)"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none"
              rows={3}
            />
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCompleteModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleComplete}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg font-medium"
              >
                Confirmar
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Fail Modal */}
      {showFailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Falha na Entrega</h3>
            <p className="text-gray-600 mb-4">
              Por favor, descreva o motivo da falha na entrega:
            </p>
            
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Motivo da falha (obrigatório)"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none"
              rows={3}
              required
            />
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowFailModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleFail}
                disabled={!notes.trim()}
                className="flex-1 py-3 bg-red-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
