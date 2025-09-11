import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeedData } from "../slices/feedSlice";
import { useNavigate } from "react-router-dom";
import UserCard from "../common/UserCard";
import * as requestService from "../services/request.service";
import * as userService from "../services/user.service";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feedArr = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    try {
      const response = await userService.fetchAllFeed();
      const feedData = response.data;
      dispatch(addFeedData(feedData.data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequest = async (id, status) => {
    try {
      const params = {
        status: status,
        requestId: id,
      };
      await requestService.sendRequest(params);
      const filteredData = feedArr.filter((feed) => feed._id !== id);
      dispatch(addFeedData(filteredData));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const user = useSelector((store) => store.user);
  return feedArr?.length > 0 ? (
    <div className="flex justify-center my-20">
      <UserCard
        feedData={feedArr[0]}
        showBtn1={true}
        showBtn2={true}
        onConfirm={handleRequest}
        onClose={handleRequest}
      />
    </div>
  ) : (
    <div className="text-center my-36">You are all caught up!!</div>
  );
};

export default Feed;
