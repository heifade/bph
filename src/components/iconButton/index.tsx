import React from 'react';
import { Icon, Tooltip } from 'antd';
import '../textButton/styles.less';

interface IProps {
  onClick: (data: any) => void;
  data?: any;
  icon: string;
  title?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  disabled?: boolean;
}

export class IconButton extends React.PureComponent<IProps> {
  onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const { data, onClick, disabled } = this.props;
    if (onClick && !disabled) {
      onClick(data);
    }
  };
  render() {
    const { title, icon, style, children, disabled } = this.props;
    return (
      <Tooltip title={title}>
        <a
          onClick={this.onClick}
          style={{ fontSize: 16, ...style }}
          className={disabled ? 'bph_disabled_color' : ''}
        >
          <Icon type={icon} />
          {children}
        </a>
      </Tooltip>
    );
  }
}
