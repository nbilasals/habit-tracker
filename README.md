# 🎯 Daily Habit Tracker

A beautiful, feature-rich habit tracking web application built with vanilla HTML, CSS, and JavaScript. Track your daily habits, build streaks, visualize your progress, and achieve your goals!

## ✨ Features

### Core Features
- ✅ **Create Unlimited Habits** - Add as many habits as you want with custom names and colors
- 🎨 **6 Color Options** - Choose from vibrant colors to personalize each habit
- 📁 **6 Categories** - Organize habits: Health, Productivity, Mindfulness, Learning, Social, Other
- ☑️ **Daily Check-ins** - Mark habits as complete with satisfying checkboxes
- 🔥 **Streak Tracking** - Monitor current and longest streaks for motivation
- 📊 **Real-time Statistics** - View total habits, completion rate, and best streaks

### Visualization
- 📅 **Monthly Calendar View** - See your entire month at a glance with completion heatmap
- 📈 **Statistics Dashboard** - Detailed breakdown of each habit's performance
- 🎯 **Progress Bars** - Visual representation of completion rates
- 💯 **Completion Percentage** - Track your success rate per habit

### User Experience
- 🔍 **Filter by Category** - Focus on specific habit types
- 💾 **Auto-Save** - All data persists in browser localStorage
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🎉 **Toast Notifications** - Celebratory messages for completed habits
- 🌈 **Modern UI** - Beautiful gradient design with smooth animations

## 🚀 Getting Started

### Installation

1. **Download the files**
   ```
   habit-tracker/
   ├── index.html
   ├── style.css
   ├── script.js
   └── README.md
   ```

2. **Open in browser**
   - Simply double-click `index.html`
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```

3. **Start tracking!**
   - No installation or dependencies required
   - Works offline after first load
   - All data stored locally

## 📖 How to Use

### Creating Your First Habit

1. Click **"+ Add New Habit"** button
2. Enter habit details:
   - **Name**: What habit do you want to build? (e.g., "Drink 8 glasses of water")
   - **Category**: Choose from 6 categories
   - **Color**: Pick a color to represent this habit
3. Click **"Create Habit"**

### Daily Check-ins

1. Go to **Daily View** (default view)
2. Check off completed habits by clicking the checkbox
3. Watch your streak grow! 🔥
4. Unchecking a habit will update your streak accordingly

### Viewing Progress

**Daily View**
- See all your habits for today
- Check boxes to mark completion
- View current and best streaks for each habit

**Calendar View**
- Monthly overview with completion heatmap
- Green bars show daily completion percentage
- Navigate between months with arrow buttons
- Today's date is highlighted

**Statistics View**
- Detailed metrics for each habit
- Current streak and longest streak
- Total completed days
- Success rate percentage
- Days since habit creation

## 🎨 Features in Detail

### Streak System
- **Current Streak**: Consecutive days completed (resets on miss)
- **Longest Streak**: Your personal best
- **Auto-calculation**: Updates automatically based on completions

### Color Coding
Each habit can have its own color:
- 🔴 Red (`#FF6B6B`)
- 🔵 Teal (`#4ECDC4`)
- 💙 Blue (`#45B7D1`)
- 🟠 Orange (`#FFA07A`)
- 🟢 Mint (`#98D8C8`)
- 🟡 Yellow (`#F7DC6F`)

### Categories
- 🏃 **Health** - Exercise, diet, sleep habits
- 💼 **Productivity** - Work, study, time management
- 🧘 **Mindfulness** - Meditation, journaling, gratitude
- 📚 **Learning** - Reading, courses, skill development
- 👥 **Social** - Connecting with friends and family
- ⭐ **Other** - Any other habits

## 💾 Data Storage

All data is stored locally in your browser using `localStorage`:
- ✅ No account required
- ✅ No internet connection needed
- ✅ Data persists across sessions
- ⚠️ Clearing browser data will delete habits

### Backup Your Data

Your habit data is stored locally. To backup:
1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Copy the `habits` key value
4. Save to a text file

*Note: Export/Import feature can be added in future updates*

## 🎯 Usage Tips

### Building Habits Successfully

1. **Start Small** - Begin with 2-3 habits, not 20
2. **Be Specific** - "Exercise 30 minutes" is better than "Exercise"
3. **Daily Consistency** - Do it at the same time each day
4. **Track Honestly** - Only check off truly completed habits
5. **Review Weekly** - Check statistics to see progress

### Motivation Strategies

- 🔥 **Don't Break the Chain** - Focus on maintaining streaks
- 📊 **Review Stats** - Weekly review of your progress
- 🎯 **Set Goals** - Aim for 21 days (habit formation period)
- 🏆 **Celebrate Wins** - Acknowledge your longest streaks
- 📅 **Use Calendar** - Visual progress is motivating

## 📱 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Mobile browsers

**Requirements:**
- JavaScript enabled
- localStorage support (all modern browsers)

## Customization

### Changing Colors

Edit `style.css` to customize:
```css
/* Main gradient background */
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Primary button color */
.btn-primary {
    background: #4caf50;
}
```

### Adding More Categories

Edit `script.js` and `index.html`:
1. Add option to select dropdown
2. Add icon mapping in `getCategoryIcon()` function

##  Troubleshooting

**Habits not saving?**
- Check if localStorage is enabled
- Try a different browser
- Clear cache and reload

**Streaks not updating?**
- Streaks update when you check/uncheck habits
- Yesterday's habits must be checked for streak continuation

**Calendar not showing correct month?**
- Click Today in calendar view
- Reload the page

**Mobile display issues?**
- App is fully responsive
- Try landscape mode for better view
- Zoom out if needed

## 🚀 Future Enhancements

Possible features for v2.0:
- [ ] Import/Export habits to JSON
- [ ] Habit reminders/notifications
- [ ] Dark mode toggle
- [ ] Custom habit icons
- [ ] Habit notes/journal
- [ ] Weekly/yearly views
- [ ] Share progress images
- [ ] Multiple user profiles
- [ ] Habit templates
- [ ] Achievement badges

## Screenshoots
<img width="1895" height="875" alt="image" src="https://github.com/user-attachments/assets/3d8cdbb9-4919-4eb6-98a0-b15dd68c93ed" />

*Remember: "We are what we repeatedly do. Excellence, then, is not an act, but a habit." - Aristotle*
