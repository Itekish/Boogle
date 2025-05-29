// BuyEventTicket/index.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../../../../components/Spinner';
import { motion } from 'framer-motion';
import { useGetCurrentUser } from '../../../../shared/hooks/useGetCurrentUser';
import useBuyEvent from './hook/useBuyEvent';

const BuyEventTicket = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user, isLoading: userLoading } = useGetCurrentUser();
  const {
    event,
    loading,
    error,
    handlePurchase,
  } = useBuyEvent(eventId, user, navigate);

  if (loading || userLoading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Purchase Tickets</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
          Be part of <span className="font-semibold">{event?.title}</span> happening on{' '}
          <span className="font-semibold">{new Date(event?.date).toLocaleDateString()}</span>.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {event?.tickets.map((t, idx) => (
          <motion.div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.type}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Price: ${t.price}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Remaining: {t.quantity}</p>
            </div>
            <button
              onClick={() => handlePurchase(t.type)}
              disabled={t.quantity === 0}
              className={`mt-4 w-full py-2 rounded-xl font-semibold transition transform hover:scale-105 
                ${t.quantity > 0 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
            >
              {t.quantity > 0 ? 'Purchase' : 'Sold Out'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BuyEventTicket;
