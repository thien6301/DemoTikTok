import classNames from 'classnames/bind';

import Button from '~/components/Button';

import styles from './share.module.scss';
import { useState } from 'react';
import { DownExpandIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function ShareItems({ items }) {
    const [formType, setFormType] = useState(items[0]);

    const handleShowMore = () => {
        setFormType(items[1]);
    };
    

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-button')}>
                {formType.contents.map((item, index) => (
                    <Button key={index} className={cx('item-button')}>
                        <span className={cx('icon')}>{item.icon}</span>
                        <span className={cx('title')}>{item.title}</span>
                    </Button>
                ))}
                {formType.showMore && (
                    <div className={cx('more-btn')} onClick={handleShowMore}>
                        <DownExpandIcon />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShareItems;
