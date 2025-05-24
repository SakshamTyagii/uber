import React from 'react';
import { CreditCard, DollarSign, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  last4?: string;
}

interface PaymentMethodSelectorProps {
  onSelect: (method: PaymentMethod) => void;
  selectedMethodId?: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card-1',
    name: 'Credit Card',
    icon: <CreditCard className="h-5 w-5" />,
    last4: '4242',
  },
  {
    id: 'cash',
    name: 'Cash',
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    id: 'uber-cash',
    name: 'Uber Cash',
    icon: <Wallet className="h-5 w-5" />,
  },
];

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  onSelect,
  selectedMethodId = 'card-1',
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Payment</h3>
      <div className="space-y-2">
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
              selectedMethodId === method.id
                ? 'bg-gray-100 dark:bg-gray-800'
                : 'hover:bg-gray-50 dark:hover:bg-gray-900'
            }`}
            onClick={() => onSelect(method)}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {method.icon}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{method.name}</p>
                {method.last4 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    •••• {method.last4}
                  </p>
                )}
              </div>
            </div>
            <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
              {selectedMethodId === method.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-3 h-3 rounded-full bg-uber-blue"
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;