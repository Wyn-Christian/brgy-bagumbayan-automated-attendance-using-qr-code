'use client';

import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function CustomCardForm({ title, subheader, children, ...other }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Card {...other}>
      <CardHeader
        sx={{ mb: 3 }}
        title={title}
        subheader={subheader}
        action={
          <IconButton onClick={() => setExpanded(!expanded)}>
            <Iconify icon={expanded ? 'line-md:chevron-down' : 'line-md:chevron-right'} />
          </IconButton>
        }
      />
      <Collapse in={expanded}>
        <Divider />
        <Stack sx={{ gap: 3, p: 3 }}>{children}</Stack>
      </Collapse>
    </Card>
  );
}
