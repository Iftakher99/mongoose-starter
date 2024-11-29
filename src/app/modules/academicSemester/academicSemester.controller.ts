import { Status } from 'better-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: Status.OK,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  });
});
//get all academic semester
const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
  sendResponse(res, {
    statusCode: Status.OK,
    success: true,
    message: ' All Academic Semester got Successfully',
    data: result,
  });
});
//get single academicSemester from db

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;

  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
  sendResponse(res, {
    statusCode: Status.OK,
    success: true,
    message: 'Single Academic Semester got Successfully',
    data: result,
  });
});
// update academic semester
//get single academicSemester from db

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.updateSingleAcademicSemesterInDB(
      semesterId,
      req.body,
    );
  sendResponse(res, {
    statusCode: Status.OK,
    success: true,
    message: 'Academic Semester Updated Successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
