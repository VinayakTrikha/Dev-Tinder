import { useSelector } from "react-redux";
import EditProfile from "./EditProfiile";
import UserCard from "../common/UserCard";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="flex justify-center py-10">
      <div className="flex flex-row gap-10 bg-base-200 rounded-xl shadow-lg p-8 max-w-4xl w-full items-start md:items-center">
        <div className="flex-1 flex justify-center">
          <UserCard feedData={user} />
        </div>
        <div className="flex-1 flex justify-center">
          <EditProfile user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
