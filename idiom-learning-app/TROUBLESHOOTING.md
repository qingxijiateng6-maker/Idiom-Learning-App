# Troubleshooting Guide

Common issues and their solutions for the English Idioms Learning App.

---

## Firebase Issues

### Error: "Firebase configuration is invalid"

**Symptoms:**
- App shows error on load
- Console error mentions Firebase

**Solutions:**
1. Check `.env` file exists in root directory
2. Verify all 6 environment variables are set:
   ```
   REACT_APP_FIREBASE_API_KEY
   REACT_APP_FIREBASE_AUTH_DOMAIN
   REACT_APP_FIREBASE_PROJECT_ID
   REACT_APP_FIREBASE_STORAGE_BUCKET
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID
   REACT_APP_FIREBASE_APP_ID
   ```
3. Ensure no extra quotes or spaces in values
4. Restart dev server: Stop and run `npm start` again

---

### Error: "Firebase: Error (auth/unauthorized-domain)"

**Symptoms:**
- Can't sign in
- Console shows "unauthorized-domain"

**Solutions:**
1. Go to Firebase Console → Authentication → Settings
2. Under "Authorized domains", add:
   - `localhost` (for development)
   - Your deployed domain (e.g., `your-app.vercel.app`)
3. Save and try again

---

### Error: "Missing or insufficient permissions"

**Symptoms:**
- Can sign in but can't save progress
- Firestore read/write errors

**Solutions:**
1. Check Firestore security rules are published
2. Verify rules allow authenticated users:
   ```javascript
   match /users/{userId} {
     allow read, write: if request.auth != null && request.auth.uid == userId;
   }
   ```
3. Ensure you're signed in
4. Check Firebase Console → Firestore → Rules tab

---

## Authentication Issues

### Google Sign-In Not Working

**Symptoms:**
- Google button does nothing
- Popup closes immediately

**Solutions:**
1. Verify Google sign-in is enabled in Firebase Console
2. Add support email in Firebase → Authentication → Sign-in method → Google
3. Check authorized domains (see above)
4. Try in a different browser (Chrome recommended)
5. Clear browser cache and cookies

---

### Email Sign-Up Fails

**Symptoms:**
- "Email already in use" or validation errors

**Solutions:**
1. Verify Email/Password is enabled in Firebase
2. Password must be at least 6 characters
3. Email must be valid format
4. Check if account already exists - try logging in instead
5. Look for specific error message in red box

---

### Can't Log Out

**Symptoms:**
- Logout button doesn't work
- Still logged in after clicking logout

**Solutions:**
1. Check browser console for errors
2. Clear browser cache and cookies
3. Force logout by clearing localStorage:
   - Open browser DevTools (F12)
   - Go to Application/Storage tab
   - Click "Clear site data"
4. Refresh page

---

## Data & Content Issues

### No Idioms Showing / "Loading..." Forever

**Symptoms:**
- Dashboard shows loading spinner indefinitely
- Session screen empty

**Solutions:**
1. Check `src/data/idioms.json` exists
2. Validate JSON syntax:
   - No trailing commas
   - All quotes match
   - Proper brackets
3. Use online JSON validator: https://jsonlint.com
4. Check browser console for parse errors
5. Verify idioms array is not empty

---

### Sessions Show Wrong Number of Idioms

**Symptoms:**
- Session says "18 idioms" instead of 20

**Solutions:**
1. Count idioms in that session in `idioms.json`
2. Verify `"session": 1` field matches for all idioms
3. Check for duplicate IDs
4. Ensure session numbers are 1-15

---

### Questions Repeat Same Idiom

**Symptoms:**
- Same idiom appears multiple times
- Not 20 unique questions

**Solutions:**
1. Check for duplicate entries in `idioms.json`
2. Verify each session has 20 unique idioms
3. Clear browser cache and reload

---

## Text-to-Speech Issues

### Audio Buttons Don't Work

**Symptoms:**
- Clicking audio button does nothing
- No sound plays

**Solutions:**
1. Check browser compatibility:
   - ✅ Chrome/Edge: Best support
   - ✅ Safari: Good support
   - ⚠️ Firefox: May vary
2. Ensure browser isn't muted
3. Check site permissions allow audio
4. Try in Chrome if using another browser
5. Look for speaker icon in red (indicates not supported)

---

### Audio Sounds Robotic / Wrong Language

**Symptoms:**
- Voice sounds unnatural
- Speaks in wrong accent

**Solutions:**
1. This is a browser limitation
2. Chrome has the best voices
3. Check OS language settings
4. Try installing additional language packs
5. This is normal for Web Speech API - no server-side control

---

## UI/Display Issues

### Dark Theme Not Working / Looks Broken

**Symptoms:**
- White background instead of dark
- Colors look wrong

**Solutions:**
1. Ensure Tailwind CSS compiled correctly
2. Check `tailwind.config.js` exists
3. Restart dev server
4. Clear browser cache
5. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

---

### Layout Broken on Mobile

**Symptoms:**
- Text overlaps
- Buttons too small
- Horizontal scrolling

**Solutions:**
1. Check responsive design in DevTools
2. Zoom level should be 100%
3. Try different mobile device in DevTools
4. Clear cache and reload
5. Report with screenshot if issue persists

---

### Animations Not Smooth / Choppy

**Symptoms:**
- Laggy transitions
- Stuttering animations

**Solutions:**
1. Close other browser tabs
2. Disable browser extensions temporarily
3. Check CPU usage
4. Try in a different browser
5. This may be device performance limitation

---

## Progress Tracking Issues

### Progress Not Saving

**Symptoms:**
- Complete session but score doesn't save
- Dashboard still shows "Start" instead of completed

**Solutions:**
1. Verify you're signed in (check header for user name)
2. Check Firebase Console → Firestore for data
3. Look for errors in browser console
4. Ensure Firestore security rules allow writes
5. Check internet connection

---

### Progress Shows Wrong Score

**Symptoms:**
- Score doesn't match what you got
- Different score on refresh

**Solutions:**
1. This shouldn't happen - may be a bug
2. Check Firestore directly in Firebase Console
3. Try completing session again
4. Clear browser cache
5. Report issue with details

---

## Build & Deployment Issues

### `npm start` Fails

**Symptoms:**
- Error on running npm start
- Port already in use

**Solutions:**
1. Kill process on port 3000:
   - Windows: `npx kill-port 3000`
   - Mac/Linux: `lsof -ti:3000 | xargs kill`
2. Try different port: `PORT=3001 npm start`
3. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
4. Check Node version: `node -v` (need 14+)

---

### `npm run build` Fails

**Symptoms:**
- Build errors
- TypeScript errors (even though using JS)

**Solutions:**
1. Check all imports are correct
2. Ensure all files have correct file extensions
3. Delete `.cache` and `build` folders
4. Clear npm cache: `npm cache clean --force`
5. Reinstall dependencies

---

### Deployed App Shows Blank Page

**Symptoms:**
- Production site is blank
- Works locally but not on Vercel/Netlify

**Solutions:**
1. Check environment variables are set in hosting dashboard
2. Look at browser console for errors
3. Verify build was successful
4. Check deployment logs
5. Ensure all dependencies are in `package.json`

---

### Environment Variables Not Working in Production

**Symptoms:**
- Firebase errors in production only

**Solutions:**
1. Verify env vars set in hosting dashboard (Vercel/Netlify)
2. Redeploy after setting variables
3. Variable names must start with `REACT_APP_`
4. No quotes around values in hosting dashboard
5. Rebuild and redeploy

---

## Performance Issues

### App Loads Slowly

**Symptoms:**
- Takes more than 5 seconds to load

**Solutions:**
1. Check internet connection
2. Clear browser cache
3. Use production build: `npm run build`
4. Check Firebase location matches user location
5. This is normal on first load (downloading idioms data)

---

### Firebase Quota Exceeded

**Symptoms:**
- "Quota exceeded" error
- Can't read/write after many requests

**Solutions:**
1. Check Firebase Console → Usage
2. Wait 24 hours for quota reset (free tier)
3. Optimize queries if hitting limits
4. Upgrade to Firebase paid plan if needed
5. This shouldn't happen with normal use (<100 users/day)

---

## Getting Help

If none of these solutions work:

1. **Check Browser Console:**
   - Press F12
   - Look at Console tab
   - Note any red errors

2. **Check Firebase Console:**
   - Go to Firebase Console
   - Check Authentication, Firestore, and Usage tabs
   - Look for any warnings

3. **Document the Issue:**
   - What were you doing when it happened?
   - What did you expect to happen?
   - What actually happened?
   - Screenshot if possible
   - Browser console errors

4. **Where to Get Help:**
   - Check README.md for detailed docs
   - Review SETUP_GUIDE.md
   - Search similar issues online
   - Create GitHub issue with details

---

## Emergency Reset

If everything is broken and you want to start fresh:

```bash
# 1. Delete build artifacts
rm -rf node_modules build .cache

# 2. Clear npm cache
npm cache clean --force

# 3. Reinstall dependencies
npm install

# 4. Restart dev server
npm start

# 5. If still broken, check:
- .env file is correct
- Firebase is configured
- idioms.json is valid JSON
```

---

## Prevention Tips

To avoid common issues:

✅ Always commit code before major changes
✅ Test in multiple browsers regularly
✅ Keep dependencies updated: `npm update`
✅ Monitor Firebase usage weekly
✅ Validate JSON before replacing idioms.json
✅ Use version control (Git)
✅ Test after every major feature
✅ Keep `.env` backed up securely (not in Git!)

---

**Still stuck?** Create a GitHub issue with:
- Error message
- Steps to reproduce
- Screenshots
- Browser/OS info
- What you've already tried
