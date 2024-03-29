import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <a
                    style={{ margin: '5px 6px 0 0' }}
                    href="https://www.tiktok.com/about?lang=en"
                >
                    {' '}
                    About
                </a>
                <a
                    style={{ margin: '5px 3px 0 0' }}
                    href="https://www.tiktok.com/about?lang=en"
                >
                    {' '}
                    Newsrom
                </a>
                <a
                    style={{ margin: '5px 4px 0 0' }}
                    href="https://www.tiktok.com/about?lang=en"
                >
                    {' '}
                    Contact
                </a>
                <a
                    style={{ margin: '5px 6px 0 0' }}
                    href="https://www.tiktok.com/about?lang=en"
                >
                    {' '}
                    Careers
                </a>
                <a
                    style={{ margin: '5px 6px 0 0' }}
                    href="https://www.tiktok.com/about?lang=en"
                >
                    {' '}
                    ByteDance
                </a>
            </div>
            <div className={cx('title')}>
                <a
                    style={{ margin: '5px 6px 0 0' }}
                    href="https://www.tiktok.com/about?lang=en"
                >
                    {' '}
                    TikTok for Good
                </a>
                <a
                    style={{ margin: '5px 6px 0 0' }}
                    href="https://www.tiktok.com/about?lang=en"
                >
                    {' '}
                    Advertis
                </a>
                <a
                    style={{ margin: '5px 6px 0 0' }}
                    href="https://www.tiktok.com/about?lang=en"
                >
                    {' '}
                    Deverlopers
                </a>
                <a
                    style={{ margin: '5px 6px 0 0' }}
                    href="https://www.tiktok.com/about?lang=en"
                >
                    {' '}
                    Transparency
                </a>
                <a
                    style={{ margin: '5px 6px 0 0' }}
                    href="https://www.tiktok.com/about?lang=en"
                >
                    {' '}
                    TikTok Rewards
                </a>
                <a
                    style={{ margin: '5px 6px 0 0' }}
                    href="https://www.tiktok.com/about?lang=en"
                >
                    {' '}
                    TikTok Embeds
                </a>
            </div>
            <div className={cx('title')}>
                <a
                    style={{ margin: '5px 6px 0 0' }}
                    href="https://www.tiktok.com/about?lang=en"
                >
                    {' '}
                    Help
                </a>
                <a
                    style={{ margin: '5px 6px 0 0' }}
                    href="https://www.tiktok.com/about?lang=en"
                >
                    {' '}
                    Safety
                </a>
                <a
                    style={{ margin: '5px 6px 0 0' }}
                    href="https://www.tiktok.com/about?lang=en"
                >
                    {' '}
                    Terms
                </a>
                <a
                    style={{ margin: '5px 20px 0 0' }}
                    href="https://www.tiktok.com/about?lang=en"
                >
                    {' '}
                    Priacy
                </a>
                <a
                    style={{ margin: '5px 6px 0 0' }}
                    href="https://www.tiktok.com/about?lang=en"
                >
                    {' '}
                    Creater Potal
                </a>
                <a
                    style={{ margin: '5px 6px 10px 0' }}
                    href="https://www.tiktok.com/about?lang=en"
                >
                    {' '}
                    Community Guidelines
                </a>
            </div>
            <a style={{ color: 'gray' }}>@ 2023 TikTok</a>
        </div>
    );
}

export default Footer;
