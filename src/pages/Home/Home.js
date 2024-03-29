import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Video from '~/components/Video/Video';
import * as videoService from '~/services/videoService';
import { useEffect, useState } from 'react';
import ActionsApp from '~/components/ScrollTop';

const cx = classNames.bind(styles);
const INIT_PAGE = 1;
function Home() {
    const [showVideo, setShowVideo] = useState([]);
    const [page, setPage] = useState(INIT_PAGE);
    useEffect(() => {
        videoService
            .getVideo(page)
            .then((data) => {
                setShowVideo((prev) => [...prev, ...data]);
            })
            .catch((error) => console.log(error));
    }, [page]);

    console.log(showVideo);
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
            <ActionsApp />
        </div>
    );
}

export default Home;
