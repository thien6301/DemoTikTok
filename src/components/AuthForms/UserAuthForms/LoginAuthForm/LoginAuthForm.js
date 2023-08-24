import classNames from 'classnames/bind';
import { useContext } from 'react';

import Button from '~/components/Button';
import styles from '../UserAuthForm.module.scss';

import { ModalContext } from '~/components/ModalProvider';
import {
    AppleIcon,
    FacebookIcon,
    GoogleIcon,
    InstagramIcon,
    KaKaoTalkIcon,
    LineIcon,
    QrIcon,
    TwitterIcon,
    ViewProfile,
    shareIcon,
} from '~/components/Icons';

const cx = classNames.bind(styles);

const loginList = {
    title: 'Log in to TikTok',
    contents: [
        {
            id: 1,
            icon: <QrIcon />,
            title: 'Use QR code',
            // disabled: true,
        },
        {
            id: 2,
            icon: <ViewProfile />,
            title: 'Use phone / email / username',
        },
        {
            id: 3,
            icon: <FacebookIcon />,
            title: 'Continue with Facebook',
            disabled: true,
        },
        {
            id: 4,
            icon: <GoogleIcon />,
            title: 'Continue with Google',
            disabled: true,
        },
        {
            id: 5,
            icon: <TwitterIcon />,
            title: 'Continue with Twitter',
            disabled: true,
        },
        {
            id: 6,
            icon: <LineIcon />,
            title: 'Continue with LINE',
            disabled: true,
        },
        {
            id: 7,
            icon: <KaKaoTalkIcon />,
            title: 'Continue with KakaoTalk',
            disabled: true,
        },
        {
            id: 8,
            icon: <AppleIcon />,
            title: 'Continue with Apple',
            disabled: true,
        },
        {
            id: 9,
            icon: <InstagramIcon />,
            title: 'Continue with Instagram',
            disabled: true,
        },
    ],
};

function LoginAuthForm() {
    const context = useContext(ModalContext);

    const handleSwitchForm = (id) => {
        if (id === 2) {
            context.handleChangeForm('loginform');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title-header')}>{loginList.title}</span>
            <div className={cx('list-button')}>
                {loginList.contents.map((item, index) => (
                    <Button
                        key={index}
                        but
                        className={cx('item-button')}
                        disabled={item.disabled}
                        onClick={() => handleSwitchForm(item.id)}
                    >
                        <span className={cx('icon')}>{item.icon}</span>
                        <span className={cx('title')}>{item.title}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default LoginAuthForm;
