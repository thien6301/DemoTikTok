import classNames from 'classnames/bind';
import styles from './Following.module.scss';

import Video from '~/components/Layout/components/Video/Video';
import { LoginContext } from '~/components/LoginProvider';

// import * as videoService from '~/services/videoService';
import * as followingVideoService from '~/services/followingVideoService';
import { useEffect, useState } from 'react';
import { useContext } from 'react';

import FollowingDefault from '~/components/Following/followingDefault';

const cx = classNames.bind(styles);
const INIT_PAGE = 1;
function Following() {
    const contextLogin = useContext(LoginContext);
    const [showVideo, setShowVideo] = useState([]);
    const [page, setPage] = useState(INIT_PAGE);
    useEffect(() => {
        followingVideoService
            .getVideoFollowing(page)
            .then((data) => {
                setShowVideo((prev) => [...prev, ...data]);
            })
            .catch((error) => console.log(error));
    }, [page]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            setPage((currentPage) => currentPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Video data={showVideo} />
            {/* {!contextLogin.data && <FollowingDefault/>} */}
        </div>
    );
}

export default Following;
