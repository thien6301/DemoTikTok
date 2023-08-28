import { createContext, useState } from 'react';

export const ModalContext = createContext();

function ModalProvider({ children }) {
    const body = document.body;

    const [active, setActive] = useState(false);
    const [activeLogOut, setActiveLogOut] = useState(false);
    const [typeForm, setTypeForm] = useState('login');

    const handleShowModalLogOut = () => {
        body.classList.add('hidden');
        setActiveLogOut(true);
    };

    const handleHideModalLogOut = () => {
        body.classList.remove('hidden');
        setActiveLogOut(false);
    };

    const handleShowModal = () => {
        body.classList.add('hidden');
        setActive(true);
    };
    const handleHideModal = () => {
        body.classList.remove('hidden');
        setActive(false);
    };

    const handleChangeForm = (form) => {
        setTypeForm(form);
    };

    const value = {
        active,
        activeLogOut,
        typeForm,
        handleShowModal,
        handleHideModal,
        handleChangeForm,
        handleShowModalLogOut,
        handleHideModalLogOut,
    };

    return (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    );
}

export default ModalProvider;
