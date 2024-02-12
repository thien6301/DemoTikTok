import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileItems from '~/components/ProfileItems';
import *as getUserService from '~/services/getUserService';

// dùng arrow function đê
function Profile() {
    const [currentUser, setCurrentUser] = useState([]);
    const [resultVideos, setResultVideos] = useState([]);
    const { nickname } = useParams();

    const fetchUser = async () => {
        const result = await getUserService.getUser(nickname)
        setCurrentUser(result);
        setResultVideos(result.videos);
    }

    useEffect(() => {
        fetchUser()
    },[nickname]);

    return (<ProfileItems data={currentUser} result={resultVideos} idVideo = {resultVideos.idVideo} uuidVideo = {resultVideos.uuidVideo}/>);
}
export default Profile;
