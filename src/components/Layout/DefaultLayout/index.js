import PropTypes from 'prop-types';
import MenuModalItem from '~/components/MenuModalItem';
import { getCurrentUserService } from '~/services/getCurrentUserService';
import LogOutForm from '~/components/AuthForms/LogOutForm';

import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import { useContext, useEffect } from 'react';

import Header from '~/components/Layout/components/Header';
import Sidebar from '../components/Sidebar';
import { ModalContext } from '~/components/ModalProvider';
import { LoginContext } from '~/components/LoginProvider';

// import Login from '~/components/Login';

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

            {contextLogin.isNotify && (
                <section>
                    <div className={cx('notify-wrapper')}>
                        <p className={cx('notify')}>Login Success</p>
                    </div>
                </section>
            )}

            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>

            {contextModal.activeLogOut && <LogOutForm />}
            {contextModal.active && <MenuModalItem />}
        </div>
    );
}
DefaultLayout.propsType = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
