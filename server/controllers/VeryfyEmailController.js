const nodemailer = require("nodemailer");

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
module.exports = async (req, res) => {
  let code = [];
  const { receiver } = req.params;
  for (let i = 0; i < 4; i++) code.push(Math.floor(Math.random() * 10));

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: receiver,
    subject: "Verify Email",
    html: `
      <div style="font-family: Arial; background-color: #242526; width: 700px; height: 300px; text-align: center; padding: 20px; margin: auto;">
        <h1 style="color: white !important">Hello There! How Are you? I Hope You Doing Great</h1>
        <h3 style="color: white !important">You Send Verify Email Requiest From Fakebook app</h3>
        <h4 style="color: white !important">The Verify Code Is: ${code.join(
          ""
        )}</h4>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: ", success.response);
      res.json({
        sucess: true,
        code: code.join(""),
      });
    }
  });
};
