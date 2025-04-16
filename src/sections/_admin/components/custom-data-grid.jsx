'use client';

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
	GridToolbarExport,
	GridToolbarContainer,
	GridToolbarFilterButton,
	DataGrid as MuiDataGrid,
	GridToolbarColumnsButton,
	GridToolbarDensitySelector,
} from '@mui/x-data-grid';

export default function CustomDataGrid({ rows = [], columns = [], }) {

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
			<GridToolbarDensitySelector
				slotProps={{ tooltip: { title: 'Change density' } }}
			/>
		</GridToolbarContainer>
	)

	return (
		<Paper sx={(theme) => ({
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
				height: 800
			}
		})}>
			<MuiDataGrid rows={rows} columns={columns} slots={{ toolbar: CustomToolbar }} />
		</Paper>
	)
}
