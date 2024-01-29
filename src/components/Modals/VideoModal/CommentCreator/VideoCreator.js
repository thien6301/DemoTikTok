import classNames from 'classnames/bind';
import styles from './VideoCreator.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmileBeam } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CommentCreator() {
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

    //post cmt
    const fetchApi = async () => {
        const result = await PostCommentService(id, newComment);
        console.log('postComment: ', result);
        setNewComment('');
        const result1 = await getList(id);
        setListComment(result1);
    };
    const handleSubmit = () => {
        fetchApi();
        setActiveComment(false);
    };
    useOnKeyPress(handleSubmit, 'Enter');
    // useOnKeyPress(() => setNewComment(''), 'Delete');

    

    const handleChange = (e) => {
        setActiveComment(true);
        if (e.target.value === '') {
            setActiveComment(false);
        }
        setNewComment(e.target.value);
    };

    
    return (
        <div className={cx('wrapper')}>
            <form className={cx('footer-container')}>
                <div className={cx('creat-cmt')}>
                    <input
                        className={cx('text-cmt')}
                        placeholder="Add comment..."
                        style={{ height: '18px' }}
                        value={newComment}
                        onChange={handleChange}
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
