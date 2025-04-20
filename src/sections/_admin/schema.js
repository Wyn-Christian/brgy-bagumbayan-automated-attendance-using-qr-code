import { z as zod } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import { fIsAfter } from 'src/utils/format-time';

import { schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const attendanceSchema = zod
  .object({
    user_id: schemaHelper.nullableInput(
      zod.object({
        id: zod.number(),
        full_name: zod.string(),
      }),
      { message: 'User is required!' }
    ),

    check_in_time: schemaHelper.date({
      message: {
        required: 'Check-in time is required!',
        invalid_type: 'Invalid date!',
      },
    }),

    check_out_time: schemaHelper.nullableInput(
      schemaHelper.date({
        message: {
          invalid_type: 'Invalid date!',
        },
      }),
      { message: 'Check-out time is required!' }
    ),

    source: zod.enum(['kiosk', 'manual'], {
      required_error: 'Source is required!',
      invalid_type_error: 'Invalid source!',
    }),

    remarks: zod.string().max(255, { message: 'Maximum 255 characters only!' }).optional(),
  })
  .refine(
    (data) => {
      if (!data.check_out_time) return true;
      return !fIsAfter(data.check_in_time, data.check_out_time);
    },
    {
      message: 'Check-out time cannot be earlier than check-in time!',
      path: ['check_out_time'],
    }
  );

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
    password: zod.string().optional(),
    confirm_password: zod.string().optional(),
    role: zod.enum(['admin', 'user'], {
      errorMap: () => ({ message: 'Role is required' }),
    }),
    department: zod.string().optional(),
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
  });
