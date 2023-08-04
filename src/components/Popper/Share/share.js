import classNames from 'classnames/bind';
import styles from './share.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import Tippy from '@tippyjs/react/headless';
import ShareItem from './ShareItem';
import { BottomIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
function Share({ children, items }) {
    const renderItems = () => {
        return items.map((item, index) => (
            <ShareItem key={index} data={item} />
        ));
    };

    return (
        <Tippy
            delay={[0, 400]}
            offset={[-25, 5]}
            interactive
            placement="top-start"
            render={(attrs) => (
                <div className={cx('content')} tabIndex=" -1" {...attrs}>
                    <PopperWrapper>
                        <div className={cx('share-body')}>
                            {renderItems()}
                            <div className={cx('share-more')}>
                                <BottomIcon />
                            </div>
                        </div>
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Share;
