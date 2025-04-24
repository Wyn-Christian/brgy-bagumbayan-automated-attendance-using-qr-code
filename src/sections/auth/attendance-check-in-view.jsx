'use client';

import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { checkIn } from 'src/actions/attendance';

import { Form } from 'src/components/hook-form';

import { FormHead } from './components/form-head';
import { QRCodeSchema } from './components/schema';
import { FormDivider } from './components/form-divider';
import { QRScanForm } from './components/qr-scan-in-form';
import { FormReturnLink } from './components/form-return-link';

// ----------------------------------------------------------------------

export function AttendanceCheckInView() {
  const defaultValues = { qr_code: '' };

  const methods = useForm({
    resolver: zodResolver(QRCodeSchema),
    defaultValues,
  });

  const { reset, handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        qr_code: data.qr_code,
        time: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
      };
      const result = await checkIn(payload);

      // handle backend 400 / validation error
      if (result?.status >= 400 && typeof result.message === 'object') {
        reset();

        Object.entries(result.message).forEach(([field, messages]) => {
          setError(field, {
            type: 'manual',
            message: Array.isArray(messages) ? messages[0] : messages || 'Invalid input',
          });
        });

        enqueueSnackbar({
          variant: 'error',
          message: 'Please fix the highlighted errors.',
        });

        return;
      }

      if (result?.error) {
        reset();

        setError('qr_code', {
          type: 'manual',
          message: result?.message,
        });

        return;
      }

      enqueueSnackbar({
        variant: 'success',
        message: 'Check-in successful!',
      });

      reset();
    } catch (error) {
      console.error('Unexpected error during check-in:', error);
      enqueueSnackbar({
        variant: 'error',
        message: 'Something went wrong. Please try again.',
      });
    }
  });

  return (
    <>
      <SnackbarProvider />
      <FormHead title="Attendance Check In" description="Please scan your QR code..." />

      <Form methods={methods} onSubmit={onSubmit}>
        <QRScanForm />
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
