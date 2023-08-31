import classNames from 'classnames/bind';

import Button from '~/components/Button';
import {
    DownExpandIcon,
    FacebookIcon,
    GoogleIcon,
    KaKaoTalkIcon,
    LineIcon,
    TwitterIcon,
    ViewProfile,
} from '~/components/Icons';
import styles from '../UserAuthForm.module.scss';
import { useMemo, useState } from 'react';

const cx = classNames.bind(styles);

function RegisterAuthForm() {
    const registerList = useMemo(
        () => [
            {
                showMore: true,
                title: 'Sign up for TikTok',
                contents: [
                    {
                        icon: <ViewProfile />,
                        title: 'Use phone or email',
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
                ],
            },
            {
                title: 'Sign up for TikTok',
                contents: [
                    {
                        icon: <ViewProfile />,
                        title: 'Use phone or email',
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
            },
        ],
        [],
    );

    const [formType, setFormType] = useState(registerList[0]);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title-header')}>{formType.title}</span>
            <div className={cx('list-button')}>
                {formType.contents.map((item, index) => (
                    <Button
                        disabled={item.disabled}
                        key={index}
                        className={cx('item-button')}
                    >
                        <span className={cx('icon')}>{item.icon}</span>
                        <span className={cx('title')}>{item.title}</span>
                    </Button>
                ))}
                {formType.showMore && (
                    <div
                        className={cx('more-btn')}
                        onClick={() => setFormType([1])}
                    >
                        <DownExpandIcon />
                    </div>
                )}
            </div>
        </div>
    );
}

export default RegisterAuthForm;
