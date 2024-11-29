import { StudentServices } from './student.service';

import sendResponse from '../../utils/sendResponse';
import { Status } from 'better-status-codes';
import catchAsync from '../../utils/catchAsync';

//Get all students
const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: Status.OK,
    success: true,
    message: 'Students are Retrieved Successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StudentServices.getSingleStudentFromDB(studentId);
  if (!result) {
    res.status(404).json({
      success: false,
      message: 'Student not Found',
    });
    return;
  }
  sendResponse(res, {
    statusCode: Status.OK,
    success: true,
    message: 'Successfully Got a Student',
    data: result,
  });
});
//delete
const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const findStudent = await StudentServices.getSingleStudentFromDB(studentId);
  if (!findStudent) {
    res.status(404).json({
      success: false,
      message: 'Student not Found',
    });
    return;
  }
  const result = await StudentServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: Status.OK,
    success: true,
    message: 'Successfully deleted Student',
    data: result,
  });
});
export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
};
