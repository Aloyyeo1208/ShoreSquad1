document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Initialize components
    setupEventListeners();
    animateStats();
    setupJoinButtons();
}

function setupEventListeners() {
    // Navigation handling
    const navItems = document.querySelectorAll('.nav-item, .nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function animateStats() {
    // Animate stats when they come into view
    const stats = document.querySelectorAll('.stat-card h2');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                animateValue(target, 0, finalValue, 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        obj.textContent = currentValue;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function setupJoinButtons() {
    // Handle join squad button clicks
    const joinButtons = document.querySelectorAll('.join-btn');
    joinButtons.forEach(button => {
        button.addEventListener('click', handleJoinSquad);
    });
}

function handleJoinSquad(e) {
    const button = e.target;
    const eventCard = button.closest('.event-card');
    const eventTitle = eventCard.querySelector('h3').textContent;
    
    // Toggle button state
    if (button.classList.contains('joined')) {
        button.textContent = 'Join Squad';
        button.classList.remove('joined');
    } else {
        button.textContent = 'Joined ✓';
        button.classList.add('joined');
        
        // Show confirmation message
        showNotification(`You've joined ${eventTitle}! See you there! 🌊`);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Notification styles for feedback
const style = document.createElement('style');
style.textContent = `
.notification {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: #4A90E2;
    color: #fff;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s, bottom 0.3s;
    z-index: 9999;
}
.notification.show {
    opacity: 1;
    bottom: 100px;
    pointer-events: auto;
}`;
document.head.appendChild(style);

// Optionally, expose functions for other scripts
window.shoreSquadApp = {
    initializeApp,
    setupEventListeners,
    animateStats,
    setupJoinButtons
};