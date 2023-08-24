import classNames from 'classnames/bind';
import style from './followingDefault.module.scss';
import Image from '../Image/Image';
import Button from '../Button';

const cx = classNames.bind(style);
function FollowingItems() {
    return (
        <div>
            <div className={cx('video-preview')}>
                <Image
                    className={cx('img-poster')}
                    src="https://files.fullstack.edu.vn/f8-tiktok/videos/520-63516c443cbf7.jpg"
                />
            </div>
            <div className={cx('info-container')}>
                    <Image 
                        className = {cx('avatar')} 
                        src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/f5ea0cea4a605d4f141f92c2bbb840f4.jpeg?x-expires=1692788400&x-signature=cPrRCiKaxSMFlgz%2FZdYeqgvPJXw%3D" />
                    <h3 className={cx('full-name')}>Lê Ngọc Huyền</h3>
                    <h4 className={cx('nick-name')}>ngochuyenNHS</h4>
                    <Button primary> Follow </Button>
                    
            </div>
        </div>
    );
}

export default FollowingItems;
