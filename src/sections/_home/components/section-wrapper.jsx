import Box from '@mui/material/Box';

export default function SectionWrapper({ children, bgcolor, ...props }) {
  return (
    <Box
      component="section"
      sx={{ py: { xs: 10, md: 15 }, bgcolor: bgcolor ?? 'transparent' }}
      {...props}
    >
      {children}
    </Box>
  );
}
