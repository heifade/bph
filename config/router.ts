export const pageRoutes = [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      // {
      //   path: '/department/:id',
      //   component: './page.department',
      //   name: '部门管理',
      // },
      // {
      //   path: '/user',
      //   component: './user',
      //   name: '用户管理',
      //   routes: [
      //     {
      //       path: '/user',
      //       component: './user/page.user',
      //       name: '用户管理',
      //     },
      //     {
      //       path: '/user/editor',
      //       component: './user/page.user.editor',
      //       name: '用户编辑',
      //     },
      //   ],
      // },

      {
        path: '/user',
        component: './page.user',
        name: '用户管理'
      }
    ],
  },
];
