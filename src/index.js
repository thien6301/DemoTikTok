import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './components/GlobalStyle';

import ModalProvider from './components/Contexts/ModalProvider';
import LoginProvider from './components/Contexts/LoginModalContext';
import ThemProvider from './components/ThemeProvider';
import CommentProvider from './components/Contexts/VideoModalContext';
import NotifyContextKey from './components/Contexts/NotifyContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>

    <NotifyContextKey>
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
        </GlobalStyles>
        ,
    </NotifyContextKey>,
    /* </React.StrictMode>, */
);
