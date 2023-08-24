import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/components/Layout/components/Header';
import Sidebar from '../components/Sidebar';

import { ModalContext } from '~/components/ModalProvider'
import { LoginContext } from '~/components/LoginProvider'
import { getCurrentUserService } from '~/services/getCurrentUserService';


import { useContext, useEffect } from 'react';
import LogOutForm from '~/components/AuthForms/LogOutForm/LogOutForm';
import MenuModalItem from '~/components/MenuModalItem/MenuModalItem';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {

    const contextModal = useContext(ModalContext);
    const contextLogin = useContext(LoginContext);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCurrentUserService();
            if (result) {
                contextLogin.handleSetData(result);
            }
        };
        if (token) {
            fetchApi();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className={cx('wrapper')}>
            <Header />
            {contextLogin.isNotify && <span className={cx('notify')}>Login Success</span>}
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
                
            </div>
            {contextModal.activeLogOut && <LogOutForm />}
            {contextModal.active && <MenuModalItem />}
         
        </div>
    );
}

export default DefaultLayout;
