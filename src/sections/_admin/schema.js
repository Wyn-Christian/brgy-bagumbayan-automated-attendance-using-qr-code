import dayjs from 'dayjs';
import { z as zod } from 'zod';
import duration from 'dayjs/plugin/duration';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import { fIsAfter } from 'src/utils/format-time';

import { schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------
dayjs.extend(duration);

const MAX_FILE_SIZE = 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const attendanceSchema = zod
  .object({
    user: schemaHelper.nullableInput(
      zod.object({
        id: zod.number(),
        full_name: zod.string(),
      }),
      { message: 'User is required!' }
    ),

    check_in_time: schemaHelper.date({
      message: {
        required: 'Time-in is required!',
        invalid_type: 'Invalid date!',
      },
    }),

    check_out_time: schemaHelper.optionalDate({
      message: {
        invalid_type: 'Invalid date!',
      },
    }),

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
      message: 'Time-out cannot be earlier than time-in!',
      path: ['check_out_time'],
    }
  )
  .refine(
    (data) => {
      if (!data.check_out_time) return true;

      const checkIn = dayjs(data.check_in_time);
      const checkOut = dayjs(data.check_out_time);
      const diffInHours = checkOut.diff(checkIn, 'hour', true);

      return diffInHours <= 12;
    },
    {
      message: 'Total attendance duration cannot exceed 14 hours.',
      path: ['check_out_time'],
    }
  );

export const userSchema = zod
  .object({
    id: zod.number().optional(),

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

    password: zod.string().min(6, 'Password is required'),
    confirm_password: zod.string().min(6, 'Confirm password is required'),

    role: zod.enum(['admin', 'user'], {
      errorMap: () => ({ message: 'Role is required' }),
    }),

    department: zod.string().optional(),
    face: zod
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      ),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
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

export const updateFaceSchema = zod.object({
  id: zod.number(),
  face: zod
    .any()
    .refine((file) => !!file, 'Face image is required.')
    .refine((file) => file.size <= MAX_FILE_SIZE, 'Image must be less than 1MB.')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png, and .webp formats are supported.'
    ),
});
