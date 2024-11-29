import { academicSemesterMapper } from './academicSemester.const';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //semester name and semester code check

  if (academicSemesterMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester! Name and value Not Matched');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};
// get all Academic semester
const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};
//get single Academic semester
const getSingleAcademicSemesterFromDB = async (payload: string) => {
  const result = await AcademicSemester.findById(payload);
  return result;
};
// update Academic Semester
const updateSingleAcademicSemesterInDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateSingleAcademicSemesterInDB,
};
