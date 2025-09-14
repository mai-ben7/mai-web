"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageSquare } from 'lucide-react';
import BookNowCard from './BookNowCard';
import ContactOnlyCard from './ContactOnlyCard';
import { useI18n } from '@/components/i18n/I18nProvider';

export default function BookingSection() {
  const { t } = useI18n();
  
  return (
    <motion.section
      id="booking"
      dir="rtl"
      data-theme
      data-stop1="#e7efff" data-stop2="#ead7ff" data-stop3="#ffe3f2"
      data-o1-x="20%" data-o1-y="68rem" data-o1-size="40rem" data-o1-color="rgba(111,140,255,.45)" data-o1-alpha="1"
      data-o2-x="78%" data-o2-y="92rem" data-o2-size="36rem" data-o2-color="rgba(180,120,255,.35)" data-o2-alpha=".9"
      data-o3-x="60%" data-o3-y="120rem" data-o3-size="44rem" data-o3-color="rgba(255,120,200,.28)" data-o3-alpha=".85"
      className="py-20 relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Global background renders behind; section stays transparent */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t("booking.title")}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("booking.subtitle")}
          </p>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-right">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t("booking.quickBooking.title")}</h3>
                <p className="text-gray-600">
                  {t("booking.quickBooking.description")}
                </p>
              </div>
              
              <div className="text-right">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-full mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t("booking.contact.title")}</h3>
                <p className="text-gray-600">
                  {t("booking.contact.description")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Book Now Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Popular Badge */}
            <div className="absolute -top-3 -right-3 z-10">
              <span className="bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {t("booking.popular")}
              </span>
            </div>
            
            <BookNowCard />
          </motion.div>

          {/* Contact Only Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <ContactOnlyCard />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
