document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const hoursFirstDigit = document.querySelector('.hours .first .number');
    const hoursSecondDigit = document.querySelector('.hours .second .number');
    const minutesFirstDigit = document.querySelector('.minutes .first .number');
    const minutesSecondDigit = document.querySelector('.minutes .second .number');
    const secondsFirstDigit = document.querySelector('.seconds .first .number');
    const secondsSecondDigit = document.querySelector('.seconds .second .number');
    
    // Initialize previous time values
    let prevHours = -1;
    let prevMinutes = -1;
    let prevSeconds = -1;
    
    // Update the clock
    function updateClock() {
        const now = new Date();
        
        // Get current time
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // Format time values as two digits
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        
        // Update document title with current time
        document.title = `${formattedHours}:${formattedMinutes}:${formattedSeconds} - Digital Flip Clock`;
        
        // Update hours
        if (hours !== prevHours) {
            if (parseInt(formattedHours[0]) !== parseInt(hoursFirstDigit.textContent)) {
                flipDigit(hoursFirstDigit, formattedHours[0]);
                
                // Special effect at midnight
                if (hours === 0 && minutes === 0 && seconds === 0) {
                    midnightEffect();
                }
            }
            if (parseInt(formattedHours[1]) !== parseInt(hoursSecondDigit.textContent)) {
                flipDigit(hoursSecondDigit, formattedHours[1]);
            }
            prevHours = hours;
        }
        
        // Update minutes
        if (minutes !== prevMinutes) {
            if (parseInt(formattedMinutes[0]) !== parseInt(minutesFirstDigit.textContent)) {
                flipDigit(minutesFirstDigit, formattedMinutes[0]);
            }
            if (parseInt(formattedMinutes[1]) !== parseInt(minutesSecondDigit.textContent)) {
                flipDigit(minutesSecondDigit, formattedMinutes[1]);
            }
            prevMinutes = minutes;
        }
        
        // Update seconds
        if (seconds !== prevSeconds) {
            if (parseInt(formattedSeconds[0]) !== parseInt(secondsFirstDigit.textContent)) {
                flipDigit(secondsFirstDigit, formattedSeconds[0]);
            }
            if (parseInt(formattedSeconds[1]) !== parseInt(secondsSecondDigit.textContent)) {
                flipDigit(secondsSecondDigit, formattedSeconds[1]);
            }
            prevSeconds = seconds;
        }
        
        // Call updateClock again on the next frame
        requestAnimationFrame(updateClock);
    }
    
    // Function to flip a digit with animation
    function flipDigit(element, newValue) {
        // Create a clone of the current element
        const clone = element.cloneNode(true);
        clone.textContent = element.textContent;
        element.parentNode.appendChild(clone);
        
        // Add flip animation to the clone
        clone.classList.add('flip');
        
        // Play flip sound (subtle)
        playFlipSound();
        
        // After animation completes, remove clone and update original element
        setTimeout(() => {
            element.textContent = newValue;
            element.parentNode.removeChild(clone);
        }, 250);
    }
    
    // Function to play flip sound
    function playFlipSound() {
        // Only play sound if user has interacted with the page
        if (document.documentElement.hasAttribute('data-user-interacted')) {
            const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAeAAAUAAAYGBgYJCQkJDExMTFDQ0NDUFBQUFxcXFxpaWlpdXV1dYKCgoKPj4+PnJycnKioqKi1tbW1wcHBwc7Ozs7a2tra5+fn5/T09PT///8AAAA5TEFNRTMuMTAwAZYAAAAALnMAABRAJAXwTQABzAAAFABL/Lu9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=');
            audio.volume = 0.2;
            audio.play().catch(error => {
                // Silent error handling - some browsers restrict autoplay
            });
        }
    }
    
    // Special animation effect at midnight
    function midnightEffect() {
        const clockContainer = document.querySelector('.clock-container');
        clockContainer.classList.add('midnight-effect');
        
        setTimeout(() => {
            clockContainer.classList.remove('midnight-effect');
        }, 3000);
    }
    
    // Mark user interaction to enable sounds
    document.addEventListener('click', () => {
        document.documentElement.setAttribute('data-user-interacted', 'true');
    });
    
    // Add keyboard shortcuts for additional features
    document.addEventListener('keydown', (e) => {
        // 'F' key to toggle fullscreen
        if (e.key === 'f' || e.key === 'F') {
            toggleFullscreen();
        }
        // 'T' key to toggle theme
        if (e.key === 't' || e.key === 'T') {
            toggleTheme();
        }
    });
    
    // Toggle fullscreen mode
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }
    
    // Function to toggle theme
    function toggleTheme() {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('clockTheme', 'dark');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            localStorage.setItem('clockTheme', 'light');
        }
    }
    
    // Add display mode toggle button
    const clockContainer = document.querySelector('.clock-container');
    const toggleBtn = document.createElement('button');
    toggleBtn.classList.add('theme-toggle');
    toggleBtn.innerHTML = '🌓';
    toggleBtn.title = 'Toggle dark/light mode';
    
    // Fix theme toggle functionality
    toggleBtn.addEventListener('click', toggleTheme);
    
    clockContainer.appendChild(toggleBtn);
    
    // Add click-to-fullscreen functionality
    clockContainer.addEventListener('dblclick', toggleFullscreen);
    
    // Apply saved theme preference
    const savedTheme = localStorage.getItem('clockTheme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    } else if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    } else {
        // If no saved preference, check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    }
    
    // Add orientation change handler for better responsiveness
    window.addEventListener('orientationchange', () => {
        // Adjust layout after orientation change
        setTimeout(() => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }, 100);
    });
    
    // Set initial viewport height unit for better mobile experience
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Handle window resize for responsiveness
    window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    
    // Initialize clock on load
    updateClock();
}); 