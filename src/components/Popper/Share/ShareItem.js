import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './share.module.scss';
const cx = classNames.bind(styles);

function ShareItem({ data, onClick }) {
    const classes = cx('share-item', {
        separate: data.separate,
    });

    return (
        <Button
            className={classes}
            leftIcon={data.icon}
            to={data.to}
            onClick={onClick}
            disabaled
        >
            {data.title}
        </Button>
    );
}

export default ShareItem;
