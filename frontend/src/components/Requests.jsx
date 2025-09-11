import { useEffect, useState } from "react";
import * as requestService from "../services/request.service";
import * as userService from "../services/user.service";
const Requests = () => {
  const [requestArr, setRequestArr] = useState([]);

  const fetchRequest = async () => {
    try {
      const res = await userService.fetchRequests();
      const fetchedData = res.data.data;
      setRequestArr(fetchedData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async (id, status) => {
    try {
      const params = {
        status: status,
        requestId: id,
      };
      await requestService.reviewRequest(params);
      const filteredData = requestArr.filter((feed) => feed.requestId !== id);
      setRequestArr(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <div className="flex flex-col my-10">
      <h1 className="font-bold text-3xl mb-6 text-center">Requests</h1>

      {requestArr.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requestArr.map((request) => {
            const {
              age,
              firstName,
              gender,
              lastName,
              photoUrl,
              about,
              skills,
            } = request;

            return (
              <div
                key={request._id}
                className="flex flex-col items-center p-6 rounded-2xl shadow-lg bg-base-200 hover:shadow-xl transition"
              >
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary"
                />

                <div className="mt-4 text-center">
                  <h2 className="font-bold text-xl">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {age} years old • {gender}
                  </p>

                  <p className="mt-3 text-gray-700">{about}</p>

                  {skills?.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-semibold text-sm text-gray-600 mb-2">
                        Skills
                      </h3>
                      <div className="flex flex-wrap justify-center gap-2">
                        {skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm rounded-full bg-primary text-white"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-row mt-5">
                  <button
                    className="btn btn-secondary mr-5"
                    onClick={() => handleClick(request.requestId, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleClick(request.requestId, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center my-36">You are all caught up!!</div>
      )}
    </div>
  );
};

export default Requests;
