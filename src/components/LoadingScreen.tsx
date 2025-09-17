import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ 
            x: [0, 20, 0],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-6"
        >
          <Truck size={64} className="text-white mx-auto" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-4"
        >
          Carregando sua rota...
        </motion.h1>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="h-1 w-48 bg-blue-300 rounded-full mx-auto"
        />
      </div>
    </div>
  );
};
