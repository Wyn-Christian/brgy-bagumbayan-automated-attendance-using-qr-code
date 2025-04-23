'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  GridToolbarExport,
  GridToolbarContainer,
  GridToolbarFilterButton,
  DataGrid as MuiDataGrid,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

export default function CustomDataGrid({ rows = [], columns = [], total = 0 }) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const currentPage = parseInt(params.get('page') || '1', 10);
    const currentLimit = parseInt(params.get('limit') || '25', 10);

    const shouldUpdate =
      currentPage !== paginationModel.page + 1 || currentLimit !== paginationModel.pageSize;

    if (!shouldUpdate) return;

    params.set('page', paginationModel.page + 1);
    params.set('limit', paginationModel.pageSize);
    replace(`${pathname}?${params.toString()}`);
  }, [paginationModel, pathname, replace, searchParams]);

  return (
    <Paper
      sx={(theme) => ({
        position: 'relative',
        boxShadow: 'var(--customShadows-card)',
        minHeight: 640,
        overflow: 'hidden',
        borderRadius: 2,
        [theme.breakpoints.up('md')]: {
          flexGrow: 1,
          display: 'flex',
          height: '1px',
          flexDirection: 'column',
        },
        [theme.breakpoints.up('xs')]: {
          height: 800,
        },
      })}
    >
      <MuiDataGrid
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rows={rows}
        rowCount={total}
        columns={columns}
        slots={{ toolbar: CustomToolbar }}
        paginationMode="server"
      />
    </Paper>
  );
}

const CustomToolbar = () => (
  <GridToolbarContainer>
    <Box sx={{ flexGrow: 1 }} />
    <GridToolbarExport
      slotProps={{
        tooltip: { title: 'Export data' },
        button: { variant: 'outlined' },
      }}
    />
    <GridToolbarColumnsButton />
    <GridToolbarFilterButton />
    <GridToolbarDensitySelector slotProps={{ tooltip: { title: 'Change density' } }} />
  </GridToolbarContainer>
);
