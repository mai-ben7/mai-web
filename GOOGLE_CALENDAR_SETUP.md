# Google Calendar Booking System - Setup Guide

## 🚀 Quick Start

This guide will help you set up the Google Calendar booking system for your fitness website.

## 📋 Prerequisites

- Google account with Google Calendar
- Google Cloud Console access
- Next.js project (already set up)

## 🔧 Step 1: Google Cloud Console Setup

### 1.1 Create a New Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name your project (e.g., "Fitness Booking System")
4. Click "Create"

### 1.2 Enable Google Calendar API
1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google Calendar API"
3. Click on it and press "Enable"

### 1.3 Create OAuth2 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: Your fitness business name
   - User support email: Your email
   - Developer contact information: Your email
   - Save and continue through the steps

4. Create OAuth Client ID:
   - Application type: Web application
   - Name: "Fitness Booking Web App"
   - Authorized redirect URIs: `http://localhost:3002/api/google/oauth/callback`
   - Click "Create"

5. **Save the Client ID and Client Secret** - you'll need these for the environment variables

### 1.4 Add Test Users
1. Go to "OAuth consent screen"
2. Add your email as a test user
3. This allows you to test the booking system

## 🔧 Step 2: Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Google OAuth2
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3002/api/google/oauth/callback

# Trainer Configuration
TRAINER_EMAIL=your_trainer_email@gmail.com
TRAINER_CALENDAR_ID=primary
SITE_TIMEZONE=Asia/Jerusalem

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3002
```

**Replace the values:**
- `your_google_client_id_here`: The Client ID from step 1.3
- `your_google_client_secret_here`: The Client Secret from step 1.3
- `your_trainer_email@gmail.com`: The Gmail address that will receive bookings

## 🔧 Step 3: Connect Google Calendar

### 3.1 Initial Authentication
1. Start your development server: `npm run dev`
2. Visit: `http://localhost:3002/api/google/oauth/start`
3. You should see a JSON response with an `authUrl`
4. Copy the `authUrl` and open it in your browser
5. Sign in with your trainer email and authorize the application
6. You'll be redirected to a callback URL - this should show a success message

### 3.2 Verify Connection
1. Check that a `.tokens.json` file was created in your project root
2. This file contains your authentication tokens

## 🔧 Step 4: Set Up Availability

### 4.1 Create Availability Events
In your Google Calendar, create events with titles containing any of these keywords:
- "Availability"
- "Available" 
- "Open"
- "Slot"
- "זמינות"
- "פתוח"
- "Free"
- "פנוי"

**Examples:**
- "Available for sessions"
- "זמינות לאימונים"
- "Open slots"
- "Free time"

### 4.2 Event Types
- **Timed events**: Set specific start/end times for availability windows
- **All-day events**: Mark entire days as available

## 🔧 Step 5: Add to Your Website

### 5.1 Import the Component
In your main page or wherever you want the booking system:

```tsx
import BookingSection from '@/components/BookingSection';

export default function HomePage() {
  return (
    <div>
      {/* Your existing content */}
      <BookingSection />
    </div>
  );
}
```

### 5.2 Test the System
1. Visit your website
2. Try booking a session:
   - Select a service
   - Choose a date
   - Pick an available time slot
   - Fill in your details
   - Submit the booking

## 🔧 Step 6: Production Deployment

### 6.1 Update Redirect URI
For production, update the redirect URI in Google Cloud Console:
1. Go to your OAuth client settings
2. Add your production domain: `https://yourdomain.com/api/google/oauth/callback`
3. Update your environment variables accordingly

### 6.2 Environment Variables for Production
```env
GOOGLE_REDIRECT_URI=https://yourdomain.com/api/google/oauth/callback
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 🎯 Features Included

✅ **Real-time availability checking** from Google Calendar
✅ **OAuth2 authentication** with secure token storage
✅ **Automatic email notifications** via Google Calendar
✅ **Google Meet integration** for video calls
✅ **RTL support** for Hebrew
✅ **Responsive design** for mobile and desktop
✅ **Form validation** with error handling
✅ **Loading states** and success messages
✅ **Multiple service types** (consultation, training sessions)

## 🔍 Troubleshooting

### Common Issues:

1. **"Google Calendar API לא מופעל"**
   - Make sure you enabled the Google Calendar API in Google Cloud Console

2. **"החיבור לגוגל פג תוקף"**
   - Re-authenticate by visiting the OAuth start URL again

3. **No available slots showing**
   - Check that you have availability events in your calendar
   - Verify the event titles contain the required keywords

4. **Authentication errors**
   - Ensure your email is added as a test user in OAuth consent screen
   - Check that redirect URIs match exactly

### Debug Mode:
The system includes extensive logging. Check your console for:
- `[slots]` - Availability slot generation
- `[email]` - Email sending operations
- Token storage and retrieval messages

## 📞 Support

If you encounter issues:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure Google Calendar API is enabled
4. Confirm your email is added as a test user

## 🎉 Success!

Once everything is set up, your visitors will be able to:
- See real-time availability from your Google Calendar
- Book sessions with automatic confirmation emails
- Receive Google Meet links for video calls
- Get reminders and notifications

The system is now ready to handle bookings automatically! 🚀
