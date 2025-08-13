import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const consultationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  company: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(10),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = consultationSchema.parse(body)
    
    // TODO: Add email service integration here
    // TODO: Add calendar integration (Calendly, etc.)
    // For now, we'll just log the data and return success
    console.log('Consultation booking submission:', validatedData)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'ייעוץ נקבע בהצלחה! נשלח לכם אימייל עם פרטי הייעוץ.' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Consultation form error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'נתונים לא תקינים. אנא בדקו את הטופס ונסו שוב.' 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'אירעה שגיאה בקביעת הייעוץ. אנא נסו שוב.' 
      },
      { status: 500 }
    )
  }
} 