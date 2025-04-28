'use client';

import { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormHelperText from '@mui/material/FormHelperText';

import { Image } from 'src/components/image';

import { FaceRecognitionCamera } from './face-recognition-camera';

export function FaceCaptureSection({ name, defaultImageUrl }) {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const fileWatch = watch(name);

  const [openCamera, setOpenCamera] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [localPreview, setLocalPreview] = useState(null);

  useEffect(() => {
    if (!fileWatch && defaultImageUrl) {
      setLocalPreview(defaultImageUrl);
    }
  }, [fileWatch, defaultImageUrl]);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setLocalPreview(reader.result);
    };
    reader.readAsDataURL(file);

    setValue(name, file, { shouldValidate: true });
  };

  const handleCapture = async (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setLocalPreview(reader.result);
    };
    reader.readAsDataURL(file);

    setValue(name, file, { shouldValidate: true });
    setOpenCamera(false);
  };

  return (
    <>
      <Stack spacing={1} sx={{ width: 1 }}>
        <Controller
          name={name}
          control={control}
          rules={{ required: 'Face photo is required' }}
          render={({ field }) => (
            <Stack
              spacing={2}
              alignItems="center"
              sx={{
                p: 3,
                border: '1px dashed',
                borderColor: errors[name] ? 'error.main' : 'grey.500',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" color={errors[name] ? 'error.main' : 'inherit'}>
                Face Registration
              </Typography>

              {localPreview && (
                <Button
                  onClick={() => setOpenDialog(true)}
                  sx={{
                    p: 0,
                    borderRadius: 2,
                    overflow: 'hidden',
                    width: 120,
                    height: 120,
                    minWidth: 0,
                  }}
                >
                  <Image
                    src={localPreview}
                    alt="Face Preview"
                    ratio="1/1"
                    sx={{
                      borderRadius: 2,
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Button>
              )}

              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={() => setOpenCamera(true)}>
                  Take Photo
                </Button>

                <Button variant="outlined" component="label">
                  Upload Photo
                  <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                </Button>
              </Stack>
            </Stack>
          )}
        />

        {errors[name] && (
          <FormHelperText error sx={{ mx: 'auto', textAlign: 'center' }}>
            {errors[name]?.message}
          </FormHelperText>
        )}
      </Stack>

      <FaceRecognitionCamera
        open={openCamera}
        onClose={() => setOpenCamera(false)}
        onCapture={handleCapture}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
        <DialogContent sx={{ px: 2, pt: 2 }}>
          {localPreview && (
            <Image
              src={localPreview}
              alt="Full Face Preview"
              sx={{
                width: '100%',
                borderRadius: 2,
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
