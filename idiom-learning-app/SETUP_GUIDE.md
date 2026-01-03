# Quick Setup Guide

## Step-by-Step Instructions to Get Your App Running

### 1. Firebase Setup (5 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and create a new project
3. Once created, go to **Authentication**:
   - Click "Get Started"
   - Enable "Email/Password" sign-in method
   - Enable "Google" sign-in method (add your email as support email)

4. Go to **Firestore Database**:
   - Click "Create database"
   - Start in **production mode**
   - Choose a location closest to you
   - Once created, go to **Rules** tab and paste:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```
   - Click "Publish"

5. Get your Firebase config:
   - Click the gear icon (Settings) > Project settings
   - Scroll down to "Your apps"
   - Click the web icon (`</>`)
   - Register your app with a name (e.g., "English Idioms")
   - Copy the `firebaseConfig` object values

### 2. Configure Environment Variables

1. Open the `.env` file in the project root
2. Replace the placeholder values with your Firebase config:

```env
REACT_APP_FIREBASE_API_KEY=AIzaSy...
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 3. Add Your Idioms Data

Update `src/data/idioms.json` with your 300 idioms. The current file has 5 sample idioms - replace the entire array with your complete data.

**Important**: Make sure each idiom follows this exact structure:
```json
{
  "id": 1,
  "expression": "Play it by ear",
  "example": "I didn't plan my speech; I will just play it by ear.",
  "meaning": "臨機応変にやる、出たとこ勝負でいく",
  "category": "Daily Conversation",
  "session": 1
}
```

**Guidelines**:
- IDs should be unique (1-300)
- Sessions should be numbered 1-15
- Each session should have 20 idioms
- Categories: "Daily Conversation", "Business", or "Academic"

### 4. Start the App

```bash
npm start
```

The app will open at `http://localhost:3000`

### 5. Test the App

1. Click "Sign Up" and create a test account
2. Or click "Sign in with Google"
3. Once logged in, you'll see the Dashboard
4. Click on Session 1 to start learning
5. Complete a quiz to test progress tracking

## Troubleshooting

### "Firebase configuration error"
- Double-check your `.env` file has all values filled in
- Make sure you saved the `.env` file
- Restart the development server (`npm start`)

### "Authentication failed"
- Verify Email/Password is enabled in Firebase Console
- For Google sign-in, make sure you added a support email

### "Can't read/write to Firestore"
- Check your Firestore security rules are published
- Make sure you're signed in

### "No idioms showing"
- Verify `src/data/idioms.json` is valid JSON
- Check the browser console for errors

### "Text-to-speech not working"
- TTS works best in Chrome and Safari
- Make sure your browser allows audio playback
- Try clicking the audio button again

## Next Steps

1. **Customize the data**: Add all 300 idioms to `idioms.json`
2. **Test thoroughly**: Try all features (signup, quiz, results)
3. **Deploy**: Follow the deployment guide in README.md
4. **Share**: Send the deployed URL to users

## Need Help?

Check the main README.md for more detailed documentation and troubleshooting tips.
