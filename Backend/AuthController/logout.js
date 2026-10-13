// AuthController/logout.controller.js
export function logoutStudent(_req, res) {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("pscdb_access", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
}