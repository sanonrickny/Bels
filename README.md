# Anniversary Scavenger Hunt 💕

A romantic, interactive React scavenger hunt website created for a 2-year anniversary celebration.

## 🎯 Features

- **7 Interactive Stages**: From riddles to puzzles, timers to password challenges
- **Romantic Design**: Beautiful pink and cream color scheme with handwritten fonts
- **Mobile Responsive**: Looks perfect on both desktop and mobile devices
- **Progress Saving**: Uses localStorage to save progress - no lost progress on refresh!
- **Smooth Animations**: Framer Motion animations and floating hearts
- **Confetti Celebration**: Special effects for the final stage

## 🗺️ Stage Overview

1. **Anniversary Letter** - Beautiful romantic letter introduction
2. **Where We Met** - Riddle about meeting at Zara
3. **First Date** - Question about Lido Bayside restaurant
4. **First "I Love You"** - Word scramble puzzle for "Superblue"
5. **Sweet Treat** - 3-minute timer patience test
6. **The Chain** - Password entry using secret code from Stage 4
7. **Final Celebration** - Photo gallery, confetti, and final rewards

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory:

   ```bash
   cd anniversary-scavenger-hunt
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser to `http://localhost:3000`

## 🎨 Customization

### Adding Photos

Replace the placeholder images in Stage 3 and Stage 7:

- Create an `src/assets/images` folder
- Add your photos and update the image paths in the components

### Changing Answers

Update the correct answers in each stage component:

- **Stage 2**: Change "zara" in `src/components/stages/Stage2.js`
- **Stage 3**: Change "lido bayside" in `src/components/stages/Stage3.js`
- **Stage 4**: Change "superblue" in `src/components/stages/Stage4.js`
- **Stage 6**: The password comes from Stage 4's secret code

### Modifying Text

All stage content can be found in `src/components/stages/` - edit any messages, riddles, or rewards as needed.

### Colors & Styling

The romantic color scheme is defined in `tailwind.config.js`. Update the `romantic` and `cream` color palettes to customize the theme.

## 📱 Mobile Optimization

The website is fully responsive and optimized for mobile devices. All interactions work perfectly on touch screens.

## 💾 Progress Saving

The app automatically saves progress to localStorage, including:

- Current stage number
- Generated secret codes
- Any user data

Progress persists across browser refreshes and sessions.

## 🛠️ Technical Details

- **React 18** with functional components and hooks
- **TailwindCSS** for styling with custom romantic theme
- **Framer Motion** for smooth animations
- **react-confetti** for celebration effects
- **localStorage** for progress persistence

## 🎁 Real-Life Integration

This scavenger hunt is designed to work with real-life surprises:

- Stage 2 & 5: Oreo cookies hidden in car
- Stage 6: Chain gift given in person
- Stage 7: Reese's candy hidden under seat

## 📦 Build for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `build` folder, ready for deployment.

## 💕 Personal Touch

This scavenger hunt tells the story of Rickny and his girlfriend's relationship:

- Meeting at Zara
- First date at Lido Bayside (found on TikTok)
- First "I love you" at Superblue on September 6th, 2023
- Their journey together at FIU (Finance & Computer Science)

---

**Happy Anniversary!** 🎉❤️
