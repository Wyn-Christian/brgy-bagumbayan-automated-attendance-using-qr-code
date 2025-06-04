import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Logo } from 'src/components/logo';

// ----------------------------------------------------------------------

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 3 }}>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Logo isSingle sx={{ mb: 1 }} />

        <Box component="span" sx={{ color: 'text.secondary', typography: 'caption' }}>
          © All rights reserved.
        </Box>
      </Container>
    </Box>
  );
}
