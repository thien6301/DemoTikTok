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

import { getList } from '~/services/getCommentList';

import Tippy from '@tippyjs/react';
import { useContext, useEffect, useState } from 'react';
import Button from '~/components/Button';

import { deleteCommentService } from '~/services/deleteCommentService';
import { getCurrentUser } from '~/services/getCurrentUserService';
import { NotifyContextKey } from '~/components/Contexts/NotifyContext';
import { Link } from 'react-router-dom';
import { CommentContext } from '~/components/Contexts/VideoModalContext';

const cx = classNames.bind(styles);

function Comment({ idVideo, commentState }) {
    const ContextComment = useContext(CommentContext);
    const showNotify = useContext(NotifyContextKey);

    const [isPressDelete, setIsPressDelete] = useState(false);
    const [listComment, setListComment] = commentState;
    const [idComment, setIdComment] = useState();
    const [currUser, setCurrUser] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCurrentUser();
            setCurrUser(result.id);
        };
        fetchApi();
    }, []);

    const handleDeleteComment = async () => {
        const result = await deleteCommentService(idComment);
        console.log(result);
        const result1 = await getList(idVideo);
        setListComment(result1);

        setIsPressDelete(false);
        showNotify('Deleted');
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
        <div className={cx('comment')}>
            {isPressDelete && (
                <div className={cx('wrapper-delete')}>
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
                                className={cx('button-delete')}
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
                                    <Link
                                        to={`/@${result.user.nickname}`}
                                        onClick={
                                            ContextComment.handleHideComment
                                        }
                                    >
                                        <Image
                                            src={result.user.avatar}
                                            className={cx('avatar')}
                                        />
                                    </Link>
                                    <Link
                                        className={cx('body-cmt')}
                                        to={`/@${result.user.nickname}`}
                                        onClick={
                                            ContextComment.handleHideComment
                                        }
                                    >
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
                                    </Link>
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
