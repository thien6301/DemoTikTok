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

import { LoginContext } from '~/components/LoginProvider';


import * as userService from '~/services/userService';
import SidebarDefault from './SidebarDefault';
import { useEffect, useState } from 'react';
import Footer from '~/components/Footer/Footer';
import SuggestedAccounts from '~/components/SuggestedAccounts/SuggestedAccounts';
import { useContext } from 'react';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 10;

function Sidebar() {
    const contextLogin = useContext(LoginContext)
    const [page, setPage] = useState(INIT_PAGE);
    const [suggestedUser, setSuggestedUser] = useState([]);

    useEffect(() => {
        userService
            .getSuggested(page, PER_PAGE)
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
            {!contextLogin.data && <SidebarDefault />}
            {contextLogin.data &&  <SuggestedAccounts
                lable="Following accounts"
                data={suggestedUser}
                onSeeMore={handSeeMore}
            />}




            
            {/* <SuggestedAccounts lable="Following accounts" /> */}
            <Footer />
        </aside>
    );
}

export default Sidebar;
