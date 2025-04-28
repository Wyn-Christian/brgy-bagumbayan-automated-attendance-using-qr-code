'use client';

import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { verifyQrCode } from 'src/actions/auth';

import { Form } from 'src/components/hook-form';
import { FaceRecognitionCamera } from 'src/components/face-recognition-camera';

import { FormHead } from './components/form-head';
import { QRCodeSchema } from './components/schema';
import { FormDivider } from './components/form-divider';
import { QRScanForm } from './components/qr-scan-in-form';
import { FormReturnLink } from './components/form-return-link';

// ----------------------------------------------------------------------

export function AttendanceCheckInView() {
  const [isQrCodeVerified, setIsQrCodeVerified] = useState(false);
  const [showFaceDialog, setShowFaceDialog] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const methods = useForm({
    resolver: zodResolver(QRCodeSchema),
    defaultValues: { qr_code: '' },
    // defaultValues: { qr_code: '88baa5fc-9195-47b3-9cea-c4f117a3b02e' },
  });

  const { reset, handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (!isQrCodeVerified) {
      const result = await verifyQrCode(data.qr_code);

      if (result?.error) {
        reset();

        setError('qr_code', {
          type: 'manual',
          message: result?.message,
        });

        return;
      }
      setIsQrCodeVerified(true);
      setShowFaceDialog(true);

      return;
    }

    if (!data.qr_code || !capturedImage) {
      enqueueSnackbar({
        variant: 'error',
        message: 'Missing QR code or face image.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('qr_code', data.qr_code);
    formData.append('time', dayjs().format('YYYY-MM-DDTHH:mm:ss'));
    formData.append('face', capturedImage);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/attendance-sessions/check-in`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await res.json();

      if (!res.ok) {
        enqueueSnackbar({
          variant: 'error',
          message: result?.error || 'Check-in failed',
        });
        setCapturedImage(false);

        reset();
        setIsQrCodeVerified(false);
        return;
      }

      enqueueSnackbar({
        variant: 'success',
        message: 'Check-in Test successful!',
      });

      reset();
      setIsQrCodeVerified(false);
      setCapturedImage(false);
    } catch (err) {
      console.error('Error during check-in:', err);
      enqueueSnackbar({
        variant: 'error',
        message: 'Something went wrong.',
      });
    }
  });

  useEffect(() => {
    if (capturedImage) {
      handleSubmit(onSubmit)();
    }
  }, [capturedImage]);

  return (
    <>
      <SnackbarProvider />
      <FormHead title="Attendance Check In" description="Please scan your QR code..." />

      <Form methods={methods} onSubmit={onSubmit}>
        <QRScanForm />

        <FaceRecognitionCamera
          open={showFaceDialog}
          onClose={() => setShowFaceDialog(false)}
          onCapture={(file) => {
            setCapturedImage(file);
            setShowFaceDialog(false);
          }}
        />
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
      test
    </>
  );
}
