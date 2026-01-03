# Launch Checklist

Use this checklist to ensure your English Idioms Learning App is ready for users.

## Pre-Launch Setup

### 1. Firebase Configuration ⚙️

- [ ] Created Firebase project
- [ ] Enabled Email/Password authentication
- [ ] Enabled Google sign-in authentication
- [ ] Added support email for Google sign-in
- [ ] Created Firestore database
- [ ] Published Firestore security rules
- [ ] Copied Firebase config to `.env` file
- [ ] Verified all 6 environment variables are set

**Verification**: Run `npm start` - app should load without Firebase errors

---

### 2. Idioms Data 📚

- [ ] Prepared 300 idioms in correct JSON format
- [ ] Verified each idiom has all required fields (id, expression, example, meaning, category, session)
- [ ] Organized into 15 sessions (20 idioms each)
- [ ] Assigned categories: "Daily Conversation", "Business", or "Academic"
- [ ] Replaced sample data in `src/data/idioms.json`
- [ ] Validated JSON syntax (no trailing commas, quotes correct)

**Verification**: Check browser console for JSON parse errors

---

### 3. Testing Phase 🧪

#### Authentication Tests
- [ ] Sign up with email/password works
- [ ] Login with email/password works
- [ ] Google sign-in works
- [ ] Logout works
- [ ] Protected routes redirect unauthenticated users
- [ ] User display name shows in header

#### Dashboard Tests
- [ ] All 15 sessions displayed
- [ ] Category filter buttons work
- [ ] Progress card shows correct statistics
- [ ] Session cards show correct status (Start vs Completed)
- [ ] Clicking session navigates to quiz

#### Quiz Session Tests
- [ ] Session loads 20 questions
- [ ] Idiom expression displays correctly
- [ ] Example sentence displays correctly
- [ ] Audio buttons play expressions
- [ ] Audio buttons play examples
- [ ] 4 answer choices appear (1 correct + 3 wrong)
- [ ] Selecting answer highlights it
- [ ] Submit button works
- [ ] Correct/incorrect feedback shows
- [ ] Next button advances to next question
- [ ] Progress indicator updates
- [ ] Exit button works with confirmation

#### Results Tests
- [ ] Score displays correctly
- [ ] Motivational message appears
- [ ] Progress bar animates
- [ ] Answer review shows all 20 questions
- [ ] Correct answers highlighted in green
- [ ] Incorrect answers highlighted in red
- [ ] Dashboard button navigates home
- [ ] Retry button restarts session
- [ ] Next Session button appears (if not session 15)

#### Progress Tracking Tests
- [ ] Completing session saves to Firestore
- [ ] Dashboard shows updated progress
- [ ] Session marked as completed
- [ ] Score persists after logout/login
- [ ] Progress percentage updates
- [ ] Average score calculates correctly

#### Responsive Design Tests
- [ ] Works on desktop (1920px)
- [ ] Works on laptop (1366px)
- [ ] Works on tablet (768px)
- [ ] Works on mobile (375px)
- [ ] All buttons clickable on mobile
- [ ] Text readable on all screen sizes

#### Browser Tests
- [ ] Works in Chrome
- [ ] Works in Safari
- [ ] Works in Firefox
- [ ] Works in Edge
- [ ] TTS works in primary browser

---

## Deployment Preparation

### 4. Code Quality 🔍

- [ ] No console errors in browser
- [ ] No console warnings (or all are expected)
- [ ] App loads in under 3 seconds
- [ ] Animations are smooth (60fps)
- [ ] No broken images
- [ ] All links work
- [ ] Loading spinners appear during async operations

### 5. Security Check 🔒

- [ ] `.env` file is in `.gitignore`
- [ ] No API keys in code
- [ ] Firestore rules allow only authenticated user data access
- [ ] No sensitive data logged to console

### 6. Build Test 🏗️

- [ ] Run `npm run build` successfully
- [ ] Build folder created
- [ ] No build errors or warnings
- [ ] Test built version locally (optional)

---

## Deployment

### 7. Deploy to Hosting 🚀

#### Option A: Vercel
- [ ] Created Vercel account
- [ ] Installed Vercel CLI or connected GitHub
- [ ] Deployed project
- [ ] Added environment variables in Vercel dashboard
- [ ] Verified deployment URL works
- [ ] Tested all features on deployed site

#### Option B: Netlify
- [ ] Created Netlify account
- [ ] Deployed build folder or connected GitHub
- [ ] Added environment variables in Netlify dashboard
- [ ] Verified deployment URL works
- [ ] Tested all features on deployed site

### 8. Post-Deployment Verification ✅

- [ ] App loads on deployed URL
- [ ] Authentication works on production
- [ ] Firestore reads/writes work
- [ ] TTS works (requires HTTPS)
- [ ] Mobile view works
- [ ] No mixed content warnings
- [ ] All features function as expected

---

## Documentation

### 9. GitHub Repository 📝

- [ ] Initialized git repository
- [ ] Created meaningful commits
- [ ] Pushed to GitHub
- [ ] README.md is complete
- [ ] Added screenshots (optional but recommended)
- [ ] Repository is public (if desired)

### 10. User Guide 👥

- [ ] SETUP_GUIDE.md complete
- [ ] README.md includes usage instructions
- [ ] Environment setup documented
- [ ] Troubleshooting section added

---

## Launch Day

### 11. Final Checks ✨

- [ ] Tested one complete user journey (signup → quiz → results)
- [ ] Firebase has sufficient quota for expected users
- [ ] Deployment URL is memorable (optional: set up custom domain)
- [ ] Shared URL with test users for feedback
- [ ] Monitoring/analytics set up (optional)

### 12. User Communication 📢

- [ ] Prepared launch announcement
- [ ] Created user instructions
- [ ] Set up support channel (email, GitHub issues)
- [ ] Ready to handle user feedback

---

## Post-Launch Monitoring

### 13. Week 1 Monitoring 📊

- [ ] Check Firebase usage daily
- [ ] Monitor for authentication issues
- [ ] Watch for Firestore quota warnings
- [ ] Collect user feedback
- [ ] Fix critical bugs immediately

### 14. Optimization (Ongoing) 🎯

- [ ] Review Firebase Analytics (if enabled)
- [ ] Optimize slow queries
- [ ] Address user-reported issues
- [ ] Plan feature enhancements

---

## Success Criteria

Your app is ready to launch when:

✅ All setup tasks complete
✅ All testing tasks pass
✅ Deployment successful
✅ No critical bugs
✅ Documentation complete

---

## Quick Reference

**Essential Commands:**
```bash
npm start          # Start dev server
npm run build      # Build for production
npm test           # Run tests (if added)
```

**Important Files:**
- `.env` - Firebase credentials
- `src/data/idioms.json` - Your idioms data
- `tailwind.config.js` - Theme customization

**Firebase Console:**
- Authentication: Monitor sign-ups
- Firestore: Check data structure
- Usage: Monitor quotas

---

## Need Help?

- Check README.md for detailed instructions
- Review SETUP_GUIDE.md for configuration help
- Check browser console for error messages
- Verify Firebase security rules
- Ensure environment variables are set correctly

---

**Estimated Time to Complete All Tasks:** 1-2 hours

**Good luck with your launch! 🚀**
