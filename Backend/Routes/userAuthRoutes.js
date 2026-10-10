import {Router} from 'express'
import { registerStudent } from '../AuthController/stdRegController.js'
import { verifyEmailOtp } from '../AuthController/verify.email.otp.js'
import { resendEmailVerificationOtp } from '../AuthController/resend.email.otp.js'

const router =  Router()



router.post("/register-student",registerStudent)
router.post("/email-verification",verifyEmailOtp)
router.post("/resend-email-otp",resendEmailVerificationOtp)




export default  router