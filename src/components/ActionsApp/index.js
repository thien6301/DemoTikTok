import Button from '../Button';
import { MobilePhoneIcon, PCIcon, ScrollOnTop, XIcon } from '../Icons';
import styles from './ActionsApp.module.scss';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function ActionsApp() {
    const actionsRef = useRef();

    const [isExpand, setIsExpand] = useState(false);

    useEffect(() => {
        const handleScrollY = () => {
            if (window.scrollY >= 20) {
                actionsRef.current.style.transform = 'translateY(0)';
            } else {
                actionsRef.current.style.transform = 'translateY(40px)';
            }
        };

        window.addEventListener('scroll', handleScrollY);

        return () => {
            window.removeEventListener('scroll', handleScrollY);
        };
    }, []);

    const handleOnScroll = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    const handleOpenExpand = () => {
        setIsExpand(true);
    };

    const handleCloseExpand = () => {
        setIsExpand(false);
    };
    return (
        <div ref={actionsRef} className={cx('wrapper-actions')}>
            <div className={cx('div-installer')}>
                <Button
                    onClick={handleOpenExpand}
                    className={cx('btn-getApp', {
                        'close-animate': !isExpand,
                    })}
                    medium
                >
                    Get App
                </Button>
                <div
                    className={cx('installer-wrapper', {
                        'close-animate': isExpand,
                    })}
                >
                    <div className={cx('container-btn')}>
                        <div className={cx('btn-install')}>
                            <PCIcon />
                            <span className={cx('name-method')}>
                                Get TikTok for desktop
                            </span>
                        </div>
                        <span className={cx('separate')}></span>
                        <div className={cx('btn-install')}>
                            <MobilePhoneIcon />
                            <span className={cx('name-method')}>
                                Get TikTok App
                            </span>
                        </div>
                    </div>
                    <div className={cx('xmark')} onClick={handleCloseExpand}>
                       <XIcon />
                    </div>
                </div>
            </div>
            <div className={cx('div-btn')}>
                <div onClick={handleOnScroll} className={cx('btn-scrolling')}>
                    <ScrollOnTop />
                </div>
            </div>
        </div>
    );
}

export default ActionsApp;
