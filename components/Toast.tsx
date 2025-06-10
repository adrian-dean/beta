'use client';

import React, { useState, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the shape of the toast object
interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

// Define the shape of the context value
interface ToastContextType {
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Custom hook to use the toast functionality
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString(); // Unique ID for each toast
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    // Auto-remove toast after a delay
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000); // Toast visible for 3 seconds
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[10000] space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 200, scale: 0.5 }}
              className={`p-4 rounded-lg shadow-lg text-white font-semibold flex items-center gap-2
                          ${toast.type === 'success' ? 'bg-green-600' : ''}
                          ${toast.type === 'error' ? 'bg-red-600' : ''}
                          ${toast.type === 'info' ? 'bg-blue-600' : ''}`}
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
