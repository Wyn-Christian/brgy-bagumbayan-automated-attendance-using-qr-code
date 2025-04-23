'use client';

import { useRouter } from 'next/navigation';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';

import { paths } from 'src/routes/paths';

import { updateAttendance } from 'src/actions/admin/attendance';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import ItemNotFound from 'src/components/item-not-found/item-not-found';

import AttendanceForm from '../forms/attendance-form';

// ----------------------------------------------------------------------

export default function AdminAttendanceEditView({ id, data }) {
  const router = useRouter();

  const submitHandler = async (formData, setError) => {
    try {
      const userId = formData.user?.id;

      if (!userId) {
        enqueueSnackbar({ variant: 'error', message: 'User is required.' });
        return;
      }

      const payload = {
        user_id: userId,
        check_in_time: formData.check_in_time || null,
        check_out_time: formData.check_out_time || null,
        source: formData.source || 'manual',
        remarks: formData.remarks || null,
      };

      const res = await updateAttendance(id, payload);

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

      router.push(`/admin/attendance/${id}`);
    } catch (error) {
      console.error('Update failed:', error);
      enqueueSnackbar({ variant: 'error', message: 'Something went wrong.' });
    }
  };

  return (
    <>
      <SnackbarProvider />
      <CustomBreadcrumbs
        sx={{ mb: { xs: 3, md: 5 } }}
        backHref={paths.admin.attendance.details(id)}
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.admin.dashboard,
          },
          {
            name: 'Attendance',
            href: paths.admin.attendance.list,
          },
          { name: 'Edit' },
        ]}
      />
      {data?.status === 404 ? (
        <ItemNotFound title="Attendance session not found!" path={paths.admin.attendance.list} />
      ) : (
        <AttendanceForm mode="edit" initialValues={data} submitHandler={submitHandler}/>
      )}
    </>
  );
}
