import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../helper/mailer.js";
export const register = (req, res) => {
  const { email, password } = req.body;
  const generateOTP = () => Math.floor(1000 + Math.random() * 9000);
  const otp = generateOTP();

  // console.log(generateOTP()); // Outputs a 4-digit OTP

  const sql = `select * from users where email = '${email}'`;

  db.query(sql, (err, result) => {
    if (err) {
      return res.send({
        message: "User check garda database ma error aayo: ",
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
          message: "User insert garda database ma error aayo: ",
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
              res.status(500).send(err);
            } else {
              res.status(200).send({success:true,message:"User added successfully"});
            }
          });
        })
        .catch((error) => {
          console.error("Failed to send email:", error);
        });
    });
  });
};

// OTP Verification
export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND otp = ?";

  db.query(sql, [email, otp], (err, result) => {
    if (err) {
      res.send(err)
    };
    if (result.length > 0) {

      db.query(
        "UPDATE users SET verified = 1 WHERE email = ?",
        [email],
        (err, updateResult) => {
          if (err) throw err; 
          res.send({message:"Email verified successfully",data:updateResult});
        }
      );

    } else {
      res.status(400).send("Invalid OTP");
    }
  });
};


export const forgetPassword = (req, res) => {
  const { email } = req.body;
  const generateOTP = () => Math.floor(1000 + Math.random() * 9000);
  const otp = generateOTP();
  const sql = "select * from users where email=?"
  db.query(sql, email, (err, data) => {
    if (err) {
      res.send("Server Error")
    } else {
      if (data.length === 0) {
        res.send("Email not valid")
      } else {
        const msg = `<div>
        <h1>Hi, ${email},This is your reset password OTP: <span style="color:blue">${otp}</span> Please reset password it on <a href="http://localhost:5173">AppName</a>.</h1>
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
              res.status(500).send(err);
            } else {
              res.status(200).send({message:"OTP send successfully",data});
            }
          });
        })
        .catch((error) => {
          console.error("Failed to send email:", error);
        });
      }
    }
  })
};


export const verifyForgetOtp = (req, res) => {
  const { email, otp } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND otp = ?";

  db.query(sql, [email, otp], (err, result) => {
    if (err) {
      res.send(err)
    };
    if (result.length > 0) {

      res.send("otp is correct")

    } else {
      res.status(400).send("Invalid OTP");
    }
  });
};

export const changeNewPassword=(req,res)=>{
  const {email,password}=req.body;
  const sql="update users set password=? where email=?";
  db.query(sql,[password,email],(err,data)=>{
    if(err){
      res.send(err)
    }else{
      res.send({message:`passoword hange sucessfully ${password}`,data})
    }
  })
}