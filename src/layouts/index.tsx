import React from 'react';
import styles from './index.less';
import { Breadcrumbs } from './breadCrumbs';
import { SideMenu } from './menu';
import { Layout } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { router } from 'umi';

function onMenuClick(param: ClickParam) {
  const url = param.item.props['data-url'];
  router.push(url);
}

const BasicLayout: React.FC = props => {
  return (
    <Layout>
      <Layout.Header>
        <div className={styles.title}>bph</div>
      </Layout.Header>
      <Layout>
        <Layout.Sider>
          <SideMenu onClick={onMenuClick} {...props} />
        </Layout.Sider>
        <Layout.Content>
          <div className={styles.content}>
            <Breadcrumbs />
            {props.children}
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
