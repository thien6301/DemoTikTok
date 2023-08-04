import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);
function AccountPreview({ data }) {
    return (
        <div className={cx('wrapper')}>
            {/* <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    src={data.avatar}
                    alt={data.nickname}
                />
                <div>
                    <Button primary>Follow</Button>
                </div>
            </div>
            <div className={cx('body')}>
                <p className={cx('nick-name')}>
                    <strong>{data.nickname}</strong>
                    {data.tick && (
                        <FontAwesomeIcon
                            className={cx('check')}
                            icon={faCheckCircle}
                        />
                    )}
                </p>
                <p className={cx('name')}>
                    {data.first_name + ' ' + data.last_name}
                </p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>
                        {data.followers_count}
                    </strong>
                    <span className={cx('lable')}>Follower</span>
                    <strong className={cx('value')}>{data.likes_count}</strong>
                    <span className={cx('lable')}>Like</span>
                </p>
            </div> */}
        </div>
    );
}
AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountPreview;
