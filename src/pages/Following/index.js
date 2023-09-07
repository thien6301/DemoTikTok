import classNames from 'classnames/bind';
import styles from './Following.module.scss';

import Video from '~/components/Layout/components/Video/Video';
import { LoginContext } from '~/components/LoginProvider';

// import * as videoService from '~/services/videoService';
import * as followingVideoService from '~/services/followingVideoService';
import * as userService from '~/services/userService';

import { useEffect, useState } from 'react';
import { useContext } from 'react';

import FollowingDefault from '~/components/Following/followingDefault';

const cx = classNames.bind(styles);
const INIT_PAGE = 1;
const PER_PAGE = 10;
function Following() {
    const contextLogin = useContext(LoginContext);
    const [showVideo, setShowVideo] = useState([]);
    const [showUser, setShowUser] = useState([]);

    const token = localStorage.getItem('token');

    const [page, setPage] = useState(INIT_PAGE);


    // console.log(token)
    const fetchApi = () => { 
        followingVideoService
        .getVideoFollowing()
        .then((data) => {
            setShowVideo([...data]);
        })
        .catch((error) => console.log(error));
    }


    useEffect(() => {
        if (token) {
            fetchApi();
        }
        else if(!token){
            callApi()
        }
    }, [page]);

    const callApi = () => {
        userService
        .getSuggested(page, PER_PAGE)
        .then((user) => {
            setShowUser((prev) => [...prev, ...user]);
        })
        .catch((error) => console.log(error));
    }
    

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
            {contextLogin.data ? (
                <Video data={showVideo} />
            ) : (
                <FollowingDefault user={showUser} />
            )}
        </div>
    );
}

export default Following;
