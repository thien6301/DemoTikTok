import { useOnKeyPress } from '~/hooks/useOnKeyPress';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import Image from '~/components/Image/Image';
import {
    TymIconMini,
    DotDotDotIcon,
    TrashCanIcon,
    ReportLargeIcon,
} from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import { PostCommentService } from '~/services/PostCommentService';
import { getList } from '~/services/getCommentList';

import Tippy from '@tippyjs/react';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmileBeam } from '@fortawesome/free-regular-svg-icons';
import { deleteCommentService } from '~/services/deleteCommentService';
import { getCurrentUserService } from '~/services/getCurrentUserService';

const cx = classNames.bind(styles);

function Comment() {
    const { id } = useParams();
    const [isPressDelete, setIsPressDelete] = useState(false);
    const [listComment, setListComment] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [activeComment, setActiveComment] = useState(false);
    const [idComment, setIdComment] = useState();
    const [currUser, setCurrUser] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCurrentUserService(id);
            setCurrUser(result.id);
        };
        fetchApi();
    }, []);
    // console.log(currUser);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getList(id);
            setListComment(result);
        };
        fetchApi();
    }, []);

    
    

    const handleDeleteComment = async () => {
        const result = await deleteCommentService(idComment);
        console.log(result);
        const result1 = await getList(id);
        setListComment(result1);
        console.log(result1);
        setIsPressDelete(false);
    };

    const renderDeleteCmt = (attrs) => (
        <div className={cx('menu-list')} {...attrs}>
            <PopperWrapper classNames={cx('menu-popper')}>
                {attrs.user.id === currUser ? (
                    <span
                        className={cx('line-1')}
                        onClick={() => {
                            setIdComment(attrs.id);
                            setIsPressDelete(true);
                        }}
                    >
                        <span className={cx('trashIcon')}>
                            <TrashCanIcon />
                        </span>
                        Delete
                    </span>
                ) : (
                    <span className={cx('line-1')}>
                        <span className={cx('trashIcon')}>
                            <ReportLargeIcon />
                        </span>
                        Report
                    </span>
                )}
            </PopperWrapper>
        </div>
    );
    return (
        <div>
            {/* {loaded && <span className={cx('notify')}>Deleted</span>} */}
            {/* {posted && <span className={cx('notify')}>Posted Comment!</span>} */}
            {isPressDelete && (
                <div className={cx('wrapper-delete')}>
                    {/* {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />} */}
                    <div className={cx('container-delete')}>
                        <div className={cx('title-delete')}>
                            <span>
                                Are you sure you want to delete this comment?
                            </span>
                        </div>
                        <div className={cx('button-wrapper-delete')}>
                            <Button
                                up
                                className={cx('button-cancel')}
                                onClick={() => setIsPressDelete(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                outline
                                className={cx('button-cancel')}
                                onClick={handleDeleteComment}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className={cx('cmt-wrapper')}>
                <div className={cx('cmt-container')}>
                    {listComment &&
                        listComment.length !== 0 &&
                        listComment.map((result) => (
                            <div key={result.id} className={cx('main-cmt')}>
                                <div className={cx('comment-item')}>
                                    <Image
                                        src={result.user.avatar}
                                        className={cx('avatar')}
                                    />
                                    <div className={cx('body-cmt')}>
                                        <h4 className={cx('fullname')}>
                                            {result.user.first_name +
                                                ' ' +
                                                result.user.last_name}
                                        </h4>
                                        <p className={cx('cmt-text')}>
                                            {result.comment}
                                        </p>
                                        <p className={cx('sub-cmt')}>
                                            <span className={cx('time-cmt')}>
                                                {result.created_at}
                                            </span>
                                            <span className={cx('reply-cmt')}>
                                                Reply
                                            </span>
                                        </p>
                                    </div>
                                    <div className={cx('action-container')}>
                                        <div className={cx('btn-delete')}>
                                            <Tippy
                                                delay={[0, 300]}
                                                offset={[10, 5]}
                                                interactive
                                                placement="bottom-end"
                                                animation={false}
                                                render={() =>
                                                    renderDeleteCmt(result)
                                                }
                                            >
                                                <span className={cx('test')}>
                                                    <DotDotDotIcon />
                                                </span>
                                            </Tippy>
                                        </div>
                                        <div className={cx('like-container')}>
                                            <TymIconMini />
                                            <span className={cx('tym-cmt')}>
                                                {result.likes_count}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Comment;
