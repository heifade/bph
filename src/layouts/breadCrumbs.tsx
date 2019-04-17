import React from 'react';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { Breadcrumb } from 'antd';
import { pageRoutes } from '../../config/router';
import { Link } from 'umi';

export const Breadcrumbs = withBreadcrumbs(pageRoutes)(({ breadcrumbs }) => {
  const list = breadcrumbs.filter(breadcrumb => breadcrumb.name);
  return (
    <Breadcrumb>
      {list.map((breadcrumb, index) => {
        return (
          <Breadcrumb.Item key={breadcrumb.key}>
            <Link to={breadcrumb.match.url}>{breadcrumb.name}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
});
