"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  note: string;
}

interface BookingFormProps {
  formData: BookingFormData;
  onChange: (field: keyof BookingFormData, value: string) => void;
  errors: Partial<BookingFormData>;
}

export default function BookingForm({ formData, onChange, errors }: BookingFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 bg-gray-50 p-6 rounded-xl"
    >
      <h3 className="text-lg font-semibold text-gray-900 text-right">פרטי הזמנה</h3>
      
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 text-right mb-2">
          <User className="h-4 w-4 inline ml-2" />
          שם מלא *
        </label>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          className="border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-right"
          placeholder="הכנס/י את שמך המלא"
          suppressHydrationWarning
        />
        {errors.name && (
          <p className="text-red-500 text-sm text-right mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 text-right mb-2">
          <Mail className="h-4 w-4 inline ml-2" />
          אימייל *
        </label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          className="border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-right"
          placeholder="הכנס/י את כתובת האימייל שלך"
          suppressHydrationWarning
        />
        {errors.email && (
          <p className="text-red-500 text-sm text-right mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 text-right mb-2">
          <Phone className="h-4 w-4 inline ml-2" />
          טלפון
        </label>
        <Input
          type="tel"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          className="border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-right"
          placeholder="הכנס/י את מספר הטלפון שלך"
          suppressHydrationWarning
        />
        {errors.phone && (
          <p className="text-red-500 text-sm text-right mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 text-right mb-2">
          <MessageSquare className="h-4 w-4 inline ml-2" />
          הערות
        </label>
        <Textarea
          value={formData.note}
          onChange={(e) => onChange('note', e.target.value)}
          className="border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-right"
          placeholder="הערות נוספות, מטרות או שאלות..."
          rows={3}
          suppressHydrationWarning
        />
        {errors.note && (
          <p className="text-red-500 text-sm text-right mt-1">{errors.note}</p>
        )}
      </div>
    </motion.div>
  );
}
