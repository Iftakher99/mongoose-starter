import express from 'express';
import { UserControllers } from './user.controller';
import { StudentValidations } from '../students/student.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createUser,
);

export const UserRoutes = router;
