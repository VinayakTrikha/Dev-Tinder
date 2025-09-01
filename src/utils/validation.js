const fields = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "photoUrl",
  "about",
  "skills",
];

const isAllowedParameters = (data, params) => {
  if (!params) throw new Error("Provide userId");
  const ALLOWED_PROPERTIES = [
    "firstName",
    "lastName",
    "password",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  const isAllowed = Object.keys(data).every((val) =>
    ALLOWED_PROPERTIES.includes(val)
  );
  if (!isAllowed) throw new Error("Not Allowed");
};
const isAllowedStatus = (status, ALLOWED_STATUS) => {
  return ALLOWED_STATUS.includes(status);
};

module.exports = { isAllowedParameters, isAllowedStatus, fields };
