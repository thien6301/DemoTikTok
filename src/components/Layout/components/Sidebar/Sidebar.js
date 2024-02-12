import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import {
    ExploreActiveIcon,
    ExploreIcon,
    FollowActiveIcon,
    FollowIcon,
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
} from '~/components/Icons';

import * as followService from '~/services/followService';
import SuggestedAccounts from '~/components/SuggestedAccounts/SuggestedAccounts';
import SidebarDefault from './SidebarDefault';
import { useContext, useEffect, useState } from 'react';
import Footer from '~/components/Footer/Footer';
import { LoginContext } from '~/components/Contexts/LoginModalContext';

const cx = classNames.bind(styles);

const INIT_PAGE = 2;

function Sidebar() {
    const contextLogin = useContext(LoginContext);
    const [page, setPage] = useState(INIT_PAGE);
    const [suggestedUser, setSuggestedUser] = useState([]);

    useEffect(() => {
        followService
            .getFollower(page)
            .then((data) => {
                setSuggestedUser((prevUsers) => [...prevUsers, ...data]);
            })
            .catch((error) => console.log(error));
    }, [page]);

    const handSeeMore = () => {
        console.log(page);
        setPage((currentPage) => currentPage + 1);
    };

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="For You"
                    to={config.routes.home}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<FollowIcon />}
                    activeIcon={<FollowActiveIcon />}
                />
                <MenuItem
                    title="Explore"
                    to={config.routes.explore}
                    icon={<ExploreIcon />}
                    activeIcon={<ExploreActiveIcon />}
                />
                <MenuItem
                    title="LIVE"
                    to={config.routes.live}
                    icon={<LiveIcon />}
                    activeIcon={<LiveActiveIcon />}
                />
            </Menu>
            {contextLogin.data ? (
                <SuggestedAccounts
                    lable="Following accounts"
                    data={suggestedUser}
                    onSeeMore={handSeeMore}
                />
            ) : (
                <SidebarDefault />
            )}

            {/* <SuggestedAccounts lable="Following accounts" /> */}
            <Footer />
        </aside>
    );
}

export default Sidebar;
