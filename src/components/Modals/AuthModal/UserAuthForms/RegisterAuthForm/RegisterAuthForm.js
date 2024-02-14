import classNames from 'classnames/bind';

import Button from '~/components/Button';
import {
    FacebookIcon,
    GoogleIcon,
    KaKaoTalkIcon,
    LineIcon,
    TwitterIcon,
    ViewProfile,
} from '~/components/Icons';
import styles from '../UserAuthForm.module.scss';
import { useContext } from 'react';
import RegisterWithEmail from '../../RegisterFrom/RegisterFrom';
import { ModalContext } from '~/components/Contexts/ModalProvider';

const cx = classNames.bind(styles);

function RegisterAuthForm() {
    const registerList = {
        title: 'Sign up for TikTok',
        contents: [
            {
                icon: <ViewProfile />,
                title: 'Use phone or email',
                id: 1,
            },
            {
                icon: <FacebookIcon />,
                title: 'Continue with Facebook',
                disabled: true,
            },
            {
                icon: <GoogleIcon />,
                title: 'Continue with Google',
                disabled: true,
            },
            {
                icon: <TwitterIcon />,
                title: 'Continue with Twitter',
                disabled: true,
            },
            {
                icon: <LineIcon />,
                title: 'Continue with LINE',
                disabled: true,
            },
            {
                icon: <KaKaoTalkIcon />,
                title: 'Continue with KakaoTalk',
                disabled: true,
            },
        ],
    };

    const context = useContext(ModalContext);

    const handleSwitchForm = (id) => {
        if (id === 1) {
            context.handleChangeForm('registerform');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <span className={cx('title-header')}>{registerList.title}</span>
            <div className={cx('list-button')}>
                {registerList.contents.map((item, index) => (
                    <Button
                        disabled={item.disabled}
                        key={index}
                        className={cx('item-button')}
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

export default RegisterAuthForm;
