import classNames from 'classnames/bind';
import styles from './UpdateProfileModal.module.scss';
import { useContext, useEffect, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoginContext } from '~/components/Contexts/LoginModalContext';
import { ModalContext } from '~/components/Contexts/ModalProvider';
import { update } from '~/services/updateUser';
import { XIcon } from '~/components/Icons';
import Button from '~/components/Button';
import { NotifyContextKey } from '~/components/Contexts/NotifyContext';

const cx = classNames.bind(styles);

function UpdateForm() {
    const showNotify = useContext(NotifyContextKey);
    const contextLogin = useContext(LoginContext);
    const contextModal = useContext(ModalContext);

    const [avatar, setAvatar] = useState({ url: contextLogin.data?.avatar });
    const [newLastName, setNewLastName] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newLink, setNewLink] = useState('');
    const [newBio, setNewBio] = useState('');

    const [isChange, setIsChange] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setNewLastName(contextLogin.data?.last_name);
        setNewFirstName(contextLogin?.data.first_name);
        setNewLink(contextLogin.data?.website_url);
        setNewBio(contextLogin.data?.bio);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(avatar.url);
        };
    }, [avatar]);

    const handleUpdateImage = (e) => {
        setIsChange(true);

        const [file] = e.target.files;

        if (!file) {
            return;
        }

        const types = ['image/jpeg', 'image/jpg', 'image/png'];
        if (types.includes(file.type)) {
            file.url = URL.createObjectURL(file);
            setAvatar(file);
        } else {
            showNotify('Định dạng file không hợp lệ!', 3000);
        }
    };

    const handleUpdateLastName = (event) => {
        setNewLastName(event.target.value);
        if (event.target.value !== contextLogin.data.last_name) {
            setIsChange(true);
        } else {
            setIsChange(false);
        }
    };

    const handleUpdateFirstName = (event) => {
        setNewFirstName(event.target.value);
        if (event.target.value !== contextLogin.data.first_name) {
            setIsChange(true);
        } else {
            setIsChange(false);
        }
    };

    const handleUpdateNewLink = (event) => {
        setNewLink(event.target.value);
        if (event.target.value !== contextLogin.data.website_url) {
            setIsChange(true);
        } else {
            setIsChange(false);
        }
    };

    const handleUpdateNewBio = (event) => {
        setNewBio(event.target.value);
        if (event.target.value !== contextLogin.data.bio) {
            setIsChange(true);
        } else {
            setIsChange(false);
        }
    };

    const fetchApi = async () => {
        setLoading(true);
        const FormData = require('form-data');
        const formData = new FormData();

        if (avatar !== null) {
            formData.append('avatar', avatar);
        }

        formData.append('last_name', newLastName);

        formData.append('first_name', newFirstName);
        if (newLink !== null) {
            formData.append('website_url', newLink);
        }
        formData.append('bio', newBio);

        const result = await update(formData);

        console.log('result update profile: ', result);
        setIsChange(false);
        setLoading(false);
        setLoaded(true);
        setTimeout(() => {
            setLoaded(false);
        }, 2500);
        window.location.reload();
    };

    return (
        <div className={cx('modal-mask')}>
            <div className={cx('wrapper')}>
                {loading && (
                    <FontAwesomeIcon
                        className={cx('loading')}
                        icon={faSpinner}
                    />
                )}

                <div className={cx('header')}>
                    <strong className={cx('text-header')}>Edit profile</strong>
                </div>
                <div className={cx('edit')}>
                    <span className={cx('text')}>Profile photo</span>
                    <div className={cx('change-avatar')}>
                        <img
                            src={avatar.url}
                            className={cx('image-profile')}
                            atl=""
                        />
                        <input
                            className={cx('input-file')}
                            id="change-avatar"
                            type="file"
                            accept="image/*"
                            onChange={handleUpdateImage}
                        />
                        <label
                            className={cx('label-upload')}
                            htmlFor="change-avatar"
                        ></label>
                    </div>
                </div>
                <div className={cx('edit-name')}>
                    <span className={cx('text')}>Name</span>
                    <div className={cx('cover-input')}>
                        <div className={cx('input-data')}>
                            <input
                                value={newLastName}
                                type="text"
                                placeholder="Last name..."
                                onChange={handleUpdateLastName}
                            />
                        </div>
                        <div
                            className={cx('input-data')}
                            style={{ marginTop: '20px' }}
                        >
                            <input
                                value={newFirstName}
                                type="text"
                                placeholder="First name..."
                                onChange={handleUpdateFirstName}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('edit')}>
                    <span className={cx('text')}>Web Link</span>
                    <div className={cx('cover-input')}>
                        <div className={cx('input-data')}>
                            <input
                                value={newLink}
                                type="text"
                                placeholder="Web..."
                                onChange={handleUpdateNewLink}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('edit')}>
                    <span className={cx('text')}>Bio</span>
                    <div className={cx('cover-input')}>
                        <div className={cx('input-data')}>
                            <input
                                value={newBio}
                                type="text"
                                placeholder="Bio..."
                                onChange={handleUpdateNewBio}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <Button
                        white
                        className={cx('button-cancel')}
                        onClick={contextModal.handleHideModalEdit}
                    >
                        Cancel
                    </Button>
                    <Button primary disabled={!isChange} onClick={fetchApi}>
                        Save
                    </Button>
                </div>
                <div
                    className={cx('close-btn')}
                    onClick={contextModal.handleHideModalEdit}
                >
                    <XIcon />
                </div>
            </div>
        </div>
    );
}

export default UpdateForm;
