import classNames from 'classnames/bind';
import styles from './SidebarDefaule.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function SidebarDefault() {
    return (
        <div className="wrapper">
            <div className={cx('content')}>
                <p className={cx('title')}>
                    Log in to follow creators, like videos, and view comments.
                </p>
                <Button outline large className={cx('title-login')}>Log in</Button>
            </div>
            <div className={cx('place-holder')}></div>
        </div>
    );
}

export default SidebarDefault;
