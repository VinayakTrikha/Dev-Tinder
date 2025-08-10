const authenticate = (req, res, next) => {
  const { token } = req.query;
  console.log(token);
  if (token == "abc") {
    console.log("Authenticated");
    next();
  } else {
    console.log("Not Authenticated");
    res.status(401).send("Not authorized");
    //   res.end('Not valid')
  }
};

module.exports =  {authenticate} ;
