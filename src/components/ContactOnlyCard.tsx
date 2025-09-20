"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from '@/components/i18n/I18nProvider';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  agreeToTerms: boolean;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  agreeToTerms?: string;
}

export default function ContactOnlyCard() {
  const { t } = useI18n();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'שם מלא הוא שדה חובה';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'אימייל הוא שדה חובה';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'אנא הכנס/י אימייל תקין';
    }

    if (formData.phone.trim() && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'אנא הכנס/י מספר טלפון תקין';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'הודעה היא שדה חובה';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'עליך לאשר את תנאי השימוש';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          agreeToTerms: false
        });
      } else {
        const data = await response.json();
        setErrors({ message: data.error || 'שגיאה בשליחת ההודעה' });
      }
    } catch (error) {
      setErrors({ message: 'שגיאה בשליחת ההודעה' });
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full"
      >
        <Card className="border-2 border-green-200 bg-green-50 h-full">
          <CardContent className="p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="h-8 w-8 text-white" />
            </motion.div>
            
            <h3 className="text-xl font-bold text-green-800 mb-4">ההודעה נשלחה בהצלחה!</h3>
            <p className="text-green-700 mb-6">נחזור אליך בהקדם האפשרי</p>
            
            <Button 
              onClick={() => setSuccess(false)}
              className="w-full bg-green-600 hover:bg-green-700"
              suppressHydrationWarning
            >
              שלח הודעה נוספת
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card className="h-full border-2 border-blue-200">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">{t("booking.contact.title")}</CardTitle>
        <p className="text-gray-600 text-sm">{t("booking.contact.description")}</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 text-end mb-2">
              {t("booking.contact.fullName")}
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-end"
              placeholder={t("booking.contact.namePlaceholder")}
              suppressHydrationWarning
            />
            {errors.name && (
              <p className="text-red-500 text-sm text-end mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 text-end mb-2">
              {t("booking.contact.email")}
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleFormChange('email', e.target.value)}
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-end"
              placeholder={t("booking.contact.emailPlaceholder")}
              suppressHydrationWarning
            />
            {errors.email && (
              <p className="text-red-500 text-sm text-end mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 text-end mb-2">
              {t("booking.contact.phone")}
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleFormChange('phone', e.target.value)}
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-end"
              placeholder={t("booking.contact.phonePlaceholder")}
              suppressHydrationWarning
            />
            {errors.phone && (
              <p className="text-red-500 text-sm text-end mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 text-end mb-2">
              {t("booking.contact.message")}
            </label>
            <Textarea
              value={formData.message}
              onChange={(e) => handleFormChange('message', e.target.value)}
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-end min-h-[120px]"
              placeholder={t("booking.contact.messagePlaceholder")}
              suppressHydrationWarning
            />
            {errors.message && (
              <p className="text-red-500 text-sm text-end mt-1">{errors.message}</p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start space-x-2 space-x-reverse">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => handleFormChange('agreeToTerms', checked as boolean)}
              suppressHydrationWarning
            />
            <label htmlFor="terms" className="text-sm text-gray-600 text-end leading-relaxed">
              {t("booking.contact.agreeToTerms")}
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-sm text-end">{errors.agreeToTerms}</p>
          )}

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg py-4 rounded-xl shadow-lg border-0 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              suppressHydrationWarning
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  שולח...
                </div>
              ) : (
                <>
                  <Send className="h-5 w-5 ms-2" />
                  {t("booking.contact.sendMessage")}
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
}
