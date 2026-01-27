// Default language
let currentLanguage = 'en';

// Function to update all text content based on selected language
function updateLanguage(lang) {
    if (!translations[lang]) {
        console.error('Language not supported:', lang);
        return;
    }

    // Update the current language and save preference
    currentLanguage = lang;
    localStorage.setItem('medmatch-language', lang);

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update language selector UI
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
            document.querySelector('.current-language span').textContent = option.textContent.trim();
        }
    });
}

// Initialize language based on saved preference or browser setting
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved language preference
    const savedLang = localStorage.getItem('medmatch-language');
    if (savedLang && translations[savedLang]) {
        currentLanguage = savedLang;
    } else {
        // Try to detect browser language
        const browserLang = navigator.language.split('-')[0];
        if (translations[browserLang]) {
            currentLanguage = browserLang;
        }
    }

    // Apply the language
    updateLanguage(currentLanguage);

    // Add event listeners to language options
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            updateLanguage(lang);
        });
    });
});