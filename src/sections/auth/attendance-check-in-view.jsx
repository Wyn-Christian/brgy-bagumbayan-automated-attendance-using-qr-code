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
import { QRCodeSchema } from './components/schema';
import { FormDivider } from './components/form-divider';
import { QRCheckInForm } from './components/qr-check-in-form';
import { FormReturnLink } from './components/form-return-link';

// ----------------------------------------------------------------------

export function AttendanceCheckInView() {
  const defaultValues = { qr_code: '' };

  const methods = useForm({
    resolver: zodResolver(QRCodeSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.info('SCANNED DATA', data);

      reset();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <FormHead
        title="Attendance Check In"
        description={<Typography variant="subtitle1">Please scan your QR code...</Typography>}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        <QRCheckInForm />
      </Form>

      <FormDivider label="Other options" />

      <Box sx={{ gap: 1.5, display: 'flex', justifyContent: 'center' }}>
        <Button component={RouterLink} href={paths.auth.login} variant="outlined">
          Login
        </Button>
        <Button component={RouterLink} href={paths.attendance.checkOut} variant="outlined">
          Check Out
        </Button>
      </Box>

      <FormReturnLink href={paths.home} label="Return to home" />
    </>
  );
}
