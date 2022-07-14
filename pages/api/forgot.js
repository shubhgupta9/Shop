import Forgot from "../../models/Forgot";
import User from "../../models/User";

export default async function handler(req, res) {
  if (req.body.sendMail) {
    let token = `123`;
    let forgot = new Forgot({
      email: req.body.email,
      token: token,
    });
    let email = `We have sent you this email in response to reset your password for security.
    <br /> <br />
    To reset your password:  <a href="https://codeshop.com/forgot?token=${token}">
  </a>

  <br /><br/>`;
  } else {
  }

  res.status(200).json({ success: true });
}
