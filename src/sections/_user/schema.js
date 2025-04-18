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
    password: zod.string().min(6, 'Password must be at least 6 characters'),
    confirm_password: zod.string().min(6, 'Password must be at least 6 characters'),
    role: zod.enum(['admin', 'user'], {
      errorMap: () => ({ message: 'Role is required' }),
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });
