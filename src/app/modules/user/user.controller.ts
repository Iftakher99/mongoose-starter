import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { Status } from 'better-status-codes';
import catchAsync from '../../utils/catchAsync';

const createUser = catchAsync(async (req, res) => {
  const { password, students: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: Status.OK,
    success: true,
    message: 'Student is Created successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
