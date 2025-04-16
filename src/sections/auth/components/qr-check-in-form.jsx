import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export function QRCheckInForm() {
	const inputRef = useRef(null);

	const {
		setValue,
		watch,
		handleSubmit,
		formState: { isSubmitting },
	} = useFormContext();

	const qrValue = watch('qr_code');

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
			{/* Hidden input to receive QR scan */}
			<TextField
				inputRef={inputRef}
				hidden
				value={qrValue}
				onChange={(e) => setValue('qr_code', e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						handleSubmit(); // trigger form submit
					}
				}}
			/>
			{!qrValue ? (
				<Typography variant="h6" align="center">
					Waiting for QR scan...
				</Typography>
			) : (
				<Typography variant="h6" align="center">
					Analyzing...
				</Typography>
			)
			}
		</Box>
	);
}
