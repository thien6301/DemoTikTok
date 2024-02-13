import classNames from 'classnames/bind';
import style from './Login.module.scss';
import {
    CloseIcon,
    FacebookIcon,
    GoogleIcon,
    InstagramIcon,
    KaKaoTalkIcon,
    LineIcon,
    QrIcon,
    TwitterIcon,
    ViewProfile,
} from '../../Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import LoginContent from '../../Popper/LoginContent';

const cx = classNames.bind(style);

function Login() {
    const LOGIN_ITEMS = [
        {
            icon: <QrIcon />,
            title: 'Use QR code',
            to: '/feedback',
        },
        {
            icon: <ViewProfile />,
            title: 'Use phone / email / username',
            to: '/feedback',
        },
        {
            icon: <FacebookIcon />,
            title: 'Continue with Facebook',
            to: '/feedback',
        },
        {
            icon: <GoogleIcon />,
            title: 'Continue with Google',
            to: '/feedback',
        },
        {
            icon: <TwitterIcon />,
            title: 'Continue with Twitter',
            to: '/feedback',
        },
        {
            icon: <LineIcon />,
            title: 'Continue with LINE',
            to: '/feedback',
        },
        {
            icon: <KaKaoTalkIcon />,
            title: 'Continue with KaKaoTalk',
            to: '/feedback',
        },
        {
            icon: <FontAwesomeIcon icon={faApple} />,
            title: 'Continue with Apple',
            to: '/feedback',
        },
        {
            icon: <InstagramIcon />,
            title: 'Feedback and Instagram',
            to: '/feedback',
        },
    ];

    return (
        <div className={cx('modal')}>
            <div className={cx('login-modal')}>
                <div className={cx('modal-container')}>
                    <div className={cx('modal-content')}>
                        <div className={cx('loginContainer')}>
                            <div className={cx('content-login')}>
                                <h2 className={cx('title-login')}>
                                    Log in to TikTok
                                </h2>

                                <div className={cx('method-login')}>
                                    <LoginContent items={LOGIN_ITEMS} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('policyConfirm')}>
                        <p className={cx('title-policy')}>
                            By continuing, you agree to TikTok’s{' '}
                            <a>Terms of Service</a> and confirm that you have
                            read TikTok’s <a>Privacy Policy</a>.
                        </p>
                    </div>
                    <div className={cx('footer')}>
                        <p className={cx('title-footer')}>
                            Don’t have an account?
                        </p>
                        <a>Sign up</a>
                    </div>
                </div>
                <div className={cx('close')}>
                    <CloseIcon className={cx('icon-close')} />
                </div>
            </div>
        </div>
    );
}

export default Login;
