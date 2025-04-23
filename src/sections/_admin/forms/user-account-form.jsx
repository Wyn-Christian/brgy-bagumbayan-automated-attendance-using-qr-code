'use client';

import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { updateUserAccount } from 'src/actions/auth';
import { departments } from 'src/assets/data/departments';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { userSchema } from '../schema';

// ----------------------------------------------------------------------

export default function UserAccountForm({ data }) {
  const showPassword = useBoolean();
  const { value: IsUpdatePassword, setValue: setIsUpdatePassword } = useBoolean(false);

  const methods = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      ...data,
      department: !data?.department ? '' : data?.department,
      password: '',
      confirm_password: '',
    },
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    try {
      delete formData.confirm_password;

      if (!formData.password) {
        delete formData.password;
      }

      formData.birthday = dayjs(formData.birthday).format('YYYY-MM-DD');

      const res = await updateUserAccount(formData);

      if (res?.status === 400) {
        Object.entries(res.message).forEach(([field, messages]) => {
          setError(field, {
            type: 'manual',
            message: messages[0] || 'Invalid input',
          });
        });

        enqueueSnackbar({ variant: 'error', message: 'Validation failed. Please check the form.' });
        return;
      }

      enqueueSnackbar({ variant: 'success', message: 'Update successfully!' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar({ variant: 'error', message: 'Something went wrong.' });
    }
  });

  const renderPersonalInfo = () => (
    <CustomCard>
      <Typography variant="h4" mb={3}>
        Personal Information
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field.Text name="first_name" label="First Name" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field.Text name="middle_name" label="Middle Name" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field.Text name="last_name" label="Last Name" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field.DatePicker name="birthday" label="Birthday" />
        </Grid>
        <Grid size={12}>
          <Field.Text name="address" label="Address" />
        </Grid>
      </Grid>
    </CustomCard>
  );

  const renderContactInfo = () => (
    <CustomCard>
      <Typography variant="h4" mb={3}>
        Contact Information
      </Typography>
      <Grid container rowSpacing={3} columnSpacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field.Text type="email" name="email" label="Email" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field.Phone name="contact_number" label="Contact Number" />
        </Grid>
      </Grid>
    </CustomCard>
  );

  const renderRoleDepartment = () => (
    <CustomCard>
      <Typography variant="h4" mb={3}>
        Roles & Department
      </Typography>
      <Grid container rowSpacing={3} columnSpacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field.Select name="department" label="Department">
            <MenuItem value="">None</MenuItem>
            {departments.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Field.Select>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field.RadioGroup
            name="role"
            label="Role"
            row
            options={[
              { label: 'User', value: 'user' },
              { label: 'Admin', value: 'admin' },
            ]}
          />
        </Grid>
      </Grid>
    </CustomCard>
  );

  const renderSecurity = () => (
    <CustomCard>
      <Typography variant="h4" mb={3}>
        Update Password
      </Typography>
      <Grid container rowSpacing={3} columnSpacing={2}>
        <Grid size={12}>
          <Field.Text
            name="password"
            label="New Password"
            type={showPassword.value ? 'text' : 'password'}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showPassword.onToggle} edge="end">
                      <Iconify
                        icon={showPassword.value ? 'solar:eye-outline' : 'solar:eye-closed-outline'}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
        <Grid size={12}>
          <Field.Text
            name="confirm_password"
            label="Confirm Password"
            type={showPassword.value ? 'text' : 'password'}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showPassword.onToggle} edge="end">
                      <Iconify
                        icon={showPassword.value ? 'solar:eye-outline' : 'solar:eye-closed-outline'}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
      </Grid>
    </CustomCard>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <SnackbarProvider />
      <Stack spacing={5} sx={{ maxWidth: 720, mx: 'auto' }}>
        {/* Peronsal Information */}
        {renderPersonalInfo()}

        {/* Contact Information */}
        {renderContactInfo()}

        {/* Contact Information */}
        {renderRoleDepartment()}

        {/* Security */}
        <FormControlLabel
          label="Update Password"
          control={
            <Switch
              value={IsUpdatePassword}
              onChange={() => setIsUpdatePassword(!IsUpdatePassword)}
            />
          }
        />
        {IsUpdatePassword && renderSecurity()}

        <Stack direction="row" justifyContent="flex-end" spacing={2} alignItems="flex-end">
          <Button
            color="error"
            variant="contained"
            disabled={Object.keys(errors).length === 0}
            onClick={() => reset()}
          >
            Reset
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save Changes'}
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}

const CustomCard = styled(Card)({ padding: 'calc(3 * var(--spacing))' });
