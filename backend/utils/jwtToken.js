const sendToken = (user, statusCode, res) => {
  //Create JWT Token

  const token = user.getJwtToken();

  const options = {
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, user });
};

export default sendToken;
