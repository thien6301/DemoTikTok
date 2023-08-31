import classNames from 'classnames/bind';
import styles from './share.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import Tippy from '@tippyjs/react/headless';
import ShareItems from './shareItems';

import {
    CopyLink,
    EmailIcon,
    Embed,
    LineIcon,
    Linkedln,
    PinterestIcon,
    Reddit,
    SendtoFriend,
    SharetoFacebook,
    SharetoWatchsApp,
    TelegramIcon,
    TwitterIcon,
} from '~/components/Icons';
import { useMemo, useState } from 'react';

const cx = classNames.bind(styles);
function Share({ children }) {
    const shareList = useMemo(
        () => [
            {
                showMore: true,
                // type: less,
                contents: [
                    {
                        icon: <Embed />,
                        title: 'Embed',
                    },
                    {
                        icon: <SendtoFriend />,
                        title: 'Send to Friend',
                    },
                    {
                        icon: <SharetoFacebook />,
                        title: 'Share to Facebook',
                    },
                    {
                        icon: <SharetoWatchsApp />,
                        title: 'Share to WatchsApp',
                    },
                    {
                        icon: <CopyLink />,
                        title: 'Copy Link',
                    },
                ],
            },
            {
                // type: more,
                contents: [
                    {
                        icon: <Embed />,
                        title: 'Embed',
                    },
                    {
                        icon: <SendtoFriend />,
                        title: 'Send to Friend',
                    },
                    {
                        icon: <SharetoFacebook />,
                        title: 'Share to Facebook',
                    },
                    {
                        icon: <SharetoWatchsApp />,
                        title: 'Share to WatchsApp',
                    },
                    {
                        icon: <CopyLink />,
                        title: 'Copy Link',
                    },
                    {
                        icon: <TwitterIcon />,
                        title: 'Share to Twitter',
                    },
                    {
                        icon: <Linkedln />,
                        title: 'Share to Linkedln',
                    },
                    {
                        icon: <Reddit />,
                        title: 'Share to Reddit',
                    },
                    {
                        icon: <TelegramIcon />,
                        title: 'Share to Telegram',
                    },
                    {
                        icon: <EmailIcon />,
                        title: 'Share to Email',
                    },
                    {
                        icon: <LineIcon />,
                        title: 'Share to LINE',
                    },
                    {
                        icon: <PinterestIcon />,
                        title: 'Share to Pinterest',
                    },
                ],
            },
        ],
        [],
    );

    const [resetForm, setResetForm] = useState(shareList)
    const handleReset = () => {
        setResetForm(shareList[0])

    }
    return (
        <Tippy
            delay={[0, 400]}
            offset={[-25, 5]}
            interactive
            placement="top-start"
            render={(attrs) => (
                <div className={cx('content')} tabIndex=" -1" {...attrs}>
                    <PopperWrapper>
                        <ShareItems items={resetForm} />
                    </PopperWrapper>
                </div>
            )}
            onHide={handleReset}
        >
            {children}
        </Tippy>
    );
}

export default Share;
