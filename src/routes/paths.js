export const paths = {
  home: '/',
  aboutUs: '/about-us',
  auth: {
    login: '/login',
  },
  attendance: {
    root: '/attendance',
    checkIn: '/attendance/check-in',
    checkOut: '/attendance/check-out',
  },
  admin: {
    root: '/admin',
    dashboard: '/admin/dashboard',
    attendance: {
      list: '/admin/attendance/list',
      create: '/admin/attendance/create',
      details: (id) => `/admin/attendance/${id}`,
      edit: (id) => `/admin/attendance/${id}/edit`,
    },
    user: {
      list: '/admin/user/list',
      create: '/admin/user/create',
      details: (id) => `/admin/user/${id}`,
      edit: (id) => `/admin/user/${id}/edit`,
    },
    auditLogs: {
      list: '/admin/audit-logs/list',
      details: (id) => `/admin/audit-logs/${id}`,
    },
    gallery: {
      list: '/admin/gallery/list',
    },
    account: '/admin/account',
  },
  user: {
    root: '/user',
    dashboard: '/user/dashboard',
    attendance: {
      list: '/user/attendance/list',
      details: (id) => `/user/attendance/${id}`,
    },
    account: 'user/account',
  },
};
