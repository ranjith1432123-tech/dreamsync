document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Background Mouse Move
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        document.documentElement.style.setProperty('--mouse-x', `${x}%`);
        document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    });

    const form = document.getElementById('sleep-form');
    if (!form) return; // We are on the landing page, exit early

    const inputs = {
        caffeine: document.getElementById('caffeine'),
        screentime: document.getElementById('screentime'),
        exercise: document.getElementById('exercise'),
        sleepduration: document.getElementById('sleepduration'),
        stress: document.getElementById('stress'),
        alcohol: document.getElementById('alcohol'),
        consistency: document.getElementById('consistency')
    };
    
    const displays = {
        caffeine: document.getElementById('caffeine-val'),
        screentime: document.getElementById('screentime-val'),
        exercise: document.getElementById('exercise-val'),
        sleepduration: document.getElementById('sleepduration-val'),
        stress: document.getElementById('stress-val')
    };
    
    const scoreCircle = document.getElementById('score-circle');
    const scoreText = document.getElementById('score-text');
    const emojiFeedback = document.getElementById('emoji-feedback');
    const qualityText = document.getElementById('quality-text');
    const tipsList = document.getElementById('tips-list');
    const resetBtn = document.getElementById('reset-btn');

    // Setup Slider Fill Effect & Event Listeners
    const updateSliderFill = (slider) => {
        const min = parseFloat(slider.min) || 0;
        const max = parseFloat(slider.max) || 100;
        const val = parseFloat(slider.value);
        const percentage = ((val - min) / (max - min)) * 100;
        slider.style.setProperty('--range-progress', `${percentage}%`);
    };

    const attachListeners = () => {
        Object.keys(inputs).forEach(key => {
            const el = inputs[key];
            el.addEventListener('input', () => {
                if(displays[key]) {
                    displays[key].textContent = el.value;
                }
                if(el.type === 'range') {
                    updateSliderFill(el);
                }
                updatePrediction();
            });
            // Initial fill
            if(el.type === 'range') updateSliderFill(el);
        });
    };

    const calculateScore = () => {
        const caff = parseInt(inputs.caffeine.value);
        const screen = parseFloat(inputs.screentime.value);
        const exe = parseInt(inputs.exercise.value);
        const dur = parseFloat(inputs.sleepduration.value);
        const str = parseInt(inputs.stress.value);
        const alc = parseInt(inputs.alcohol.value);
        const cons = inputs.consistency.value;

        let score = 75; 

        if (caff > 200) score -= ((caff - 200) / 100) * 4;
        if (screen > 1) score -= (screen - 1) * 5;
        if (str > 5) score -= (str - 5) * 4;
        if (alc > 0) score -= alc * 5;
        if (dur < 7) score -= (7 - dur) * 7;
        if (dur > 9) score -= (dur - 9) * 3;
        
        if (exe >= 30 && exe <= 120) score += (exe / 30) * 3;
        if (cons === 'high') score += 8;
        if (cons === 'low') score -= 8;

        return Math.max(0, Math.min(100, Math.round(score)));
    };

    const generateTips = () => {
        const tips = [];
        const caff = parseInt(inputs.caffeine.value);
        const screen = parseFloat(inputs.screentime.value);
        const exe = parseInt(inputs.exercise.value);
        const dur = parseFloat(inputs.sleepduration.value);
        const str = parseInt(inputs.stress.value);
        const alc = parseInt(inputs.alcohol.value);

        if (caff > 200) tips.push(`At ${caff}mg of caffeine, your deep sleep is likely compromised. Try switching to decaf after 2 PM.`);
        if (screen > 1) tips.push(`Reducing screen time by just 30 mins can drastically improve your natural melatonin production.`);
        if (exe < 30) tips.push(`Try to reach at least 30 mins of exercise to help tire your body for deeper restorative sleep.`);
        if (dur < 7) tips.push(`You are in sleep debt. Prioritize going to bed earlier to hit the 7-9 hour sweet spot.`);
        if (str > 5) tips.push(`Stress is actively stealing your rest. A 5-minute breathing exercise in bed could help.`);
        if (alc > 0) tips.push(`Even ${alc} drink(s) will fragment your REM sleep. Stay hydrated before bed.`);
        if (inputs.consistency.value === 'low') tips.push('Inconsistent bedtimes confuse your circadian rhythm. Try to wake up at the exact same time every day.');

        if (tips.length === 0) tips.push("Incredible! Your habits are perfectly tuned for optimal recovery. Keep it up!");
        
        // Return max 4 most critical tips so UI doesn't overflow
        return tips.slice(0, 4);
    };

    const updateDashboard = (score, tips) => {
        let color = '';
        let emoji = '';
        let text = '';

        if (score >= 80) {
            color = 'var(--score-good)';
            emoji = '🌟';
            text = 'Excellent Sleep';
        } else if (score >= 60) {
            color = 'var(--score-avg)';
            emoji = '⚖️';
            text = 'Fair Sleep';
        } else {
            color = 'var(--score-poor)';
            emoji = '🚨';
            text = 'Poor Sleep';
        }

        // Update Circle instantaneously for real-time feel
        scoreText.textContent = score;
        scoreCircle.style.background = `conic-gradient(${color} ${score * 3.6}deg, rgba(255,255,255,0.05) 0deg)`;
        scoreCircle.style.boxShadow = `0 0 30px ${color}60`;
        scoreText.style.background = `linear-gradient(135deg, ${color}, #fff)`;
        scoreText.style.webkitBackgroundClip = 'text';

        emojiFeedback.textContent = emoji;
        qualityText.textContent = text;
        qualityText.style.color = color;
        
        // Update Tips with subtle animation
        tipsList.style.opacity = '0';
        setTimeout(() => {
            tipsList.innerHTML = '';
            tips.forEach(tip => {
                const li = document.createElement('li');
                li.innerHTML = tip;
                tipsList.appendChild(li);
            });
            tipsList.style.opacity = '1';
            tipsList.style.transition = 'opacity 0.3s ease';
        }, 150);
    };

    const updatePrediction = () => {
        const score = calculateScore();
        const tips = generateTips();
        updateDashboard(score, tips);
    };

    resetBtn.addEventListener('click', () => {
        inputs.caffeine.value = 200;
        inputs.screentime.value = 2;
        inputs.exercise.value = 30;
        inputs.sleepduration.value = 7;
        inputs.stress.value = 5;
        inputs.alcohol.value = 0;
        inputs.consistency.value = 'medium';

        Object.keys(displays).forEach(key => {
            displays[key].textContent = inputs[key].value;
        });

        Object.keys(inputs).forEach(key => {
            if(inputs[key].type === 'range') updateSliderFill(inputs[key]);
        });

        updatePrediction();
    });

    // Initialize
    attachListeners();
    updatePrediction();
    // Chatbot Logic
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatMessages = document.getElementById('chat-messages');

    if (chatToggleBtn) {
        chatToggleBtn.addEventListener('click', () => {
            chatWindow.style.display = 'flex';
            chatToggleBtn.style.display = 'none';
        });

        closeChatBtn.addEventListener('click', () => {
            chatWindow.style.display = 'none';
            chatToggleBtn.style.display = 'flex';
        });

        const getBotResponse = (input) => {
            const lowerInput = input.toLowerCase();
            if (lowerInput.includes('caffeine') || lowerInput.includes('coffee')) {
                return "Caffeine has a half-life of about 5 hours. Try to avoid it at least 6 hours before your desired bedtime!";
            } else if (lowerInput.includes('screen') || lowerInput.includes('phone') || lowerInput.includes('tv')) {
                return "The blue light from screens suppresses melatonin. Consider a digital sunset 1 hour before bed or use blue-light blocking glasses.";
            } else if (lowerInput.includes('stress') || lowerInput.includes('anxiety') || lowerInput.includes('worry')) {
                return "Stress is a major sleep disruptor. Try the 4-7-8 breathing method or write down your worries in a journal before getting into bed.";
            } else if (lowerInput.includes('alcohol') || lowerInput.includes('wine') || lowerInput.includes('beer')) {
                return "While alcohol might help you fall asleep faster, it significantly fragments your deep sleep and REM cycles. Limit intake close to bedtime.";
            } else if (lowerInput.includes('exercise') || lowerInput.includes('workout') || lowerInput.includes('gym')) {
                return "Regular exercise promotes better sleep, but try not to do vigorous workouts within 2 hours of bedtime, as it raises your core body temperature.";
            } else if (lowerInput.includes('can\'t sleep') || lowerInput.includes('insomnia') || lowerInput.includes('awake')) {
                return "If you can't fall asleep after 20 minutes, get out of bed and do a relaxing activity (like reading a physical book) in dim light until you feel sleepy.";
            } else if (lowerInput.includes('consistency') || lowerInput.includes('schedule') || lowerInput.includes('routine')) {
                return "Your circadian rhythm loves consistency! Try to wake up at the exact same time every day, even on weekends, to anchor your internal clock.";
            } else {
                const fallbacks = [
                    "That's interesting! The key to great sleep is consistency, cool temperatures, and a dark room. What specifically are you struggling with?",
                    "I see! Tell me more about your daily habits. Do you exercise or consume caffeine late in the day?",
                    "Got it. Getting quality sleep is a holistic process. Have you noticed any patterns in when you feel most tired?",
                    "Good to know! Just remember, winding down with a relaxing pre-bed routine can work wonders."
                ];
                return fallbacks[Math.floor(Math.random() * fallbacks.length)];
            }
        };

        const appendMessage = (text, isUser) => {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('message');
            msgDiv.classList.add(isUser ? 'user-message' : 'bot-message');
            msgDiv.textContent = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const handleSend = () => {
            const text = chatInput.value.trim();
            if (!text) return;
            
            appendMessage(text, true);
            chatInput.value = '';
            
            // Simulate bot typing delay
            setTimeout(() => {
                const response = getBotResponse(text);
                appendMessage(response, false);
            }, 600);
        };

        sendChatBtn.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }

});
