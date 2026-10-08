import nodemailer from "nodemailer";

const port = Number(process.env.SMTP_PORT || 465);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({ to, subject, text, html }) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("SMTP email credentials are missing from .env.");
  }

  return transporter.sendMail({
    from: `"${process.env.MAIL_FROM_NAME || "PSCDB"}" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });
}