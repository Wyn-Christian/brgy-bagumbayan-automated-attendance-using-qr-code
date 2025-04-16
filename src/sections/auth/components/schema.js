import { z as zod } from 'zod';

export const SignInSchema = zod.object({
	email: zod
		.string()
		.min(1, { message: 'Email is required!' })
		.email({ message: 'Email must be a valid email address!' }),
	password: zod
		.string()
		.min(1, { message: 'Password is required!' })
		.min(6, { message: 'Password must be at least 6 characters!' }),
});

export const QRCodeSchema = zod.object({
  qr_code: zod.string().min(1, { message: 'QR Code is required!' }),
});
