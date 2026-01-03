# English Idioms Learning App

A modern, dark-themed web application for learning 300 English idioms through interactive quizzes with text-to-speech functionality, user authentication, and progress tracking.

## Features

- **300 English Idioms**: Organized into 15 sessions with 20 idioms each
- **Interactive Quizzes**: Multiple-choice questions with immediate feedback
- **Text-to-Speech**: Native pronunciation using Web Speech API
- **User Authentication**: Sign up with email/password or Google
- **Progress Tracking**: Save and monitor your learning progress across sessions
- **Category Filtering**: Filter idioms by Daily Conversation, Business, or Academic
- **Dark Theme**: Modern, sleek UI with smooth animations
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## Tech Stack

- **Frontend**: React 18+
- **Styling**: Tailwind CSS + Framer Motion
- **Routing**: React Router v6
- **State Management**: React Context API + Hooks
- **Backend**: Firebase (Authentication + Firestore)
- **Icons**: Lucide React
- **Deployment**: Vercel/Netlify ready

## Getting Started

### Prerequisites

- Node.js 14+ and npm installed
- Firebase account
- Modern web browser with Web Speech API support (Chrome recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd idiom-learning-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**

   a. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)

   b. Enable Authentication:
      - Go to Authentication > Sign-in method
      - Enable Email/Password
      - Enable Google sign-in

   c. Create a Firestore Database:
      - Go to Firestore Database
      - Create database in production mode
      - Set up the following security rules:
      ```javascript
      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {
          match /users/{userId} {
            allow read, write: if request.auth != null && request.auth.uid == userId;
          }
        }
      }
      ```

   d. Get your Firebase configuration from Project Settings

4. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your Firebase credentials:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id_here
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   REACT_APP_FIREBASE_APP_ID=your_app_id_here
   ```

5. **Add your idioms data**

   Update `src/data/idioms.json` with your complete list of 300 idioms. The file structure should follow this format:
   ```json
   {
     "idioms": [
       {
         "id": 1,
         "expression": "Play it by ear",
         "example": "I didn't plan my speech; I will just play it by ear.",
         "meaning": "臨機応変にやる、出たとこ勝負でいく",
         "category": "Daily Conversation",
         "session": 1
       }
     ]
   }
   ```

6. **Start the development server**
   ```bash
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── components/
│   ├── Auth/              # Authentication components
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── Dashboard/         # Dashboard components
│   │   ├── Dashboard.jsx
│   │   ├── ProgressCard.jsx
│   │   └── SessionList.jsx
│   ├── Session/           # Quiz session components
│   │   ├── SessionScreen.jsx
│   │   ├── QuestionCard.jsx
│   │   ├── ChoiceButton.jsx
│   │   └── AudioButton.jsx
│   ├── Results/           # Results screen components
│   │   ├── ResultScreen.jsx
│   │   └── ScoreCard.jsx
│   └── Common/            # Shared components
│       ├── Header.jsx
│       ├── LoadingSpinner.jsx
│       └── ProtectedRoute.jsx
├── contexts/              # React contexts
│   ├── AuthContext.jsx
│   └── ProgressContext.jsx
├── hooks/                 # Custom hooks
│   ├── useAuth.js
│   ├── useSpeech.js
│   └── useProgress.js
├── data/                  # Data files
│   └── idioms.json
├── utils/                 # Utility functions
│   ├── firebase.js
│   ├── questionGenerator.js
│   └── speechSynthesis.js
├── App.js                 # Main app component
└── index.js              # Entry point
```

## Usage

1. **Sign Up / Sign In**
   - Create an account with email/password or sign in with Google
   - Your progress will be automatically saved to your account

2. **Dashboard**
   - View your overall progress and statistics
   - Browse available sessions
   - Filter sessions by category
   - Continue from where you left off

3. **Learning Session**
   - Each session contains 20 idioms
   - Read the expression and example sentence
   - Click the audio button to hear pronunciation
   - Select the correct Japanese meaning from 4 options
   - Receive immediate feedback on your answer

4. **Results**
   - View your score after completing a session
   - Review all questions and correct answers
   - Retry the session or move to the next one

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Add all `REACT_APP_*` environment variables

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to Netlify:
   - Drag and drop to Netlify dashboard, or
   - Use Netlify CLI

3. Set environment variables in Netlify dashboard

## Firebase Free Tier Limits

The app is optimized for Firebase's free tier:
- **Authentication**: Unlimited users
- **Firestore**:
  - 50,000 reads/day
  - 20,000 writes/day
  - 1 GB storage

Estimated usage for 100 active users:
- Daily writes: ~500 (well within limits)
- Daily reads: ~10,000 (well within limits)

## Browser Compatibility

- Chrome/Edge: Full support
- Safari: Full support
- Firefox: Full support (TTS may vary)
- Mobile browsers: Full support on modern devices

**Note**: Text-to-speech functionality works best in Chrome and Safari.

## Customization

### Change Theme Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'bg-primary': '#0a0a0a',
      'bg-secondary': '#1a1a1a',
      'accent-primary': '#3b82f6',
      // ... customize as needed
    }
  }
}
```

### Add More Sessions

Simply add more idioms to `idioms.json` with higher session numbers. The app automatically adapts to any number of sessions.

### Modify Quiz Logic

Edit `src/utils/questionGenerator.js` to customize how questions are generated.

## Troubleshooting

### Firebase Authentication Errors
- Ensure you've enabled Email/Password and Google sign-in methods in Firebase Console
- Check that your `.env` file contains correct Firebase credentials

### Text-to-Speech Not Working
- Web Speech API requires HTTPS in production (works on localhost)
- Check browser compatibility
- Ensure browser permissions allow audio playback

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (14+ required)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- English idioms data extracted from educational materials
- UI inspiration from React Bits and modern design trends
- Icons by Lucide React

## Contact

For questions or support, please open an issue on GitHub.

---


