import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { Iconify } from '../iconify';

// ----------------------------------------------------------------------

export default function ItemNotFound({ title, path }) {
  return (
    <Stack justifyContent="center" alignItems="center" spacing={2} sx={{ minHeight: '80vh' }}>
      <Typography variant="h3">{title || 'Item not found!'}</Typography>
      <Button
        LinkComponent={RouterLink}
        href={path}
        startIcon={<Iconify icon="line-md:chevron-left" />}
      >
        Go Back
      </Button>
    </Stack>
  );
}
