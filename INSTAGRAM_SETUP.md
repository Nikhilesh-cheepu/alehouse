# Instagram Integration Setup Guide

This guide will help you connect your Instagram account to display your latest posts on the AleHouse website gallery.

## Prerequisites

- A Facebook Business account (or convert your personal account to a Business account)
- An Instagram Business or Creator account
- Access to Facebook Developers (developers.facebook.com)

## Step 1: Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Choose "Business" as the app type
4. Fill in your app details:
   - App Name: "AleHouse Website" (or your preferred name)
   - App Contact Email: Your email
   - Business Account: Select your business account
5. Click "Create App"

## Step 2: Add Instagram Basic Display Product

1. In your app dashboard, go to "Add Products"
2. Find "Instagram Basic Display" and click "Set Up"
3. You'll be redirected to the Instagram Basic Display settings

## Step 3: Configure Instagram Basic Display

1. In the Instagram Basic Display settings:
   - Add your website URL to "Valid OAuth Redirect URIs"
     - For local development: `http://localhost:3000`
     - For production: `https://yourdomain.com`
   - Add your website URL to "Deauthorize Callback URL"
   - Add your website URL to "Data Deletion Request URL"

2. Click "Save Changes"

## Step 4: Get Your App Credentials

1. In your app dashboard, go to "Settings" → "Basic"
2. Note down:
   - **App ID**
   - **App Secret** (click "Show" to reveal)

## Step 5: Get Instagram User ID and Access Token

### Option A: Using Graph API Explorer (Recommended)

1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app from the dropdown
3. Click "Generate Access Token"
4. Select permissions: `instagram_basic`, `pages_show_list`, `instagram_manage_insights`
5. Copy the generated token (this is a short-lived token)

### Option B: Using Long-Lived Access Token

For production, you'll want a long-lived token:

1. Exchange your short-lived token for a long-lived token:
   ```
   GET https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret={app-secret}&access_token={short-lived-token}
   ```

2. Get your Instagram User ID:
   ```
   GET https://graph.instagram.com/me?fields=id,username&access_token={long-lived-token}
   ```

## Step 6: Configure Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add the following variables:

```env
INSTAGRAM_ACCESS_TOKEN=your_long_lived_access_token_here
INSTAGRAM_USER_ID=your_instagram_user_id_here
```

**Important:** 
- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- For production (Vercel, etc.), add these variables in your hosting platform's environment settings

## Step 7: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Gallery section on your website
3. You should see your Instagram posts displayed alongside static images

## Troubleshooting

### No Instagram posts showing

1. **Check API credentials:**
   - Verify `INSTAGRAM_ACCESS_TOKEN` and `INSTAGRAM_USER_ID` are set correctly
   - Check the browser console and server logs for errors

2. **Token expiration:**
   - Long-lived tokens expire after 60 days
   - You'll need to refresh the token periodically
   - Consider setting up automatic token refresh

3. **API rate limits:**
   - Instagram API has rate limits
   - The integration includes caching (30 minutes) to reduce API calls
   - If you hit rate limits, wait before making more requests

### Error: "Invalid OAuth access token"

- Your access token may have expired
- Generate a new long-lived token
- Update your `.env.local` file

### Error: "User not found"

- Verify your `INSTAGRAM_USER_ID` is correct
- Make sure your Instagram account is a Business or Creator account
- Ensure the account is connected to your Facebook app

## Token Refresh (Important for Production)

Long-lived tokens expire after 60 days. To keep your integration working:

1. **Manual refresh:**
   - Before expiration, exchange your current token for a new one
   - Update your environment variables

2. **Automatic refresh (Advanced):**
   - Set up a cron job or scheduled function
   - Use the token exchange endpoint to refresh automatically
   - Store tokens securely (database, secure vault, etc.)

## Alternative: Using Instagram Graph API

If you need more features (insights, comments, etc.), consider using the Instagram Graph API instead:

1. Add "Instagram Graph API" product to your Facebook app
2. Requires a Facebook Page connected to your Instagram account
3. More complex setup but offers more features

## Support

For more information:
- [Instagram Basic Display API Documentation](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Instagram Graph API Documentation](https://developers.facebook.com/docs/instagram-api)

## Notes

- The integration fetches up to 12 Instagram posts
- Posts are cached for 30 minutes to improve performance
- Only IMAGE and CAROUSEL_ALBUM media types are displayed (videos are filtered out)
- Static gallery images will always be shown as a fallback if Instagram fails

