# 📘 Word of the Day App

A modern React Native mobile app built with Expo Router that displays a "Word of the Day" using a real dictionary API. Users can view definitions, example sentences, and browse word history — all persisted locally.

---

## ✨ Features

- 🎯 Displays a **random word** with a definition and example sentence
- 📜 **History screen** with previously viewed words and dates
- 🗃️ Uses **AsyncStorage** to persist data between sessions
- 🔄 Tap "New Word" to fetch another random word
- 🧼 Clear the entire history with one button
- 🎨 Clean, modern, mobile-friendly UI

---

## Hosted using Expo EAS.
  📱 **Run in Web**:  
 Open this URL to access the app:

 https://wordofthedayapp--jahin.expo.app/

---

## 🚀 Installation & Running

### 📦 Prerequisites

- Node.js ≥ 16.x
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Android Studio or Xcode (for simulators)
- Git (optional)

---

### 🛠️ Steps

1. **Clone the project**
   ```bash
   git clone https://github.com/your-username/word-of-the-day-app.git
   cd word-of-the-day-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device or emulator**
   - Press `i` to open in iOS simulator
   - Press `a` for Android emulator
   - Or scan the QR code with Expo Go on your phone

---

## 🌐 API Used

We fetch truly random words and definitions using:

1. **[Random Word API](https://random-word-api.herokuapp.com/)**
   - Example: `https://random-word-api.herokuapp.com/word`

2. **[Free Dictionary API](https://dictionaryapi.dev/)**
   - Example: `https://api.dictionaryapi.dev/api/v2/entries/en/<word>`

⚠️ No API key needed.

---


## 🛠️ Tech Stack

- React Native + Expo
- TypeScript
- Expo Router
- React Navigation
- AsyncStorage (via `@react-native-async-storage/async-storage`)

---


## 📄 License

MIT © Jahinislit
