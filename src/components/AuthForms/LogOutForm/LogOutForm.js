import styles from './LogOutForm.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useContext } from 'react';
import { ModalContext } from '~/components/ModalProvider';
import { logoutService } from '~/services/LogOutService';
import { LoginContext } from '~/components/LoginProvider';

const cx = classNames.bind(styles);

function LogOutForm() {
    const contextModal = useContext(ModalContext);
    const contextLogin = useContext(LoginContext);

    const fetchApi = async () => {
        await logoutService();
        localStorage.removeItem('token');
        contextLogin.handleDeleteData();
    };

    return (
        <div
            className={cx('wrapper')}
            onClick={contextModal.handleHideModalLogOut}
        >
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <span>Are you sure you want to log out?</span>
                </div>
                <div className={cx('button-wrapper')}>
                    <Button
                        up
                        className={cx('button-cancel')}
                        onClick={contextModal.handleHideModalLogOut}
                    >
                        Cancel
                    </Button>
                    
                    <Button
                        outline
                        className={cx('button-cancel')}
                        onClick={fetchApi}
                    >
                        Log out
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default LogOutForm;
