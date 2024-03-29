import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './LoginContent.module.scss';
const cx = classNames.bind(styles);

function LoginItem({ data, onClick }) {
    const classes = cx('login-item', {
        separate: data.separate,
        style: data.style,
    });

    return (
        <Button
            className={classes}
            leftIcon={data.icon}
            to={data.to}
            onClick={onClick}
        >
            {data.title}
        </Button>
    );
}

export default LoginItem;
