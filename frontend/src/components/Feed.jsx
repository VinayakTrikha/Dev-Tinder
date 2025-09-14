import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeedData } from "../slices/feedSlice";
import { useNavigate } from "react-router-dom";
import UserCard from "../common/UserCard";
import * as requestService from "../services/request.service";
import * as userService from "../services/user.service";

const Feed = () => {
  const dispatch = useDispatch();
  const feedArr = useSelector((store) => store.feed);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch feed from backend
  const fetchFeed = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.fetchAllFeed();
      dispatch(addFeedData(response.data.data));
    } catch (err) {
      setError("Failed to load feed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (id, status) => {
    try {
      const filteredData = feedArr.filter((feed) => feed._id !== id);
      dispatch(addFeedData(filteredData));

      await requestService.sendRequest({ status, requestId: id });

      if (filteredData.length === 0) {
        fetchFeed();
      }
    } catch (error) {
      console.error(error);
      fetchFeed();
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (loading && (!feedArr || feedArr.length === 0)) {
    return <div className="text-center my-36">Loading...</div>;
  }

  if (error) {
    return <div className="text-center my-36 text-red-500">{error}</div>;
  }

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
