import React from 'react';
import { Tooltip } from 'antd';
import './styles.less';

interface IProps {
  onClick: (data: any) => void;
  data?: any;
  title?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  disabled?: boolean;
}

export class TextButton extends React.PureComponent<IProps> {
  onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    const { data, onClick, disabled } = this.props;
    if (onClick && !disabled) {
      onClick(data);
    }
  };
  render() {
    const { title, style, children, disabled } = this.props;
    return (
      <Tooltip title={title}>
        <a
          onClick={this.onClick}
          style={{ fontSize: 16, ...style }}
          className={disabled ? 'bph_disabled_color' : ''}
        >
          {children}
        </a>
      </Tooltip>
    );
  }
}
