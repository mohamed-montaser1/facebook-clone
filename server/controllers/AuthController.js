const User = require("../models/user");
const bcrypt = require("bcrypt");
const { signJWT } = require("../utilities/jwtHelper");

/**
 * ? What Signup Controller Do ?
 * TODO: Get User's Data
 * TODO: Check If No Users With Email And Password
 * TODO: If No Users Similar Create New User With Data From Request Object
 * *: Return Response With Status Code 201
 * !: But If There is Users With Submited Data Return Error
 */

/**
 *
 * @param {Request} req
 * @param {Response} res
 */

exports.signUp = async (req, res) => {
  const { username, email, password, avatar } = req.body.data;

  const user = await User.findOne({ email });
  if (user == null) {
    // Create User
    const user = User({
      username,
      email,
      password: bcrypt.hashSync(password, 8),
      avatar,
    });
    try {
      await user.save();
      res.status(201).json({
        success: true,
        message: "Saved Successfuly!",
      });
    } catch (error) {
      res.json({
        success: false,
        message: `Error Is: ${error}`,
      });
    }
  } else {
    // ? If there is similar users
    res.json({
      success: true,
      message: "There Is Already User With This Email",
    });
  }
};

/**
 * ? What Login Controller Will Do
 * TODO: Take Email And Password From Request.Body
 * TODO: Search For Email In Database
 * * Success: send success message with response status 200
 * ! Error: send faild message with response 400
 */

/**
 *
 * @param {Request} req
 * @param {Response} res
 */

exports.login = async (req, res) => {
  const { email, password } = req.body.data;
  const user = await User.findOne({ email });

  if (user != null) {
    if (bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true,
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          accessToken: signJWT({ sub: user._id }),
        },
      });
    } else {
      res.json({
        success: true,
        message: "Password Is Wrong!",
      });
    }
    return;
  }
  res.json({
    success: true,
    message: "There Is No User With Submited Email",
  });
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */

exports.me = async (req, res) => {
  let user = await User.findById(req.userId);

  res.json({
    success: true,
    data: {
      id: user?._id,
      username: user?.username,
      email: user?.email,
      avatar: user?.avatar,
    },
  });
};
