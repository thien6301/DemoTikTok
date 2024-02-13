import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { useContext } from 'react';

import Button from '~/components/Button';
import { ModalContext } from '~/components/Contexts/ModalProvider';
import { ThemeContext } from '~/components/ThemeProvider';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const contextModal = useContext(ModalContext);
    const contextTheme = useContext(ThemeContext);

    const classes = cx('menu-item', {
        separate: data.separate,
        style: data.style,
    });

    const handleOnClick = () => {
        if (data.title === 'Log out') {
            contextModal.handleShowModalLogOut();
        }
    };

    const toggleTheme = (e) => {
        if (e.target.checked) {
            contextTheme.DarkMode();
        } else {
            contextTheme.LightMode();
        }
    };
    const selectedTheme = localStorage.getItem('selectedTheme');
    if (selectedTheme === 'dark') {
        contextTheme.DarkMode();
    }

    return (
        <div className={cx('cover')}>
            <Button
                className={classes}
                leftIcon={data.icon}
                to={data.to}
                onClick={handleOnClick}
            >
                {data.title}
                {data.title === 'Dark mode' && (
                    <div className={cx('container')}>
                        <input
                            type="checkbox"
                            id={styles.check}
                            onChange={toggleTheme}
                            defaultChecked={selectedTheme === 'dark'}
                        />
                        <label
                            htmlFor={styles.check}
                            className={cx('dark-mode')}
                        ></label>
                    </div>
                )}
            </Button>
        </div>
    );
}

MenuItem.propsType = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
