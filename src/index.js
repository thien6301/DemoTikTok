import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './components/GlobalStyle';
import ModalProvider from './components/ModalProvider/ModalProvider';
import LoginProvider from './components/LoginProvider/LoginProvider';

const root = ReactDOM.createRoot(document.getElementById('root')) ;
root.render(
    // <React.StrictMode>
        <GlobalStyles>
            <ModalProvider>
                <LoginProvider>
                    <App />
                </LoginProvider>
            </ModalProvider>
        </GlobalStyles>,
    {/* </React.StrictMode>, */}
   
);
