import React from 'react';
import { Icon, Button, Tooltip } from 'antd';

interface IProps {
  onClick: (data: any) => void;
  data?: any;
  icon: string;
  title?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default class IconButton extends React.PureComponent<IProps> {
  onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const { data, onClick } = this.props;
    if (onClick) {
      onClick(data);
    }
  };
  render() {
    const { title, icon, style, children } = this.props;
    return (
      <Tooltip title={title}>
        <a onClick={this.onClick} style={{ fontSize: 16, ...style }}>
          <Icon type={icon} />
          {children}
        </a>
      </Tooltip>
    );
  }
}
