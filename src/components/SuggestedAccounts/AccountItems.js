import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function AccountItems({ data }) {
    // const renderPreview = (props) => {
    //     return (
    //         <div tabIndex="-1" {...props}>
    //             <PopperWapper>
    //                 <AccountPreview data={data} />
    //             </PopperWapper>
    //         </div>
    //     );
    // };
    return (
        <Link to={`/@${data.nickname}`} className={cx('account-item')}>
            <Image
                className={cx('avatar')}
                src={data.avatar}
                alt={data.nickname}
            />
            <div className={cx('item-info')}>
                <p className={cx('nickname')}>
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
            </div>
        </Link>
    );
}

AccountItems.propTypes = {};
export default AccountItems;
