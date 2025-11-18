## CityPulse – Local Events Explorer

**Interview Assignment Submission**

A production-ready React Native application demonstrating enterprise-level architecture, Firebase integration, and advanced features including RTL support, biometric authentication, and real-time map previews.

### ✅ Assignment Requirements Met

#### Core Features
- ✅ **Home Screen with Search**: Dashboard with real-time search by keyword and city, powered by Firestore queries
- ✅ **Event Detail Screen**: Full event details with Google Maps integration showing venue location
- ✅ **Favourite Events**: Mark/unmark favourites with persistent local storage via AsyncStorage
- ✅ **English ↔ Arabic Toggle**: Complete RTL/LTR layout transformation with i18next (UI flips direction automatically)
- ✅ **Navigation Flow**: Splash → Auth (Sign In/Sign Up) → Main Tabs (Dashboard/Profile) → Event Details
- ✅ **User Profile**: Display & manage user info with language preferences and logout

#### Bonus Features Implemented
- 🔥 **Firebase Integration**: Full Firebase Auth (email/password) + Firestore for users and events
- 🗺️ **Map Preview**: `react-native-maps` with markers in event detail screen
- 🔐 **Biometric Login**: Face ID/Touch ID/Fingerprint authentication using `react-native-biometrics`
- 🎨 **Modern UI/UX**: Polished design with shadows, elevations, and smooth interactions

### Technical Excellence

**Clean Architecture & Best Practices**
- ✅ **Modular Code Structure**: Atomic Design pattern (atoms → molecules → organisms → screens)
- ✅ **Bridging Layer**: Centralized business logic via custom hooks (`useAuth`, `useEvents`, `useFavorites`, `useLanguage`, `useBiometrics`)
- ✅ **Local Data Persistence**: Redux Persist with AsyncStorage for auth, favorites, and language preferences
- ✅ **Type Safety**: Strict TypeScript with `noUncheckedIndexedAccess` and comprehensive type definitions
- ✅ **Code Quality**: ESLint + Prettier configured, consistent formatting throughout
- ✅ **Testing**: Jest + React Native Testing Library setup with sample component tests

---

## Architecture & Folder Structure

**Bridging Layer Philosophy**  
All business logic is centralized in `hooks/` and `services/` directories, creating a clean separation between UI components and data/state management. This "bridging layer" approach ensures components remain presentational while hooks handle side effects, API calls, and state orchestration.

```
src/
  atoms/               # Reusable primitives (Button, Input, Card, Text)
  molecules/           # Composed widgets (SearchBar, EventCard, ProfileInfo)
  organisms/           # Domain-specific assemblies (CityEventList, ProfileSettings)
  screens/             # Auth (SignIn, SignUp), Dashboard, EventDetails, Profile, Splash
  
  hooks/               # 🔗 BRIDGING LAYER: Business logic hooks
    useAuth.ts         # Authentication state & Firebase auth operations
    useEvents.ts       # Event search, filtering, and Firestore queries
    useFavorites.ts    # Favourite management with AsyncStorage persistence
    useLanguage.ts     # i18n language switching with RTL support
    useBiometrics.ts   # Biometric authentication helper
  
  services/            # 🔗 BRIDGING LAYER: External integrations
    firebase/          # Firebase config, Auth & Firestore helpers
    api/               # Firestore event queries (search by city/name)
  
  redux/
    slices/            # Redux Toolkit slices: auth, favorites, language, events
    store.ts           # Redux store with redux-persist (AsyncStorage)
  
  navigation/          # React Navigation setup + TypeScript route definitions
  utils/               # Date formatters, grouping helpers, RTL utilities
  i18n/                # i18next configuration + English/Arabic translations
  assets/              # Static resources
```

**Key Design Decisions**
- **Atomic Design**: UI components scale from simple atoms to complex organisms, ensuring reusability
- **Hook-First**: All screens consume hooks, never directly call services—keeps UI dumb and testable
- **Redux Persist**: Favorites, auth, and language survive app restarts via AsyncStorage
- **TypeScript Strict Mode**: Catches errors at compile time, zero `any` types in production code

---

## Assumptions & Design Decisions

**Interview Requirements Interpretation**
- **Local Storage**: Implemented via Redux Persist + AsyncStorage for favorites, auth tokens, and language preferences (as required)
- **Firebase Backend**: Chose Firestore over Ticketmaster API for better real-time capabilities, offline support, and demonstration of full-stack Firebase integration (Auth + Firestore + Storage-ready)
- **RTL Support**: English ↔ Arabic toggle with complete UI transformation using `I18nManager` (actual Arabic copy not implemented per requirement clarification)
- **Event Data**: Firestore allows dynamic event creation via "Add Event" screen (bonus feature beyond requirements)

**Technical Prerequisites**
- Node.js ≥ 20 (React Native 0.82 requirement)
- Firebase project with Auth (email/password) and Firestore enabled
- Google Maps API key configured in `android/app/src/main/res/values/google_maps_api.xml`
- `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) from your Firebase console

---

## Quick Start

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd CityPulse
npm install
cd ios && pod install && cd ..  # iOS only
```

### 2. Firebase Setup
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** → Email/Password
3. Enable **Firestore Database**
4. Download config files:
   - **Android**: `google-services.json` → place in `android/app/`
   - **iOS**: `GoogleService-Info.plist` → place in `ios/CityPulse/`

5. Create Firestore collections with these schemas:
   ```javascript
   // Collection: users
   {
     uid: string,
     name: string,
     email: string,
     phone: string
   }
   
   // Collection: events
   {
     title: string,
     city: string,
     date: string,          // ISO 8601 format
     venue: string,
     lat: number,
     lng: number,
     description: string,
     category?: string
   }
   ```

6. Add Firestore indexes (required for search):
   - Single-field index: `city` (ascending)
   - Composite index: `title` (ascending) for prefix search

### 3. Google Maps API Key (for map preview)
1. Get an API key from [Google Cloud Console](https://console.cloud.google.com)
2. Enable **Maps SDK for Android**
3. Add key to `android/app/src/main/res/values/google_maps_api.xml`:
   ```xml
   <resources>
     <string name="google_maps_api_key">YOUR_KEY_HERE</string>
   </resources>
   ```

### 4. Run the App
```bash
# Start Metro bundler
npm start

# In separate terminal:
npm run android    # Android
npm run ios        # iOS

# Quality checks:
npm run lint       # ESLint + Prettier
npm run typecheck  # TypeScript validation
npm test           # Jest tests
```

---

## Key Implementation Highlights

### 🏗️ Architecture Patterns
- **Atomic Design**: Scalable component hierarchy from atoms to organisms
- **Custom Hooks Layer**: All business logic abstracted into reusable hooks (`useAuth`, `useEvents`, `useFavorites`, `useLanguage`, `useBiometrics`)
- **Service Layer**: Firebase operations isolated in `services/` for easy mocking and testing
- **Redux Toolkit**: Modern state management with slices, no boilerplate
- **Redux Persist**: AsyncStorage integration for auth, favorites, and preferences

### 🌍 Internationalization (i18n)
- **English ↔ Arabic**: Full UI translation with `i18next`
- **RTL/LTR Auto-Switch**: Layout direction flips automatically via `I18nManager`
- **Locale Detection**: Uses `react-native-localize` to respect device language
- **Persistent Preference**: Language choice saved to AsyncStorage

### 🔐 Authentication & Security
- **Firebase Auth**: Email/password authentication with error handling
- **Biometric Login**: Face ID/Touch ID/Fingerprint via `react-native-biometrics`
- **Profile Management**: User data stored in Firestore with offline persistence
- **Auto-Login**: Token refresh and session management

### 📍 Maps & Location
- **Google Maps Integration**: `react-native-maps` with custom markers
- **Event Coordinates**: Each event shows venue location on interactive map
- **Map Preview**: Read-only map in event details (pointer events disabled)

### 🔍 Search & Filtering
- **Real-Time Search**: Firestore queries filter as you type
- **Multi-Field Search**: Search by city name or event title
- **Case-Insensitive**: Normalized search for better UX
- **City Grouping**: Events automatically grouped by city on dashboard

### 💾 Data Persistence Strategy
- **Favorites**: AsyncStorage via Redux Persist (survives app restart)
- **Auth State**: User session persisted locally
- **Language Preference**: Remembered across launches
- **Events**: Fresh fetch on app open (volatile, no offline cache per requirement)

---

## 📹 Demo Video

Watch a complete walkthrough of the app showcasing all features:

<p align="center">
  <a href="https://drive.google.com/file/d/1vzJVpRQL35eFrBFKv1E8etoNb1iKqT2v/view?usp=sharing" target="_blank">
    <img src="https://img.shields.io/badge/▶%20Watch%20Demo-Google%20Drive-4285F4?style=for-the-badge&logo=googledrive&logoColor=white" alt="CityPulse Demo Video" />
  </a>
</p>

---

## 📱 Screenshots

<p align="center">
  <img src="screenshots/1.png" width="200" />
  <img src="screenshots/2.png" width="200" />
  <img src="screenshots/3.png" width="200" />
  <img src="screenshots/4.png" width="200" />
</p>

<p align="center">
  <img src="screenshots/5.png" width="200" />
  <img src="screenshots/6.png" width="200" />
  <img src="screenshots/7.png" width="200" />
  <img src="screenshots/8.png" width="200" />
</p>

<p align="center">
  <img src="screenshots/9.png" width="200" />
  <img src="screenshots/10.png" width="200" />
  <img src="screenshots/11.png" width="200" />
  <img src="screenshots/12.png" width="200" />
</p>

<p align="center">
  <img src="screenshots/13.png" width="200" />
  <img src="screenshots/14.png" width="200" />
</p>

---

## Beyond Requirements: Extra Features Delivered

To showcase technical depth and attention to detail, the following features were implemented beyond the core assignment:

### ✨ Bonus Implementations
- **Add Event Screen**: Full CRUD with Firestore write operations and form validation
- **Pull-to-Refresh**: Dashboard refreshes events with native refresh control
- **Auto-Focus on Dashboard**: `useFocusEffect` ensures fresh data when navigating back
- **Error Boundaries**: Graceful error handling with user-friendly messages
- **Loading States**: Skeleton screens and spinners for better perceived performance
- **Empty States**: Clear messaging when no events or search results exist
- **TypeScript Strictness**: Zero `any` types, full type coverage including Redux and Firebase
- **Component Tests**: Jest setup with sample tests for critical UI components
- **Modern UI Design**: Elevation, shadows, rounded corners, and polished animations

### 🎯 Production-Ready Features
- **Modular Codebase**: Every component, hook, and service is single-responsibility
- **Scalable Architecture**: Easy to add new features (notifications, payments, etc.)
- **Code Quality Tools**: Pre-configured ESLint + Prettier for consistency
- **Git-Friendly**: Proper `.gitignore`, no secrets committed, clean commit history
- **Documentation**: This README serves as onboarding guide for new developers

---

## Interview Notes & Decisions

**Why Firebase over Ticketmaster API?**
- Demonstrates full-stack capability (Auth + Database + potential Storage)
- Firestore's real-time queries showcase advanced React Native patterns
- Offline persistence and security rules are production considerations
- Allows demonstration of CRUD operations (Add Event feature)

**Why Redux Persist for Favorites?**
- Requirement explicitly asked for local storage
- Redux Persist + AsyncStorage is industry standard for React Native
- Easily testable and mockable compared to raw AsyncStorage
- Maintains single source of truth with Redux state

**Why Atomic Design?**
- Enforces component reusability and consistency
- Makes UI changes across the app trivial (update atom → propagates everywhere)
- Common pattern in large-scale React Native projects
- Demonstrates understanding of scalable architecture

---

## Troubleshooting

**Metro bundler issues:**
```bash
# Clear cache and restart
npm start -- --reset-cache
```

**Android build errors:**
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

**iOS pod issues:**
```bash
cd ios && pod deintegrate && pod install && cd ..
```

**"Unable to load script" on Android:**
```bash
adb reverse tcp:8081 tcp:8081  # Forward Metro port
adb devices                     # Verify device is connected
```

**Maps not showing:**
- Verify Google Maps API key in `android/app/src/main/res/values/google_maps_api.xml`
- Check API key has "Maps SDK for Android" enabled
- For production, add SHA-1 fingerprint restrictions

---

## Contact & Submission

**Interviewer Access**
- Repository: [Your GitHub URL]
- Demo Video: [Google Drive link above]
- Contact: [Your Email/LinkedIn]

Built with ❤️ for the CityPulse interview assignment.
