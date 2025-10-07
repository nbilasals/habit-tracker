// App State
let habits = [];
let currentView = 'daily';
let currentMonth = new Date();
let currentFilter = 'all';

// DOM Elements
const addHabitBtn = document.getElementById('addHabitBtn');
const habitModal = document.getElementById('habitModal');
const closeModal = document.querySelector('.close');
const cancelBtn = document.getElementById('cancelBtn');
const habitForm = document.getElementById('habitForm');
const habitsList = document.getElementById('habitsList');
const emptyState = document.getElementById('emptyState');
const viewBtns = document.querySelectorAll('.view-btn');
const categoryFilter = document.getElementById('categoryFilter');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadHabits();
    updateStats();
    renderHabits();
    displayCurrentDate();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    addHabitBtn.addEventListener('click', () => openModal());
    closeModal.addEventListener('click', () => closeModalHandler());
    cancelBtn.addEventListener('click', () => closeModalHandler());
    habitForm.addEventListener('submit', handleFormSubmit);
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.view));
    });
    
    categoryFilter.addEventListener('change', (e) => {
        currentFilter = e.target.value;
        renderHabits();
    });
    
    document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
    document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === habitModal) {
            closeModalHandler();
        }
    });
}

// Modal Functions
function openModal() {
    habitModal.classList.add('active');
}

function closeModalHandler() {
    habitModal.classList.remove('active');
    habitForm.reset();
}

// Handle Form Submit
function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('habitName').value;
    const category = document.getElementById('habitCategory').value;
    const color = document.querySelector('input[name="color"]:checked').value;
    
    const newHabit = {
        id: Date.now(),
        name,
        category,
        color,
        createdDate: new Date().toISOString().split('T')[0],
        completions: {},
        currentStreak: 0,
        longestStreak: 0
    };
    
    habits.push(newHabit);
    saveHabits();
    renderHabits();
    updateStats();
    closeModalHandler();
    showToast('Habit created successfully! 🎉');
}

// Render Habits
function renderHabits() {
    const filteredHabits = currentFilter === 'all' 
        ? habits 
        : habits.filter(h => h.category === currentFilter);
    
    if (filteredHabits.length === 0) {
        habitsList.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    const today = new Date().toISOString().split('T')[0];
    
    habitsList.innerHTML = filteredHabits.map(habit => {
        const isCompleted = habit.completions[today] || false;
        
        return `
            <div class="habit-card ${isCompleted ? 'completed' : ''}" style="border-left-color: ${habit.color}">
                <input 
                    type="checkbox" 
                    class="habit-checkbox" 
                    ${isCompleted ? 'checked' : ''}
                    onchange="toggleHabit(${habit.id})"
                >
                <div class="habit-info">
                    <div class="habit-name">${habit.name}</div>
                    <div class="habit-category">${getCategoryIcon(habit.category)} ${habit.category}</div>
                </div>
                <div class="habit-stats">
                    <div class="streak">
                        <div class="streak-number">🔥 ${habit.currentStreak}</div>
                        <div class="streak-label">Current</div>
                    </div>
                    <div class="streak">
                        <div class="streak-number">⭐ ${habit.longestStreak}</div>
                        <div class="streak-label">Best</div>
                    </div>
                </div>
                <div class="habit-actions">
                    <button class="btn-icon" onclick="deleteHabit(${habit.id})" title="Delete">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
}

// Toggle Habit
function toggleHabit(id) {
    const habit = habits.find(h => h.id === id);
    const today = new Date().toISOString().split('T')[0];
    
    habit.completions[today] = !habit.completions[today];
    
    // Update streaks
    updateStreaks(habit);
    
    saveHabits();
    renderHabits();
    updateStats();
    
    if (habit.completions[today]) {
        showToast('Great job! Keep it up! 💪');
    }
}

// Update Streaks
function updateStreaks(habit) {
    let streak = 0;
    let date = new Date();
    
    // Calculate current streak
    while (true) {
        const dateStr = date.toISOString().split('T')[0];
        if (habit.completions[dateStr]) {
            streak++;
            date.setDate(date.getDate() - 1);
        } else {
            break;
        }
    }
    
    habit.currentStreak = streak;
    
    // Update longest streak
    if (streak > habit.longestStreak) {
        habit.longestStreak = streak;
    }
}

// Delete Habit
function deleteHabit(id) {
    if (confirm('Are you sure you want to delete this habit?')) {
        habits = habits.filter(h => h.id !== id);
        saveHabits();
        renderHabits();
        updateStats();
        showToast('Habit deleted');
    }
}

// Update Statistics
function updateStats() {
    const today = new Date().toISOString().split('T')[0];
    
    // Total habits
    document.getElementById('totalHabits').textContent = habits.length;
    
    // Completed today
    const completedToday = habits.filter(h => h.completions[today]).length;
    document.getElementById('todayComplete').textContent = completedToday;
    
    // Completion rate
    const rate = habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;
    document.getElementById('completionRate').textContent = rate + '%';
    
    // Longest streak
    const longestStreak = habits.length > 0 
        ? Math.max(...habits.map(h => h.longestStreak)) 
        : 0;
    document.getElementById('longestStreak').textContent = longestStreak;
}

// Switch View
function switchView(view) {
    currentView = view;
    
    // Update buttons
    viewBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    // Show/hide views
    document.getElementById('dailyView').classList.toggle('hidden', view !== 'daily');
    document.getElementById('calendarView').classList.toggle('hidden', view !== 'calendar');
    document.getElementById('statsView').classList.toggle('hidden', view !== 'stats');
    
    // Render appropriate view
    if (view === 'calendar') {
        renderCalendar();
    } else if (view === 'stats') {
        renderStats();
    }
}

// Calendar Functions
function renderCalendar() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Update month display
    document.getElementById('calendarMonth').textContent = 
        new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const calendarGrid = document.getElementById('calendarGrid');
    let html = '';
    
    // Day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        html += `<div class="calendar-day header">${day}</div>`;
    });
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        html += `<div class="calendar-day other-month">${day}</div>`;
    }
    
    // Current month days
    const today = new Date().toISOString().split('T')[0];
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = dateStr === today;
        
        // Calculate completion for this day
        const completed = habits.filter(h => h.completions[dateStr]).length;
        const total = habits.length;
        const percentage = total > 0 ? (completed / total) * 100 : 0;
        
        html += `
            <div class="calendar-day ${isToday ? 'today' : ''}">
                <div class="day-number">${day}</div>
                <div class="day-completion">
                    <div class="day-completion-bar" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    }
    
    // Next month days
    const remainingDays = 42 - (firstDay + daysInMonth);
    for (let day = 1; day <= remainingDays; day++) {
        html += `<div class="calendar-day other-month">${day}</div>`;
    }
    
    calendarGrid.innerHTML = html;
}

function changeMonth(direction) {
    currentMonth.setMonth(currentMonth.getMonth() + direction);
    renderCalendar();
}

// Statistics View
function renderStats() {
    const statsList = document.getElementById('statsList');
    
    if (habits.length === 0) {
        statsList.innerHTML = '<div class="empty-state"><p>No habits to show statistics for</p></div>';
        return;
    }
    
    statsList.innerHTML = habits.map(habit => {
        // Calculate statistics
        const totalDays = Object.keys(habit.completions).length;
        const completedDays = Object.values(habit.completions).filter(v => v).length;
        const completionRate = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
        
        // Calculate days since creation
        const createdDate = new Date(habit.createdDate);
        const today = new Date();
        const daysSinceCreation = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24)) + 1;
        
        return `
            <div class="stat-habit-card" style="border-left-color: ${habit.color}">
                <div class="stat-habit-header">
                    <div>
                        <div class="stat-habit-name">${habit.name}</div>
                        <div class="stat-habit-category">${getCategoryIcon(habit.category)} ${habit.category}</div>
                    </div>
                </div>
                
                <div class="stat-metrics">
                    <div class="metric">
                        <div class="metric-value">${habit.currentStreak}</div>
                        <div class="metric-label">Current Streak</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${habit.longestStreak}</div>
                        <div class="metric-label">Best Streak</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${completedDays}</div>
                        <div class="metric-label">Total Completed</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${completionRate}%</div>
                        <div class="metric-label">Success Rate</div>
                    </div>
                </div>
                
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${completionRate}%"></div>
                </div>
                
                <div style="text-align: center; margin-top: 10px; color: #666; font-size: 0.9rem;">
                    Tracking for ${daysSinceCreation} days
                </div>
            </div>
        `;
    }).join('');
}

// Helper Functions
function getCategoryIcon(category) {
    const icons = {
        health: '🏃',
        productivity: '💼',
        mindfulness: '🧘',
        learning: '📚',
        social: '👥',
        other: '⭐'
    };
    return icons[category] || '⭐';
}

function displayCurrentDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = today.toLocaleDateString('en-US', options);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// LocalStorage Functions
function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

function loadHabits() {
    const stored = localStorage.getItem('habits');
    if (stored) {
        habits = JSON.parse(stored);
        
        // Update streaks for all habits
        habits.forEach(habit => updateStreaks(habit));
        saveHabits();
    }
}

// Export/Import Functions (Bonus Feature)
function exportHabits() {
    const dataStr = JSON.stringify(habits, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `habits-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    showToast('Habits exported! 📥');
}

// Reset all habits (Clear all data)
function resetAllHabits() {
    if (confirm('⚠️ This will delete ALL habits and data. Are you sure?')) {
        if (confirm('This action cannot be undone. Continue?')) {
            habits = [];
            saveHabits();
            renderHabits();
            updateStats();
            showToast('All habits cleared');
        }
    }
}