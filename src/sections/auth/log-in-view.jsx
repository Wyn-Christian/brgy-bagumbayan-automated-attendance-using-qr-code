'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { login } from 'src/actions/auth';

import { Form } from 'src/components/hook-form';

import { FormHead } from './components/form-head';
import { SignInSchema } from './components/schema';
import { LoginForm } from './components/log-in-form';
import { FormDivider } from './components/form-divider';
import { FormReturnLink } from './components/form-return-link';

// ----------------------------------------------------------------------

export function LoginView() {
  const router = useRouter();
  const defaultValues = { email: '', password: '' };

  const methods = useForm({ resolver: zodResolver(SignInSchema), defaultValues });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    let result = await login(formData);

    if (result?.error) {
      enqueueSnackbar({ variant: 'error', message: result?.message });
    } else {
      if (result?.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/user/dashboard');
      }
    }
  });

  return (
    <>
      <SnackbarProvider />
      <FormHead title="Log in" description="Please input your credentials" />

      <Form methods={methods} onSubmit={onSubmit}>
        <LoginForm />
      </Form>

      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <FormDivider label="Are you just checking in/out?" />

        <Box sx={{ gap: 1.5, display: 'flex', justifyContent: 'center' }}>
          <Button component={RouterLink} href={paths.attendance.checkIn} variant="outlined">
            Check In
          </Button>
          <Button component={RouterLink} href={paths.attendance.checkOut} variant="outlined">
            Check Out
          </Button>
        </Box>
      </Box>

      <FormReturnLink href={paths.home} label="Return to home" />
    </>
  );
}
