import classNames from 'classnames/bind';
import styles from './Following.module.scss';

import Video from '~/components/Video/Video';
import { LoginContext } from '~/components/Contexts/LoginModalContext';

// import * as videoService from '~/services/videoService';
import * as followingVideoService from '~/services/followingVideoService';
import * as userService from '~/services/userService';

import { useEffect, useState } from 'react';
import { useContext } from 'react';

import FollowingDefault from '~/components/Following/followingDefault';
import ActionsApp from '~/components/ScrollTop';

const cx = classNames.bind(styles);
const INIT_PAGE = 1;
function Following() {
    const contextLogin = useContext(LoginContext);
    const [showVideo, setShowVideo] = useState([]);
    const [showUser, setShowUser] = useState([]);

    const [page, setPage] = useState(INIT_PAGE);

    // follow
    const fetchApi = () => {
        followingVideoService
            .getVideoFollowing()
            .then((data) => {
                setShowVideo([...data]);
                console.log(showVideo);
            })
            .catch((error) => console.log(error));
    };
    // suggest
    const callApi = () => {
        userService
            .getSuggested(page)
            .then((data) => {
                setShowUser((prev) => [...prev, ...data]);
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        fetchApi();
        callApi();
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
            {!contextLogin.data && showVideo.length < 5 ? (
                <FollowingDefault user={showUser} />
            ) : (
                <div>
                    <Video data={showVideo} />
                    <ActionsApp />
                </div>
            )}
        </div>
    );
}

export default Following;
