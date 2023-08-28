import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import { ModalContext } from '~/components/ModalProvider';
import { useContext } from 'react';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const contextModal = useContext(ModalContext);

    const classes = cx('menu-item', {
        separate: data.separate,
    });

    const handleOnClick = () => {
        if (data.title === 'Log out') {
            contextModal.handleShowModalLogOut();
        }
    };

    return (
        <Button
            className={classes}
            leftIcon={data.icon}
            to={data.to}
            onClick={handleOnClick}
        >
            {data.title}
        </Button>
    );
}

export default MenuItem;
