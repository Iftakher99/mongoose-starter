import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { students: studentData } = req.body;
    try {
      //data validation Using zod

      const zodParseData = studentValidationSchema.parse(studentData);
      const result = await StudentServices.createStudentIntoDB(zodParseData);
      //

      res.status(200).json({
        success: true,
        message: 'Student is Created',
        data: result,
      });
    } catch (zodError) {
      res.status(422).json({
        success: false,
        message: 'Validation failed',
        data: zodError,
      });
    }
  } catch (Error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating a student',
      data: Error,
    });
  }
};
//Get all students
const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are Retrieved Successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      data: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params;

  try {
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Student not Found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Successfully Got a Student',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong getting a Student',
      data: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
