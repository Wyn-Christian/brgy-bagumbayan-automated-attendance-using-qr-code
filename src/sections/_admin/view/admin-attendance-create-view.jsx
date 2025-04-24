'use client';

import { useRouter } from 'next/navigation';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';

import { paths } from 'src/routes/paths';

import { createAttendance } from 'src/actions/admin/attendance';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import AttendanceForm from '../forms/attendance-form';

// ----------------------------------------------------------------------

export default function AdminAttendanceCreateView() {
  const router = useRouter();

  const submitHandler = async (formData, setError) => {
    try {
      const userId = formData.user?.id;

      const payload = {
        user_id: userId,
        check_in_time: formData.check_in_time,
        check_out_time: formData.check_out_time || null,
        source: formData.source || 'manual',
        remarks: formData.remarks || null,
      };


      const res = await createAttendance(payload);

      if (res?.status === 400) {
        Object.entries(res.message).forEach(([field, messages]) => {
          setError(field, {
            type: 'manual',
            message: messages[0] || 'Invalid input',
          });
        });

        enqueueSnackbar({
          variant: 'error',
          message: 'Validation failed. Please check the form.',
        });
        return;
      }

      enqueueSnackbar({
        variant: 'success',
        message: 'Attendance updated successfully!',
      });

      router.push(`/admin/attendance/${res?.result?.id}`);
    } catch (error) {
      console.error('Update failed:', error);
      enqueueSnackbar({ variant: 'error', message: 'Something went wrong.' });
    }
  };

  return (
    <>
      <SnackbarProvider />
      <CustomBreadcrumbs
        heading="Create a new attendance"
        links={[
          {
            name: 'Dashboard',
            href: paths.admin.dashboard,
          },
          {
            name: 'Attendance',
            href: paths.admin.attendance.list,
          },
          { name: 'Create' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <AttendanceForm submitHandler={submitHandler} />
    </>
  );
}
