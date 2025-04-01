import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Button({
    to,
    herf,
    primary = false,
    outline = false,
    disabaled = false,
    rounded = false,
    up = false,
    small = false,
    large = false,
    forLogin = false,
    children,
    className,
    leftIcon,
    onClick,
    ...passProps
}) {
    
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (herf) {
        props.herf = herf;
        Comp = 'a';
    }
    const classes = cx('wrapper', {
        primary,
        [className]: className,
        outline,
        small,
        large,
        up,
        disabaled,
        rounded,
        forLogin,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
        </Comp>
    );
}

export default Button;
