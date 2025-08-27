"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Send, Calendar, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fadeInUp } from "@/lib/animations"

const contactSchema = z.object({
  fullName: z.string().min(2, "שם מלא חייב להכיל לפחות 2 תווים"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  phone: z.string().min(10, "מספר טלפון חייב להכיל לפחות 10 ספרות"),
  website: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "ההודעה חייב להכיל לפחות 10 תווים"),
})

const consultationSchema = z.object({
  fullName: z.string().min(2, "שם מלא חייב להכיל לפחות 2 תווים"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  phone: z.string().min(10, "מספר טלפון חייב להכיל לפחות 10 ספרות"),
  company: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(10, "ההודעה חייב להכיל לפחות 10 תווים"),
})

type ContactFormData = z.infer<typeof contactSchema>
type ConsultationFormData = z.infer<typeof consultationSchema>

interface ContactFormProps {
  type: 'contact' | 'consultation'
}

export function ContactForm({ type }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData | ConsultationFormData>({
    resolver: zodResolver(type === 'contact' ? contactSchema : consultationSchema),
  })

  const onSubmit = async (data: ContactFormData | ConsultationFormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock API response
      const response = await fetch(`/api/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSubmitted(true)
        reset()
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('אירעה שגיאה בשליחת הטופס. אנא נסו שוב.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        className="text-center py-8"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          {type === 'contact' ? 'הטופס נשלח בהצלחה!' : 'ייעוץ נקבע בהצלחה!'}
        </h3>
        <p className="text-muted-foreground mb-4">
          {type === 'contact' 
            ? 'נחזור אליכם בהקדם האפשרי.' 
            : 'נשלח לכם אימייל עם פרטי הייעוץ.'
          }
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="outline"
          suppressHydrationWarning
        >
          שלח טופס נוסף
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">שם מלא *</label>
          <Input
            {...register('fullName')}
            placeholder="הכנס את שמך המלא"
            className={errors.fullName ? 'border-red-500' : ''}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">אימייל *</label>
          <Input
            {...register('email')}
            type="email"
            placeholder="your@email.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">טלפון *</label>
        <Input
          {...register('phone')}
          placeholder="050-123-4567"
          className={errors.phone ? 'border-red-500' : ''}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {type === 'contact' ? (
        <>
          <div>
            <label className="block text-sm font-medium mb-2">קישור לאתר/פיגמה (אופציונלי)</label>
            <Input
              {...register('website')}
              placeholder="https://your-website.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">תקציב משוער</label>
            <Select onValueChange={(value) => register('budget').onChange({ target: { value } })}>
              <SelectTrigger>
                <SelectValue placeholder="בחר תקציב" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5k-10k">5,000-10,000 ₪</SelectItem>
                <SelectItem value="10k-20k">10,000-20,000 ₪</SelectItem>
                <SelectItem value="20k-30k">20,000-30,000 ₪</SelectItem>
                <SelectItem value="30k+">30,000+ ₪</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium mb-2">שם החברה (אופציונלי)</label>
            <Input
              {...register('company')}
              placeholder="שם החברה שלך"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">תאריך מועדף</label>
              <Input
                {...register('preferredDate')}
                type="date"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">שעה מועדפת</label>
              <Select onValueChange={(value) => register('preferredTime').onChange({ target: { value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="בחר שעה" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">09:00</SelectItem>
                  <SelectItem value="10:00">10:00</SelectItem>
                  <SelectItem value="11:00">11:00</SelectItem>
                  <SelectItem value="12:00">12:00</SelectItem>
                  <SelectItem value="13:00">13:00</SelectItem>
                  <SelectItem value="14:00">14:00</SelectItem>
                  <SelectItem value="15:00">15:00</SelectItem>
                  <SelectItem value="16:00">16:00</SelectItem>
                  <SelectItem value="17:00">17:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">סוג פרויקט</label>
            <Select onValueChange={(value) => register('projectType').onChange({ target: { value } })}>
              <SelectTrigger>
                <SelectValue placeholder="בחר סוג פרויקט" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">אתר חדש</SelectItem>
                <SelectItem value="redesign">עיצוב מחדש</SelectItem>
                <SelectItem value="ecommerce">חנות מקוונת</SelectItem>
                <SelectItem value="app">אפליקציה</SelectItem>
                <SelectItem value="other">אחר</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">
          {type === 'contact' ? 'תיאור הפרויקט *' : 'פרטים נוספים *'}
        </label>
        <Textarea
          {...register('message')}
          placeholder={
            type === 'contact' 
              ? 'ספרו לנו על הפרויקט שלכם...' 
              : 'ספרו לנו על הצרכים שלכם...'
          }
          rows={4}
          className={errors.message ? 'border-red-500' : ''}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
        size="lg"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            שולח...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {type === 'contact' ? <Send className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
            {type === 'contact' ? 'שלח הודעה' : 'קבע ייעוץ חינם'}
          </div>
        )}
      </Button>
    </motion.form>
  )
} 