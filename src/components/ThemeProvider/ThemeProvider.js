import { createContext, useState } from 'react';

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(false);

    const DarkMode = () => {
        document.querySelector('body').setAttribute('data-theme', 'dark');
        localStorage.setItem('selectedTheme','dark')
        setIsDark(true);
    };
    const LightMode = () => {
        document.querySelector('body').setAttribute('data-theme', 'light');
        localStorage.setItem('selectedTheme','light')
        setIsDark(false);
    };
    

    const value = {
        isDark,
        DarkMode,
        LightMode,
    };
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

export default ThemeProvider;
