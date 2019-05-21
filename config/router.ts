export const pageRoutes = [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      {
        path: '/department',
        name: '部门管理',
        routes: [
          {
            path: '/department',
            component: './page.department',
            name: '部门管理',
          },
          {
            path: '/department/user/:department',
            component: './page.user',
            name: '员工管理',
          },
        ],
      },
      {
        path: '/user',
        component: './page.user',
        name: '用户管理',
      },
    ],
  },
];
