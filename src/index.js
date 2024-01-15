import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './components/GlobalStyle';

import ModalProvider from './components/ModalProvider/ModalProvider';
import LoginProvider from './components/LoginProvider/LoginProvider';
import ThemProvider from './components/ThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>

    <GlobalStyles>
        <ThemProvider>
            <ModalProvider>
                <LoginProvider>
                    <App />
                </LoginProvider>
            </ModalProvider>
        </ThemProvider>
    </GlobalStyles>,
    /* </React.StrictMode>, */
);
