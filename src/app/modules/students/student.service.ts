import { Student } from './student.model';
import { TStudent } from './students.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User Already Exists');
  }
  const result = await Student.create(studentData); //built in static method

  //our static method

  // const student = new Student(studentData);
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User Already Exists');
  // }

  // const result = await student.save(); //builtIn instance method
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });

  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
