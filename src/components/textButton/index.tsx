import React from 'react';
import { Tooltip } from 'antd';

interface IProps {
  onClick: (data: any) => void;
  data?: any;
  title?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export class TextButton extends React.PureComponent<IProps> {
  onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const { data, onClick } = this.props;
    if (onClick) {
      onClick(data);
    }
  };
  render() {
    const { title, style, children } = this.props;
    return (
      <Tooltip title={title}>
        <a onClick={this.onClick} style={{ fontSize: 16, ...style }}>
          {children}
        </a>
      </Tooltip>
    );
  }
}
