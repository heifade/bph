import React from 'react';
import Link from 'umi/link';
import { Icon, Tooltip } from 'antd';

interface IProps {
  url: string;
  icon: string;
  title?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function LinkButton(props: IProps) {
  return (
    <Tooltip title={props.title}>
      <Link to={props.url}>
        <Icon type={props.icon} style={{ fontSize: 16, ...props.style }} />
        {props.children}
      </Link>
    </Tooltip>
  );
}
