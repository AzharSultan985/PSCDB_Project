import {Router} from 'express'
import { registerStudent } from '../AuthController/stdRegController.js'

const router =  Router()



router.post("/register-student",registerStudent)




export default  router