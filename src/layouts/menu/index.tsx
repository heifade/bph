import React from 'react';
import { Menu, Icon } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { IDispatch } from '@/interface';
import { connect } from 'dva';

const { SubMenu, ItemGroup } = Menu;

interface IProps {
  match: {
    params: {
      menuId: string;
    };
  };
  dispatch: IDispatch;
  // 所有model的 namespace
  pageNamespaces: string[];
  onClick: (param: ClickParam) => void;
}

@connect(props => {
  const pageNamespaces: string[] = [];
  for (const key of Reflect.ownKeys(props)) {
    pageNamespaces.push(String(key));
  }
  return {
    pageNamespaces: pageNamespaces.filter(h => {
      switch (h) {
        case 'routing':
        case '@@dva':
        case 'loading':
          return false;
        default:
          return true;
      }
    }),
  };
})
export class SideMenu extends React.PureComponent<IProps> {
  onMenuClick = (param: ClickParam) => {
    const {
      dispatch,
      pageNamespaces,
      onClick,
      location: { pathname },
    } = this.props;
    if (onClick) {
      onClick(param);
    }

    if (pathname !== param.item.props['data-url']) {
      // 向所有model 发送 reset
      pageNamespaces.map(namespaces => {
        dispatch({
          type: `${namespaces}/onResetBase`,
          payload: {},
        });
      });
    }
  };
  render() {
    const {
      match: {
        params: { menuId },
      },
    } = this.props;

    return (
      <Menu onClick={this.onMenuClick} mode="inline">
        <SubMenu
          key="01"
          title={
            <span>
              <Icon type="setting" />
              <span>系统管理</span>
            </span>
          }
        >
          <Menu.Item key="011" data-url="/user">
            用户管理
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
