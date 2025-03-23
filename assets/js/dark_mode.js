// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mode_toggle = document.getElementById("light-toggle");
    
    // Function to set theme
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem("theme", theme);
        
        // Update highlight theme
        const highlightThemeLight = document.getElementById('highlight_theme_light');
        const highlightThemeDark = document.getElementById('highlight_theme_dark');
        
        if (highlightThemeLight && highlightThemeDark) {
            if (theme === 'dark') {
                highlightThemeLight.media = 'none';
                highlightThemeDark.media = '';
            } else {
                highlightThemeLight.media = '';
                highlightThemeDark.media = 'none';
            }
        }
    }
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }

    // Add click handler for toggle
    if (mode_toggle) {
        mode_toggle.addEventListener("click", function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Add transition class
            document.documentElement.classList.add('transition');
            
            // Update theme
            setTheme(newTheme);
            
            // Remove transition class after animation
            setTimeout(() => {
                document.documentElement.classList.remove('transition');
            }, 300);
        });
    }
});

