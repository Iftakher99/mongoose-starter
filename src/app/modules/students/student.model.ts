import { Schema, model } from 'mongoose';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './students.interface';

const bangladeshiPhoneRegex = /^(?:\+88)?01[3-9]\d{8}$/;
const singleWordRegex = /^[a-zA-Z]+$/;
const toPascalCase = (value: string) => {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required.'],
    match: [
      singleWordRegex,
      'First name must be a single word with no spaces or special characters.',
    ],
    set: toPascalCase,
  },
  middleName: {
    type: String,
    trim: true,
    match: [
      singleWordRegex,
      'Middle name must be a single word with no spaces or special characters.',
    ],
    set: toPascalCase,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required.'],
    match: [
      singleWordRegex,
      'Last name must be a single word with no spaces or special characters.',
    ],
    set: toPascalCase,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, "Father's name is required."],
    match: [
      singleWordRegex,
      "Father's name must be a single word with no spaces or special characters.",
    ],
    set: toPascalCase,
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, "Father's occupation is required."],
    match: [
      singleWordRegex,
      "Father's occupation must be a single word with no spaces or special characters.",
    ],
    set: toPascalCase,
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, "Father's contact number is required."],
    match: [
      bangladeshiPhoneRegex,
      "Father's contact number must be a valid Bangladeshi phone number.",
    ],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, "Mother's name is required."],
    match: [
      singleWordRegex,
      "Mother's name must be a single word with no spaces or special characters.",
    ],
    set: toPascalCase,
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, "Mother's occupation is required."],
    match: [
      singleWordRegex,
      "Mother's occupation must be a single word with no spaces or special characters.",
    ],
    set: toPascalCase,
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, "Mother's contact number is required."],
    match: [
      bangladeshiPhoneRegex,
      "Mother's contact number must be a valid Bangladeshi phone number.",
    ],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, "Local guardian's name is required."],
    match: [
      singleWordRegex,
      "Local guardian's name must be a single word with no spaces or special characters.",
    ],
    set: toPascalCase,
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, "Local guardian's occupation is required."],
    match: [
      singleWordRegex,
      "Local guardian's occupation must be a single word with no spaces or special characters.",
    ],
    set: toPascalCase,
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, "Local guardian's contact number is required."],
    match: [
      bangladeshiPhoneRegex,
      "Local guardian's contact number must be a valid Bangladeshi phone number.",
    ],
  },
  address: {
    type: String,
    trim: true,
    required: [true, "Local guardian's address is required."],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      trim: true,
      required: [true, 'Student ID is required.'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required.'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: userNameSchema,
      required: [true, 'Name details are required.'],
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Gender is required.'],
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      unique: true,
      type: String,
      trim: true,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format.'],
    },
    contactNo: {
      type: String,
      trim: true,
      required: [true, 'Contact number is required.'],
      match: [
        bangladeshiPhoneRegex,
        'Contact number must be a valid Bangladeshi phone number.',
      ],
    },
    emergencyContactNo: {
      type: String,
      trim: true,
      required: [true, 'Emergency contact number is required.'],
      match: [
        bangladeshiPhoneRegex,
        'Emergency contact number must be a valid Bangladeshi phone number.',
      ],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group.',
      },
    },
    presentAddress: {
      type: String,
      trim: true,
      required: [true, 'Present address is required.'],
    },
    permanentAddress: {
      type: String,
      trim: true,
      required: [true, 'Permanent address is required.'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian details are required.'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian details are required.'],
    },
    profileImg: {
      type: String,
      trim: true,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
//virtual
studentSchema.virtual('fullname').get(function () {
  return this.name.firstName + ' ' + this.name.lastName;
});

//Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
