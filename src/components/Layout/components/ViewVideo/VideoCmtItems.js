import classNames from 'classnames/bind';
import styles from './ViewVideoItems.module.scss';
import Image from '~/components/Image/Image';
import { TymIconMini } from '~/components/Icons';

const cx = classNames.bind(styles);

function VideoCmtItems({ result }) {
    return (
        <div className={cx('main-cmt')}>
            <div className={cx('comment-item')}>
                <Image src={result.user.avatar} className={cx('avatar')} />
                <div className={cx('body-cmt')}>
                    <h4 className={cx('fullname')}>
                        {result.user.first_name + ' ' + result.user.first_name}
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
                    <TymIconMini />
                    <span className={cx('tym-cmt')}>{result.likes_count}</span>
                </div>
            </div>
        </div>
    );
}

export default VideoCmtItems;
