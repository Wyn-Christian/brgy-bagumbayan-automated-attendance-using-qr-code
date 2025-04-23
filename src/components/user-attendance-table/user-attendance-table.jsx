'use client';

import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';

import { fDate, fTime } from 'src/utils/format-time';

import { getUserAttendanceList } from 'src/actions/admin/attendance';

import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export function UserAttendanceTable({ userId }) {
  const [attendance, setAttendance] = useState({ data: [], meta: {} });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const params = new URLSearchParams();
      params.set('page', page + 1);
      params.set('limit', rowsPerPage);

      const res = await getUserAttendanceList(userId, params);
      setAttendance(res);
      setLoading(false);
    }

    fetchData();
  }, [userId, page, rowsPerPage]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - attendance.data.length) : 0;

  const renderLoading = () => (
    <TableRow>
      <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
        <CircularProgress size={80} />
      </TableCell>
    </TableRow>
  );

  const renderEmptyDataRow = () => (
    <TableRow>
      <TableCell colSpan={6} align="center" sx={{ py: 5, color: 'text.secondary' }}>
        No attendance records found for this user.
      </TableCell>
    </TableRow>
  );

  const renderTableBody = () => (
    <>
      {attendance.data.map((row) => (
        <TableRow key={row.id}>
          <TableCell>{fDate(row.check_in_time)}</TableCell>
          <TableCell>{fTime(row.check_in_time)}</TableCell>
          <TableCell>
            {row.check_out_time ? (
              fTime(row.check_out_time)
            ) : (
              <Label color="warning">Pending</Label>
            )}
          </TableCell>

          <TableCell>
            {row.check_in_time && row.check_out_time
              ? (dayjs(row.check_out_time).diff(dayjs(row.check_in_time), 'minute') / 60).toFixed(
                  2
                ) + ' hrs'
              : '—'}
          </TableCell>

          <TableCell>
            <Label color={row.source === 'kiosk' ? 'info' : 'default'}>{row.source}</Label>
          </TableCell>
          <TableCell>{row.remarks || '—'}</TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ mt: 5, mb: 1 }}>
        Attendance History
      </Typography>

      <Scrollbar fillContent>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 130 }}>Date</TableCell>
              <TableCell sx={{ minWidth: 130 }}>Check-in</TableCell>
              <TableCell sx={{ minWidth: 130 }}>Check-out</TableCell>
              <TableCell sx={{ minWidth: 120 }}>Total Hours</TableCell>
              <TableCell>Source</TableCell>
              <TableCell sx={{ minWidth: 250 }}>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && renderLoading()}

            {!loading && attendance.data.length === 0 && renderEmptyDataRow()}

            {!loading && attendance.data.length > 0 && renderTableBody()}

            {emptyRows > 0 && !loading && (
              <TableRow style={{ height: 53 }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                count={attendance.meta.total || attendance.data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Scrollbar>
    </Box>
  );
}
