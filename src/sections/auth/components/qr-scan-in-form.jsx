import { useFormContext } from 'react-hook-form';
import { useRef, useMemo, useEffect } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export function QRScanForm() {
  const inputRef = useRef(null);

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useFormContext();

  const qrValue = watch('qr_code');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const isAnalyzing = qrValue && !isSubmitting && !errors?.qr_code;
  const isError = !!errors?.qr_code;

  const statusColor = useMemo(() => {
    if (isSubmitting) return 'info.main'; // Blue
    if (isError) return 'error.main'; // Red
    if (isAnalyzing) return 'warning.main'; // Yellow
    return 'grey.500'; // Default
  }, [isSubmitting, isAnalyzing, isError]);

  const pulseColor = useMemo(() => {
    if (isSubmitting) return 'rgba(3, 169, 244, 0.4)'; // info: blue
    if (isError) return 'rgba(244, 67, 54, 0.4)'; // error: red
    if (isAnalyzing) return 'rgba(255, 193, 7, 0.4)'; // warning: yellow
    return 'rgba(158, 158, 158, 0.4)'; // grey.500
  }, [isSubmitting, isError, isAnalyzing]);
  return (
    <Box
      sx={{
        borderRadius: 2,
        px: 3,
        py: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'border-color 0.2s',
        border: '2px dashed',
        borderColor: statusColor,
        animation: isAnalyzing || isSubmitting || isError ? 'pulse 1.5s infinite' : 'none',
        '@keyframes pulse': {
          '0%': { boxShadow: `0 0 0 0 ${pulseColor}` },
          '70%': { boxShadow: `0 0 0 10px ${pulseColor.replace('0.4', '0')}` },
          '100%': { boxShadow: `0 0 0 0 ${pulseColor.replace('0.4', '0')}` },
        },
      }}
      onClick={handleFocus}
    >
      {/* Visually hidden input (but still focusable) */}
      <TextField
        name="qr_code"
        type="password"
        inputRef={inputRef}
        value={qrValue}
        disabled={isSubmitting}
        onChange={(e) => setValue('qr_code', e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(); // trigger form submit
          }
        }}
        error={!!errors?.qr_code}
        sx={{
          position: 'absolute',
          opacity: 0,
          width: '1px',
          height: '1px',
          zIndex: -1,
          pointerEvents: 'auto',
        }}
      />

      {errors?.qr_code && (
        <Typography variant="h5" color="error" align="center">
          {errors.qr_code.message}
        </Typography>
      )}
      <Typography variant="h3" align="center">
        {!qrValue && 'Waiting for QR scan...'}
        {qrValue && !isSubmitting && 'Analyzing...'}
        {isSubmitting && 'Submitting...'}
      </Typography>

      <Typography variant="subtitle1" color="warning.main">
        Click here if the scanner doesn&rsquo;t start
      </Typography>
    </Box>
  );
}
