import { useEffect, useState } from 'react';
import ProfileItems from '~/components/Layout/components/ProfileItems';

function Profile() {
    const [currentUser, setCurrentUser] = useState([]);
    const [resultVideos, setResultVideos] = useState([]);

    useEffect(() => {
        fetch(
            `https://tiktok.fullstack.edu.vn/api/users${window.location.pathname}`,
        )
            .then((res) => res.json())
            .then((res) => {
                setCurrentUser(res.data);
                setResultVideos(res.data.videos);
            });
    }, []);

    return <ProfileItems data={currentUser} result={resultVideos} />;
}
export default Profile;
