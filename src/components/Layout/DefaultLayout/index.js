import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { ModalContext } from '~/components/ModalProvider';
import { LoginContext } from '~/components/LoginProvider';
import { getCurrentUserService } from '~/services/getCurrentUserService';
import LogOutForm from '~/components/AuthForms/LogOutForm';
import MenuModalItem from '~/components/MenuModalItem';

import styles from './DefaultLayout.module.scss';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const ck = useParams('id');
    console.log(ck);
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
                <span className={cx('notify')}>Login Success</span>
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

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
