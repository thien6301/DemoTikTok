import { createContext, useContext, useState } from 'react';

import * as LoginService from '~/services/LoginService';
import { ModalContext } from './ModalProvider';
import { NotifyContextKey } from './NotifyContext';

export const LoginContext = createContext();

function LoginProvider({ children }) {
    const showNotify = useContext(NotifyContextKey);

    const [data, setData] = useState();
    const contentModal = useContext(ModalContext);

    const handleDeleteData = () => {
        setData(null);
    };

    const handleSetData = (data) => {
        setData(data);
    };

    const fetchApi = async (email, password) => {
        const result = await LoginService.loginService(email, password);
        setData(result.data);
        console.log(result);
        if (!result) {
            showNotify('Your username or passwork incorrect');
        } else {
            localStorage.setItem('token', result.meta.token);
            contentModal.handleHideModal();
            showNotify('Login Sucess');
        }
    };

    const value = {
        data,
        fetchApi,
        handleSetData,
        handleDeleteData,
    };
    return (
        <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
    );
}

export default LoginProvider;
