import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileItems from '~/components/Layout/components/ProfileItems';

// dùng arrow function đê
function Profile() {
    const [currentUser, setCurrentUser] = useState([]);
    const [resultVideos, setResultVideos] = useState([]);
    const { nickname } = useParams();

    const fetchUser = () => {
        fetch(`https://tiktok.fullstack.edu.vn/api/users/${nickname}`)
            .then((res) => res.json())
            .then((res) => {
                setCurrentUser(res.data);
                setResultVideos(res.data.videos);
            });
    };
    useEffect(() => {
        fetchUser();
    }, [nickname]);

    return <ProfileItems data={currentUser} result={resultVideos} />;
}
export default Profile;
