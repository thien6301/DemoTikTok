import { createContext, useState } from 'react';

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(false);

    const DarkMode = () => {
        document.querySelector('body').setAttribute('data-theme', 'dark');
        setIsDark(true);
    };
    const LightMode = () => {
        document.querySelector('body').setAttribute('data-theme', 'light');
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
