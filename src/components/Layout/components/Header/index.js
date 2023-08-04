import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Tippy from '@tippyjs/react';
import Image from '~/components/Image';
import image from '~/assest/image';
import 'tippy.js/dist/tippy.css'; // optional
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import {
    DarkMode,
    English,
    Favorites,
    FeedbackAndHelp,
    GetCoins,
    InboxIcon,
    KeyboardShotcuts,
    Logout,
    Settings,
    UploadIcon,
    ViewProfile,
} from '~/components/Icons';
import Search from '../Search';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <English />,
        title: 'Language',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'EN',
                    title: 'English',
                    children: {
                        title: 'Language',
                        data: [
                            {
                                code: 'EN',
                                title: 'US(United States)',
                            },
                            {
                                code: 'EN',
                                title: 'UK(United Kingdom)',
                            },
                        ],
                    },
                },
                {
                    code: 'VI',
                    title: 'Tiếng Việt(Việt Nam)',
                    children: {
                        title: 'Language',
                        data: [
                            {
                                code: 'VI',
                                title: 'Miền Bắc(Việt Nam)',
                            },
                            {
                                code: 'VI',
                                title: 'Miền Trung(Việt Nam)',
                            },
                            {
                                code: 'VI',
                                title: 'Miền Nam(Việt Nam)',
                            },
                        ],
                    },
                },
                {
                    code: 'VI',
                    title: 'Nederlands(Nederland)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    code: 'IN',
                    title: 'বাঙ্গালি (ভারত)',
                },
            ],
        },
    },

    {
        icon: <FeedbackAndHelp />,
        title: 'Feedback and help',
        to: '/feedback',
    },

    {
        icon: <KeyboardShotcuts />,
        title: 'Keyboard shortcuts',
    },

    {
        icon: <DarkMode />,
        title: 'Moon mode ',
    },
];
const userMenu = [
    {
        icon: <ViewProfile />,
        title: 'View Profile',
        to: '/@nhs',
    },

    {
        icon: <Favorites />,
        title: 'Favorites',
        to: '/favorite',
    },
    {
        icon: <GetCoins />,
        title: 'Get Coins',
        to: '/coin',
    },
    {
        icon: <Settings />,
        title: 'Settings',
        to: '/setting',
    },

    ...MENU_ITEMS,
    {
        icon: <Logout />,
        title: 'Log out',
        to: '/logout',
        separate: true,
    },
];

function Header() {
    const currentUser = false;

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to="/" className={cx('logo-link')}>
                        <img src={image.logo} alt="Tiktok" />
                    </Link>
                </div>

                <Search />

                <div className={cx('action')}>
                    {currentUser ? (
                        <>
                            <Button up>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className={cx('upload')}
                                />
                                Upload
                            </Button>
                            <Tippy content="Message">
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button up>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className={cx('upload')}
                                />
                                Upload
                            </Button>
                            <Button primary className={cx('custom-login')}>
                                Log in
                            </Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                alt="avatar"
                                src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/6688a592bb759458184d7c89bd2afa47~c5_100x100.jpeg?x-expires=1689930000&x-signature=tDbBEBlOE6a5GPQ9d3SNCCLmPWM%3D"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
