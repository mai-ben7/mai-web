import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  website: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = contactSchema.parse(body)
    
    // TODO: Add email service integration here
    // For now, we'll just log the data and return success
    console.log('Contact form submission:', validatedData)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'הטופס נשלח בהצלחה! נחזור אליכם בהקדם האפשרי.' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    
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
        message: 'אירעה שגיאה בשליחת הטופס. אנא נסו שוב.' 
      },
      { status: 500 }
    )
  }
} 