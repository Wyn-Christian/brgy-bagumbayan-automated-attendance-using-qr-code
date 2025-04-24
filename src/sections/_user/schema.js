import { z as zod } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import { schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const userSchema = zod
  .object({
    first_name: zod.string().min(1, 'First name is required'),
    middle_name: zod.string().optional(),
    last_name: zod.string().min(1, 'Last name is required'),
    gender: zod.enum(['male', 'female'], {
      errorMap: () => ({ message: 'Gender is required' }),
    }),
    birthday: schemaHelper.date({ message: { required: 'Birthday is required!' } }),
    address: zod.string().min(1, 'Address is required'),
    email: zod.string().email('Invalid email address'),
    contact_number: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
    role: zod.enum(['admin', 'user'], {
      errorMap: () => ({ message: 'Role is required' }),
    }),
    department: zod.string().optional(),

    old_password: zod.string().optional(),
    password: zod.string().optional(),
    confirm_password: zod.string().optional(),
  })
  .refine(
    (data) => !data.password || (data.password.length >= 6 && data.confirm_password?.length >= 6),
    {
      message: 'Password must be at least 6 characters',
      path: ['password'],
    }
  )
  .refine((data) => !data.password || data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })
  .refine((data) => !data.password || data.old_password, {
    message: 'Old password is required to set a new password',
    path: ['old_password'],
  });

export const userInfoSchema = zod.object({
  id: zod.number(),
  first_name: zod.string().min(1, 'Required'),
  middle_name: zod.string().optional(),
  last_name: zod.string().min(1, 'Required'),
  gender: zod.enum(['male', 'female']),
  birthday: zod.coerce.date(),
  address: zod.string().optional(),
});

export const roleDeptSchema = zod.object({
  id: zod.number(),
  role: zod.enum(['admin', 'user']),
  department: zod.string().optional(),
});

export const credentialsSchema = zod.object({
  id: zod.number(),
  email: zod.string().email(),
  contact_number: zod.string().min(10),
});

export const passwordSchema = zod
  .object({
    id: zod.number(),
    password: zod.string().min(6),
    confirm_password: zod.string().min(6),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });
