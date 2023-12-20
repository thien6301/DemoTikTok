import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import Image from '~/components/Image/Image';
import { TymIconMini, DotDotDotIcon, TrashCanIcon } from '~/components/Icons';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);

const menuItems = [
    {
        icon: <TrashCanIcon />,
        title: 'Delete',
    },
];
function VideoCmtItems({ result }) {
    return (
        <div className={cx('main-cmt')}>
            <div className={cx('comment-item')}>
                <Image src={result.user.avatar} className={cx('avatar')} />
                <div className={cx('body-cmt')}>
                    <h4 className={cx('fullname')}>
                        {result.user.first_name + ' ' + result.user.last_name}
                    </h4>
                    <p className={cx('cmt-text')}>{result.comment}</p>
                    <p className={cx('sub-cmt')}>
                        <span className={cx('time-cmt')}>
                            {result.created_at}
                        </span>
                        <span className={cx('reply-cmt')}>Reply</span>
                    </p>
                </div>
                <div className={cx('action-container')}>
                    <div className={cx('btn-delete')}>
                        <Menu items={menuItems}>
                            <span>
                                <DotDotDotIcon />
                            </span>
                        </Menu>
                    </div>
                    <div className={cx('like-container')}>
                        <TymIconMini />
                        <span className={cx('tym-cmt')}>
                            {result.likes_count}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoCmtItems;
