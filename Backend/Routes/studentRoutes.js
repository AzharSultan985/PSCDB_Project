import {Router} from 'express'

import { protected_Middleware } from '../middleware/Protected.Route.js'
import { saveStudentProfile } from '../controllers/studentProfile.create.js'
import multer from 'multer';

const router =  Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // har file max 2 MB
    files: 2,
  },
});




router.patch(
  "/create-profile",
  protected_Middleware,
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "latestEducationDocument", maxCount: 1 },
  ]),
  saveStudentProfile,
);



export default  router