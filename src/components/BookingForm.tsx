"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/components/i18n/I18nProvider";

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
  const { t } = useI18n();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 bg-gray-50 p-6 rounded-xl"
    >
      <h3 className="text-lg font-semibold text-gray-900 text-end">פרטי הזמנה</h3>
      
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 text-end mb-2">
          <User className="h-4 w-4 inline ms-2" />
          שם מלא *
        </label>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          className="border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-end"
          placeholder={t("booking.bookNow.namePlaceholder")}
          suppressHydrationWarning
        />
        {errors.name && (
          <p className="text-red-500 text-sm text-end mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 text-end mb-2">
          <Mail className="h-4 w-4 inline ms-2" />
          אימייל *
        </label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          className="border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-end"
          placeholder={t("booking.bookNow.emailPlaceholder")}
          suppressHydrationWarning
        />
        {errors.email && (
          <p className="text-red-500 text-sm text-end mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 text-end mb-2">
          <Phone className="h-4 w-4 inline ms-2" />
          טלפון
        </label>
        <Input
          type="tel"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          className="border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-end"
          placeholder={t("booking.bookNow.phonePlaceholder")}
          suppressHydrationWarning
        />
        {errors.phone && (
          <p className="text-red-500 text-sm text-end mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 text-end mb-2">
          <MessageSquare className="h-4 w-4 inline ms-2" />
          הערות
        </label>
        <Textarea
          value={formData.note}
          onChange={(e) => onChange('note', e.target.value)}
          className="border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-end"
          placeholder={t("booking.bookNow.notePlaceholder")}
          rows={3}
          suppressHydrationWarning
        />
        {errors.note && (
          <p className="text-red-500 text-sm text-end mt-1">{errors.note}</p>
        )}
      </div>
    </motion.div>
  );
}
