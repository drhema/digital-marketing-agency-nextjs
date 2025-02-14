"use client";

import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { Service } from '@/types';

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-xl flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-lg w-full border border-gray-800">
        <div className="flex justify-between items-start mb-6">
          <div className={`bg-gradient-to-r ${service.color} p-4 rounded-xl`}>
            {service.icon}
          </div>
          <button onClick={onClose} className="text-black-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
        <p className="text-black-400 mb-6">{service.description}</p>
        <div className="space-y-4">
          {service.features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-800 bg-opacity-50 p-4 rounded-xl"
            >
              <Sparkles className="w-5 h-5 text-purple-400 mr-3" />
              <span className="text-gray-200">{feature}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-gray-800">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:opacity-90 transition-opacity duration-200"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
