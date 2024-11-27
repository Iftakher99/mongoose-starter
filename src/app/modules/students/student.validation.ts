import { z } from 'zod';

// Regex for phone number validation
const bangladeshiPhoneRegex = /^(?:\+88)?01[3-9]\d{8}$/;

// Helper function for Pascal Case conversion
const toPascalCase = (value: string) => {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    })
    .transform(toPascalCase), // Transform to Pascal Case
  middleName: z.string().optional(),
  // Transform to Pascal Case if provided
  lastName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'Last Name must start with a capital letter',
    })
    .transform(toPascalCase), // Transform to Pascal Case
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .min(1)
    .max(50)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "Father's name must start with a capital letter",
    })
    .transform(toPascalCase),
  fatherOccupation: z
    .string()
    .min(1)
    .max(50)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "Father's occupation must start with a capital letter",
    })
    .transform(toPascalCase),
  fatherContactNo: z
    .string()
    .regex(
      bangladeshiPhoneRegex,
      "Father's contact number must be a valid Bangladeshi phone number",
    ),
  motherName: z
    .string()
    .min(1)
    .max(50)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "Mother's name must start with a capital letter",
    })
    .transform(toPascalCase),
  motherOccupation: z
    .string()
    .min(1)
    .max(50)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "Mother's occupation must start with a capital letter",
    })
    .transform(toPascalCase),
  motherContactNo: z
    .string()
    .regex(
      bangladeshiPhoneRegex,
      "Mother's contact number must be a valid Bangladeshi phone number",
    ),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(50)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "Local guardian's name must start with a capital letter",
    })
    .transform(toPascalCase),
  occupation: z
    .string()
    .min(1)
    .max(50)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "Local guardian's occupation must start with a capital letter",
    })
    .transform(toPascalCase),
  contactNo: z
    .string()
    .regex(
      bangladeshiPhoneRegex,
      "Local guardian's contact number must be a valid Bangladeshi phone number",
    ),
  address: z.string().min(1).max(255), // Address field
});

// Main Student Validation Schema
const studentValidationSchema = z.object({
  id: z.string().min(1, 'Student ID is required'),
  password: z.string().min(1, 'Password  is required'),

  name: userNameValidationSchema,
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.string().optional(),
  email: z.string().email('Invalid email format'),
  contactNo: z
    .string()
    .regex(
      bangladeshiPhoneRegex,
      'Contact number must be a valid Bangladeshi phone number',
    ),
  emergencyContactNo: z
    .string()
    .regex(
      bangladeshiPhoneRegex,
      'Emergency contact number must be a valid Bangladeshi phone number',
    ),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string().min(1, 'Present address is required'),
  permanentAddress: z.string().min(1, 'Permanent address is required'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().optional().default(false),
});

export default studentValidationSchema;
