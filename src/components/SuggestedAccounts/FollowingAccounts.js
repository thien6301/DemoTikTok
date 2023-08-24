import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import PropTypes from 'prop-types';
import AccountItems from './AccountItems';

const cx = classNames.bind(styles);
function FollowingAccounts({ data = [], lable, onSeeMore }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('lable')}>{lable}</p>

            {data.map((account) => (
                <AccountItems key={account.id} data={account} />
            ))}

            <p className={cx('more-btn')} onClick={onSeeMore}>See more</p>
        </div>
    );
}

FollowingAccounts.propTypes = {
    lable: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default FollowingAccounts;
