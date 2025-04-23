'use client';

import { useEffect } from 'react';

import { logout } from 'src/actions/auth';

// ----------------------------------------------------------------------

export default function Page() {
  useEffect(() => {
    const fetchLogout = async () => {
      await logout();
    };
    fetchLogout();
  });

  return;
}
