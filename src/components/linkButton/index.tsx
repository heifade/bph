import React from 'react';
import Link from 'umi/link';
import { Icon, Tooltip } from 'antd';
import '../textButton/styles.less';

interface IProps {
  url: string;
  icon?: string;
  title?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  disabled?: boolean;
}

export function LinkButton(props: IProps) {
  return (
    <Tooltip title={props.title}>
      {!props.disabled ? (
        <Link to={props.url}>
          {props.icon && <Icon type={props.icon} style={{ fontSize: 16, ...props.style }} />}
          {props.children}
        </Link>
      ) : (
        <span className={props.disabled ? 'bph_disabled_color' : ''}>
          {props.icon && <Icon type={props.icon} style={{ fontSize: 16, ...props.style }} />}
          {props.children}
        </span>
      )}
    </Tooltip>
  );
}
