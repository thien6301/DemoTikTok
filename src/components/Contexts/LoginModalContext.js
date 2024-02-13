import { createContext, useContext, useState } from 'react';

import * as LoginService from '~/services/LoginService';
import { ModalContext } from './ModalProvider';

export const LoginContext = createContext();

function LoginProvider({ children }) {
    const [data, setData] = useState();
    const [showError, setShowError] = useState(false);
    const [isNotify, setIsNotify] = useState(false);
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
        if (result) {
            localStorage.setItem('token', result.meta.token);
            setIsNotify(true);
            setShowError(false);
            contentModal.handleHideModal();
        } else {
            setShowError(true);
        }
    };

    const value = {
        data,
        showError,
        isNotify,
        fetchApi,
        handleSetData,
        handleDeleteData,
    };
    return (
        <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
    );
}

export default LoginProvider;
