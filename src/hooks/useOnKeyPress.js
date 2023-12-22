import { useEffect } from 'react';

export const useOnKeyPress = (callback, targetKey) => {
    useEffect(() => {
        const keyPressHandle = (event) => {
            if (event.key === targetKey) {
                callback();
            }
        };
        window.addEventListener('keydown', keyPressHandle);
        return () => {
            window.removeEventListener('keydown', keyPressHandle);
        };
    }, [callback, targetKey]);
};
