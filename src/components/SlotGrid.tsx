"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimeSlot {
  start: string;
  end: string;
}

interface SlotGridProps {
  slots: TimeSlot[];
  loading: boolean;
  selectedSlot: TimeSlot | null;
  onSlotSelect: (slot: TimeSlot) => void;
}

export default function SlotGrid({ slots, loading, selectedSlot, onSlotSelect }: SlotGridProps) {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('he-IL', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="h-4 w-4" />
          <span className="text-sm">טוען זמנים זמינים...</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (slots.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-600">
        <Clock className="h-4 w-4" />
        <span className="text-sm">זמנים זמינים</span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {slots.map((slot, index) => {
          const isSelected = selectedSlot?.start === slot.start;
          const startTime = formatTime(slot.start);
          const endTime = formatTime(slot.end);
          
          return (
            <motion.button
              key={slot.start}
              onClick={() => onSlotSelect(slot)}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? 'border-primary bg-primary text-white shadow-lg'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-primary hover:bg-primary/5'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              suppressHydrationWarning
            >
              {startTime} - {endTime}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
