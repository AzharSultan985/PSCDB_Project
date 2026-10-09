import { createHmac, randomInt } from "node:crypto";
import { sendEmail } from "./mail.services.js";

const OTP_TTL_MS = 2 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;

function createOtpHash(userId, otp) {
  const secret = process.env.OTP_HMAC_SECRET;

  if (!secret) {
    throw new Error("OTP_HMAC_SECRET is missing from the .env file.");
  }

  return createHmac("sha256", secret)
    .update(`${userId}:${otp}`)
    .digest("hex");
}

export async function issueEmailVerificationOtp(user) {
  if (!user?._id || !user.email) {
    throw new Error("A valid user is required to issue an email OTP.");
  }

  if (user.isEmailVerified) {
    throw new Error("This email address is already verified.");
  }

  const lastSentAt = user.emailVerification?.sentAt;

  if (
    lastSentAt &&
    Date.now() - new Date(lastSentAt).getTime() < RESEND_COOLDOWN_MS
  ) {
    const error = new Error("Please wait before requesting another code.");
    error.statusCode = 429;
    throw error;
  }

  const otp = randomInt(0, 1_000_000).toString().padStart(6, "0");
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  // Save the protected code before sending the email.
  user.emailVerification = {
    otpHash: createOtpHash(user._id.toString(), otp),
    expiresAt,
    sentAt: new Date(),
    attempts: 0,
  };

  await user.save();

  try {
    await sendEmail({
      to: user.email,
      subject: "Verify your PSCDB email",
      text: `Your PSCDB verification code is ${otp}. It expires in 10 minutes.`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6">
          <h2>Verify your PSCDB email</h2>
          <p>Your verification code is:</p>
          <p style="font-size:28px;font-weight:bold;letter-spacing:6px">${otp}</p>
          <p>This code expires in 2 minutes. If you did not create a PSCDB account, ignore this email.</p>
        </div>
      `,
    });
  } catch (error) {
    // Invalidate the code if sending failed.
    user.emailVerification = {
      otpHash: null,
      expiresAt: null,
      sentAt: null,
      attempts: 0,
    };

    await user.save();
    throw error;
  }

  // Never return or log the raw OTP.
  return { expiresAt };
}