import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create the transporter with the SMTP configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use TLS (set secure to true for port 465)
  requireTLS: true, // Force TLS if required
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// sendMail function that constructs and sends the email
export const sendMail = async ({ receiver, subject, text, html }) => {
  try {
    const mailOptions = {
      from: {
        address: process.env.SMTP_MAIL,
        name: "Company Name", // Custom sender name
      },
      to: receiver,
      subject: subject,
      text: text,
      html: html,
    };

    // Send email using the transporter and await the response
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info.messageId;
  } catch (error) {
    console.error("Error in sendMail function:", error);
    throw error; 
  }
};
