import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

//this route will call the controller function

router.get('/', StudentControllers.getAllStudent);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
