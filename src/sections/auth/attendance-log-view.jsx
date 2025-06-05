'use client';

import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

export function AttendanceLogView() {
  const [isQrCodeVerified, setIsQrCodeVerified] = useState(false);
  const [showFaceDialog, setShowFaceDialog] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const methods = useForm({
    resolver: zodResolver(QRCodeSchema),
    // defaultValues: { qr_code: '88baa5fc-9195-47b3-9cea-c4f117a3b02e' },
    defaultValues: { qr_code: '' },
  });

  const { reset, handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setErrorMessage('');

    if (!isQrCodeVerified) {
      const result = await verifyQrCode(data.qr_code);

      if (result?.error) {
        reset();
        setError('qr_code', {
          type: 'manual',
          message: result?.message,
        });
        setErrorMessage(result?.message);
        return;
      }

      setIsQrCodeVerified(true);
      setShowFaceDialog(true);
      return;
    }

    if (!data.qr_code || !capturedImage) {
      setErrorMessage('Missing QR code or face image.');
      return;
    }

    const formData = new FormData();
    formData.append('qr_code', data.qr_code);
    formData.append('time', dayjs().format('YYYY-MM-DDTHH:mm:ss'));
    formData.append('face', capturedImage);
    formData.append('source', 'kiosk');

    try {
      const res = await fetch(
        `https://brgy-bagumbayan-automated-attend-production.up.railway.app/api/attendance-sessions/log`,
        // `http://127.0.0.1:5000/api/attendance-sessions/log`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await res.json();

      if (!res.ok) {
        setErrorMessage(result?.error || 'Logging attendance failed.');
        setCapturedImage(null);
        reset();
        setIsQrCodeVerified(false);
        return;
      }

      const { message, session } = result;

      let extraInfo = '';

      if (session?.check_in_time && !session?.check_out_time) {
        const checkIn = dayjs(session.check_in_time);
        extraInfo = ` at ${checkIn.format('h:mm A')} on ${checkIn.format('MMMM D, YYYY')}.`;
      }

      if (session?.check_out_time) {
        const checkOut = dayjs(session.check_out_time);
        const checkIn = dayjs(session.check_in_time);
        const diff = dayjs.duration(checkOut.diff(checkIn));
        const hours = diff.hours();
        const minutes = diff.minutes();

        extraInfo = ` at ${checkOut.format('h:mm A')} on ${checkOut.format('MMMM D, YYYY')}. You worked for ${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}.`;
      }

      setSuccessMessage(`${message}${extraInfo}`);
      setErrorMessage('');
      reset();
      setIsQrCodeVerified(false);
      setCapturedImage(null);
    } catch (err) {
      console.error('Error during logging attendance:', err);
      setErrorMessage('Something went wrong. Please try again.');
    }
  });

  useEffect(() => {
    if (capturedImage) {
      handleSubmit(onSubmit)();
    }
  }, [capturedImage]);

  return (
    <>
      <FormHead title="Time In / Out" description="Scan your QR code to record your attendance." />

      {errorMessage && (
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" color="error">
            {errorMessage}
          </Typography>
        </Box>
      )}

      {successMessage && (
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" color="success.main">
            {successMessage}
          </Typography>
        </Box>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        <QRScanForm />

        <FaceRecognitionCamera
          open={showFaceDialog}
          onClose={() => setShowFaceDialog(false)}
          onCancel={() => {
            reset();
            setIsQrCodeVerified(false);
            setShowFaceDialog(false);
          }}
          onCapture={(file) => {
            setCapturedImage(file);
            setShowFaceDialog(false);
          }}
        />
      </Form>

      <FormDivider label="Need to log in instead?" />

      <Box sx={{ gap: 1.5, display: 'flex', justifyContent: 'center' }}>
        <Button component={RouterLink} href={paths.auth.login} variant="outlined">
          Login
        </Button>
      </Box>

      <FormReturnLink href={paths.home} label="Return to home" />
    </>
  );
}
