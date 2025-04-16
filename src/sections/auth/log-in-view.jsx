'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Form } from 'src/components/hook-form';

import { FormHead } from './components/form-head';
import { SignInSchema } from './components/schema';
import { LoginForm } from './components/log-in-form';
import { FormDivider } from './components/form-divider';
import { FormReturnLink } from './components/form-return-link';

// ----------------------------------------------------------------------

export function LoginView() {
	const defaultValues = { email: '', password: '' };

	const methods = useForm({ resolver: zodResolver(SignInSchema), defaultValues });

	const { reset, handleSubmit } = methods;

	const onSubmit = handleSubmit(async (data) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 500));
			reset();
			console.info('DATA', data);
		} catch (error) {
			console.error(error);
		}
	});

	return (
		<>
			<FormHead
				title="Log in"
				description="Please input your credentials"
			/>

			<Form methods={methods} onSubmit={onSubmit}>
				<LoginForm />
			</Form>


			<Box sx={{ display: { xs: 'none', sm: 'block' } }}>

				<FormDivider label="Are you just checking in/out?" />

				<Box sx={{ gap: 1.5, display: 'flex', justifyContent: 'center' }}>
					<Button component={RouterLink} href={paths.attendance.checkIn} variant='outlined'>Check In</Button>
					<Button component={RouterLink} href={paths.attendance.checkOut} variant='outlined'>Check Out</Button>
				</Box>

			</Box>

			<FormReturnLink href={paths.home} label="Return to home" />

		</>
	);
}
