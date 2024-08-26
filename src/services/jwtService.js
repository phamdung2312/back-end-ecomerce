const jwt = require("jsonwebtoken");

const genneralAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    "access_token",
    {
      expiresIn: "10s",
    }
  );
  return access_token;
};
const genneralRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    "refresh_token",
    {
      expiresIn: "365d",
    }
  );
  return refresh_token;
};
const refreshJWTToken = async (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, "refresh_token", async (err, user) => {
        if (err) {
          resolve({
            status: "ERROR",
            message: "The authentication",
          });
        }
        const access_token = await genneralAccessToken({
          id: user.id,
          isAdmin: user.isAdmin,
        });

        resolve({
          status: "OK",
          message: "SUCCESS",
          access_token,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { genneralAccessToken, genneralRefreshToken, refreshJWTToken };
