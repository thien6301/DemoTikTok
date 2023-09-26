import VideoContent from './VideoContent/VideoContent';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Video.module.scss';

const cx = classNames.bind(styles);

function Video({ data = [] }) {
    
    return (
        <div className={cx('wrapper')}>
            {data.map((video) => (
                <VideoContent key={video.id} data={video} />
            ))}
        </div>
    );
}

Video.propTypes = {
    data: PropTypes.array,
};

export const useElementOnScreen = (options, targetRef) => {
    const [isVisibile, setIsVisible] = useState();
    const callbackFunction = (entries) => {
        const [entry] = entries; //const entry = entries[0]
        setIsVisible(entry.isIntersecting);
    };
    const optionsMemo = useMemo(() => {
        return options;
    }, [options]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            callbackFunction,
            optionsMemo,
        );
        const currentTarget = targetRef.current;
        if (currentTarget) observer.observe(currentTarget);

        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [targetRef, optionsMemo]);
    return isVisibile;
};

export default Video;
