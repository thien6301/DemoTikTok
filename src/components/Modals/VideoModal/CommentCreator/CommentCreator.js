import classNames from 'classnames/bind';
import styles from './CommentCreator.module.scss';
import { useContext, useState } from 'react';
import { PostCommentService } from '~/services/PostCommentService';
import { getList } from '~/services/getCommentList';
import { NotifyContextKey } from '~/components/Contexts/NotifyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmileBeam } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CommentCreator({ idVideo, setListComment }) {
    const showNotify = useContext(NotifyContextKey);
    const [newComment, setNewComment] = useState('');
    const [activeComment, setActiveComment] = useState(false);

    const fetchApi = async () => {
        const result = await PostCommentService(idVideo, newComment);
        console.log('postComment: ', result);
        setNewComment('');
        const result1 = await getList(idVideo);
        setListComment(result1);
    };
    const handleSubmit = () => {
        fetchApi();
        showNotify('Comment posted');
        setActiveComment(false);
    };
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();

            fetchApi();
        }
    };
    const handleChange = (e) => {
        setActiveComment(true);
        if (e.target.value === '') {
            setActiveComment(false);
        }
        setNewComment(e.target.value);
    };
    return (
        <div className={cx('footer')}>
            <form className={cx('footer-container')}>
                <div className={cx('creat-cmt')}>
                    <input
                        className={cx('text-cmt')}
                        placeholder="Add comment..."
                        style={{ height: '18px' }}
                        value={newComment}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <div className={cx('emojis')}>
                        <FontAwesomeIcon
                            icon={faFaceSmileBeam}
                            className={cx('icon')}
                        />
                    </div>
                </div>
                <div
                    className={cx(
                        'post-cmt',
                        activeComment ? 'active-cmt' : '',
                    )}
                    onClick={handleSubmit}
                >
                    Post
                </div>
            </form>
        </div>
    );
}

export default CommentCreator;
