import {Router} from 'express'
import { registerStudent } from '../AuthController/stdRegController.js'
import { verifyEmailOtp } from '../AuthController/verify.email.otp.js'
import { resendEmailVerificationOtp } from '../AuthController/resend.email.otp.js'
import { loginStudent } from '../AuthController/student.login.js'
import { protected_Middleware } from '../middleware/Protected.Route.js'

const router =  Router()



router.post("/register-student",registerStudent)
router.post("/email-verification",verifyEmailOtp)
router.post("/resend-email-otp",resendEmailVerificationOtp)
router.post("/student-login",loginStudent)


router.get("/me", protected_Middleware, (req, res) => {
  res.status(200).json({
    success: true,
  });
});


export default  router