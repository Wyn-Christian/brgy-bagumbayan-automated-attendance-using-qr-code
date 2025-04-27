import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { Iconify } from '../iconify';

// ----------------------------------------------------------------------

export default function DeleteButton({ icon, title, content, action, path }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (!action) return;

    startTransition(async () => {
      try {
        await action();
        router.push(path);
      } catch (error) {
        console.error('Delete failed:', error);
      }
    });
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        startIcon={<Iconify icon={icon} />}
        variant="outlined"
        color="error"
      >
        Delete
      </Button>
      <Dialog open={open} keepMounted onClose={handleClose}>
        <DialogTitle>{title || 'Are you sure you want to delete?'}</DialogTitle>
        {content && (
          <DialogContent>
            <DialogContentText>{content}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button variant="contained" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button color="error" onClick={handleDelete} loading={isPending}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
