import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { ModalContext } from '~/components/Contexts/ModalProvider';
import { LoginContext } from '~/components/Contexts/LoginModalContext';
import { getCurrentUser } from '~/services/getCurrentUserService';
import LogOutForm from '~/components/Modals/AuthModal/LogOutForm';
import MenuModalItem from '~/components/Modals/MenuModalItem';

import styles from './DefaultLayout.module.scss';
import { useContext, useEffect } from 'react';
import { CommentContext } from '~/components/Contexts/VideoModalContext';
import VideoModal from '~/components/Modals/VideoModal/VideoModal';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const contextModal = useContext(ModalContext);
    const contextLogin = useContext(LoginContext);
    const contextComment = useContext(CommentContext);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCurrentUser();
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
            {contextComment.isShow && (
                <VideoModal idVideo={contextComment.idVideoCurrent} />
            )}
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
