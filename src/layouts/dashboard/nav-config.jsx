import { Iconify } from 'src/components/iconify';

export const NAV_ADMIN_DATA = [
  {
    subheader: 'Overview',
    items: [
      {
        title: 'Dashboard',
        path: '/admin/dashboard',
        icon: <Iconify icon="line-md:tablet-twotone" />,
      },
    ],
  },
  {
    subheader: 'Management',
    items: [
      {
        title: 'User',
        path: '/admin/user',
        icon: <Iconify icon="line-md:person" />,
        children: [
          {
            title: 'List',
            path: '/admin/user/list',
            icon: <Iconify icon="line-md:list" />,
          },
          {
            title: 'Create',
            path: '/admin/user/create',
            icon: <Iconify icon="line-md:plus-circle" />,
          },
          // {
          //   title: 'Edit',
          //   path: '/admin/user/123123/edit',
          //   icon: <Iconify icon="line-md:edit-twotone" />,
          // },
          // {
          //   title: 'Details',
          //   path: '/admin/user/123123',
          //   icon: <Iconify icon="line-md:text-box" />,
          // },
        ],
      },
      {
        title: 'Attendance',
        path: '/admin/attendance',
        icon: <Iconify icon="line-md:folder-multiple" />,
        children: [
          {
            title: 'List',
            path: '/admin/attendance/list',
            icon: <Iconify icon="line-md:list" />,
          },
          {
            title: 'Create',
            path: '/admin/attendance/create',
            icon: <Iconify icon="line-md:plus-circle" />,
          },
          // {
          //   title: 'Edit',
          //   path: '/admin/attendance/123123/edit',
          //   icon: <Iconify icon="line-md:edit-twotone" />,
          // },
          // {
          //   title: 'Details',
          //   path: '/admin/attendance/123123',
          //   icon: <Iconify icon="line-md:text-box" />,
          // },
        ],
      },
      {
        title: 'Audit Logs',
        path: '/admin/audit-logs/list',
        icon: <Iconify icon="line-md:clipboard-list" />,
        // children: [
        //   {
        //     title: 'List',
        //     path: '/admin/audit-logs/list',
        //     icon: <Iconify icon="line-md:list" />,
        //   },
        //   {
        //     title: 'Details',
        //     path: '/admin/audit-logs/123123',
        //     icon: <Iconify icon="line-md:text-box" />,
        //   },
        // ],
      },
      {
        title: 'Gallery',
        path: '/admin/gallery/list',
        icon: <Iconify icon="line-md:image" />,
      },
    ],
  },
  {
    subheader: 'Account',
    items: [
      {
        title: 'Account',
        path: '/admin/account',
        icon: <Iconify icon="line-md:account" />,
      },
      {
        title: 'Logout',
        path: '/logout',
        icon: <Iconify icon="line-md:logout" />,
      },
    ],
  },
];

export const NAV_USER_DATA = [
  {
    subheader: 'Overview',
    items: [
      {
        title: 'Dashboard',
        path: '/user/dashboard',
        icon: <Iconify icon="line-md:tablet-twotone" />,
      },
    ],
  },
  {
    subheader: 'Management',
    items: [
      {
        title: 'Attendance',
        path: '/user/attendance',
        icon: <Iconify icon="line-md:folder-multiple" />,
        children: [
          {
            title: 'List',
            path: '/user/attendance/list',
            icon: <Iconify icon="line-md:list" />,
          },
          // {
          //   title: 'Details',
          //   path: '/user/attendance/123123',
          //   icon: <Iconify icon="line-md:text-box" />,
          // },
        ],
      },
    ],
  },
  {
    subheader: 'Account',
    items: [
      {
        title: 'Account',
        path: '/user/account',
        icon: <Iconify icon="line-md:account" />,
      },
      {
        title: 'Logout',
        path: '/logout',
        icon: <Iconify icon="line-md:logout" />,
      },
    ],
  },
];
