import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/components/Layout/components/Header';
import Sidebar from '../components/Sidebar';

import Login from '~/components/Login';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>

            {/* modal */}
        <Login />
        </div>
    );
}

export default DefaultLayout;
