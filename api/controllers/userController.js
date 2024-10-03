import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../helper/mailer.js";
export const register = (req, res) => {
  const { email, password } = req.body;
  const generateOTP = () => Math.floor(1000 + Math.random() * 9000);
  const otp=generateOTP();

  // console.log(generateOTP()); // Outputs a 4-digit OTP

  const sql = `select * from users where email = '${email}'`;

  db.query(sql, (err, result) => {
    if (err) {
      return res.send({
        messaege: "User check garda database ma error aayo: ",
        err,
      });
    }

    if (result.length > 0) {
      return res.send({ message: "user already exists..." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const values = [email, hashedPassword];
    const sql2 = `insert into users( email,password) value(?)`;

    db.query(sql2, [values], (error, result) => {
      if (error)
        return res.status(400).send({
          messaege: "User insert garda database ma error aayo: ",
          error,
        });

      const msg = `<div>
      <h1>Hi, ${email},This is your OTP: <span style="color:blue">${otp}</span> Please verify it on <a href="http://localhost:5173">AppName</a>.</h1>
      </div>`;

      sendMail({
        receiver: email,
        subject: "Mail Verification",
        text: "msg",
        html: msg,
      })
        .then((messageId) => {
          console.log("Email sent successfully with Message ID:", messageId);
          const sql = "UPDATE users SET otp=? WHERE email=?";
          db.query(sql, [otp, email], (err, data) => {
            if (err) {
              res.statu(500).send(err);
            } else {
              res.status(200).send(data);
            }
          });
        })
        .catch((error) => {
          console.error("Failed to send email:", error);
        });

      //update query for OTP

      // return res.send(result);
    });
  });
};

// OTP Verification
export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND otp = ?";

  db.query(sql, [email, otp], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
     
        db.query(
          "UPDATE users SET verified = 1 WHERE email = ?",
          [email],
          (err, updateResult) => {
            if (err) throw err;
            res.send("Email verified successfully");
          }
        );
      
    } else {
      res.status(400).send("Invalid OTP");
    }
  });
};

// Password Reset after OTP verification
export const resetPassword = (req, res) => {
  const { email, newPassword } = req.body;
  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  db.query(
    "UPDATE users SET password = ? WHERE email = ?",
    [hashedPassword, email],
    (err, result) => {
      if (err) throw err;
      res.send("Password updated successfully");
    }
  );
};
