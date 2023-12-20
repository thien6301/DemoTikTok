import classNames from 'classnames/bind';
import style from './LoginContent.module.scss'
import LoginItem from './LoginItem';


const cx = classNames.bind(style)

function LoginContent({items}) {


    const renderItems = () => {
        return items.map((item, index) => (
            <LoginItem key={index} data={item} />
        ));
    };

    return ( 
            <div className={cx('login-body')}>
                    {renderItems()}
            </div>
     );
}

export default LoginContent;