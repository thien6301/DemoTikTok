import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './components/GlobalStyle';

import ModalProvider from './components/ModalProvider/ModalProvider';
import LoginProvider from './components/Contexts/LoginModalContext';
import ThemProvider from './components/ThemeProvider';
import CommentProvider from './components/Contexts/VideoModalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>

    <GlobalStyles>
        <ThemProvider>
            <ModalProvider>
                <LoginProvider>
                    <CommentProvider>
                        <App />
                    </CommentProvider>
                </LoginProvider>
            </ModalProvider>
        </ThemProvider>
    </GlobalStyles>,
    /* </React.StrictMode>, */
);
