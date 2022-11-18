import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import IonicPenAPI from "../../IonicPenAPI";

function ProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    IonicPenAPI.getProfile(username? username: null).then((res) => {
      setProfile(res);
    });
  }, [username]);

  return <div>
    <h1> Profile for { profile.username } </h1>
  </div>
}

export default ProfilePage;